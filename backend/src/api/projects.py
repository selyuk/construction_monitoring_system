from database import User, Project, ProjectUpdate, ProjectCreate, Invite, GenerateInvite, Payment, Task
from database.invite import INVITE_TYPE_CLIENT, INVITE_TYPE_WORKER
from database.project import ROLE
from database.history import make_log
from database.task import PAYMENT_STATUS

from api.auth import verify_user
from settings import settings
from roles import verify_role
from utils import get_update_changes

from fastapi import HTTPException, status, APIRouter, Query, Depends
from pydantic import BaseModel
from typing import Annotated, List
from beanie.operators import Set
from beanie import PydanticObjectId
from hashlib import sha256

import random


router = APIRouter(prefix="/projects", tags=["projects"])

@router.get("/")
async def get_projects(user: Annotated[User, Depends(verify_user)]) -> List[Project]:
    filters = {"$or": [{"owner": user.id}, {"$or": [{"clients": user.id},{"workers": user.id}]}]}
    return await Project.find(filters).to_list()

@router.get("/{project_id}")
async def get_project(user: Annotated[User, Depends(verify_user)], project_id: PydanticObjectId) -> Project:
    _ = await verify_role(project_id, user, [ROLE.ANY])
    return await Project.get(project_id)

@router.put("/{project_id}")
async def update_project(user: Annotated[User, Depends(verify_user)], project_id: Annotated[PydanticObjectId, Query], update: ProjectUpdate) -> Project:
    project = await Project.get(project_id)
    if not project:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="project does not exist",
        )

    if project.locked:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="project is locked",
        )

    _ = await verify_role(project.id, user, [ROLE.OWNER])

    set_ = Set({
        Project.name: update.name,
        Project.description: update.description,
    })

    changes = get_update_changes(project, update, update.get_fields())
    await make_log(project.id, user, f"updated project. {changes}")

    return await project.update(set_)

@router.post("/")
async def add_project(user: Annotated[User, Depends(verify_user)], project: ProjectCreate) -> Project:
    project = await Project(
        name=project.name,
        description=project.description,
        owner=user.id,
        workers=[],
        clients=[],
        start_time=0,
    ).create()

    await make_log(project.id, user, f"created project")

    return project

@router.delete("/{project_id}")
async def delete_project(user: Annotated[User, Depends(verify_user)], project_id: PydanticObjectId) -> Project:
    project = await Project.get(project_id)
    if not project:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="project does not exist",
        )
    
    project = await Project.get(project_id)
    if not project:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="project does not exist",
        )
    
    role = project.get_role(user.id)
    if not role:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="user does not participate in project",
        )
    
    if role == ROLE.OWNER:
        if project.locked:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="project is locked",
            )

        await make_log(project.id, user, f"deleted project")

        deleted_project = project.model_copy()

        await project.delete()

        return deleted_project
    
    if role == ROLE.CLIENT:
        new_clients = project.clients.copy()
        new_clients.remove(user.id)
        set_ = Set({
            Project.clients: new_clients
        })
    elif role == ROLE.WORKER:
        new_workers = project.workers.copy()
        new_workers.remove(user.id)
        set_ = Set({
            Project.clients: new_workers
        })

    await make_log(project.id, user, f"leaved project")

    return await project.update(set_)
    

@router.post("/{project_id}/close")
async def close_project(user: Annotated[User, Depends(verify_user)], project_id: PydanticObjectId):
    project = await Project.get(project_id)
    if not project:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="project does not exist",
        )
    
    if project.locked:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="project is already locked",
        )

    _ = await verify_role(project.id, user, [ROLE.OWNER])

    await make_log(project.id, user, f"closed project")

    set_ = Set({
        Project.locked: True,
    })
    await project.update(set_)

###

@router.post("/generate-invite")
async def generate_invite(user: Annotated[User, Depends(verify_user)], invite_data: GenerateInvite) -> Invite:
    _ = await verify_role(invite_data.project_id, user, [ROLE.OWNER])

    random_string = str(random.getrandbits(256))
    hashed_string = sha256(random_string.encode()).hexdigest()
    truncated_hash = hashed_string[:settings.invite_length]
    formatted_hash = '-'.join([truncated_hash[i:i+4] for i in range(0, len(truncated_hash), 4)])

    await make_log(invite_data.project_id, user, f"generated {invite_data.type} invite to project")

    return await Invite(
        project_id=invite_data.project_id,
        type=invite_data.type,
        code=formatted_hash
    ).create()

class AcceptInviteResponse(BaseModel):
    project_id: PydanticObjectId

@router.post("/accept-invite")
async def accept_invite(user: Annotated[User, Depends(verify_user)], code: str) -> AcceptInviteResponse:
    invite = await Invite.find_one(Invite.code == code)
    if not invite:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="invite does not exist",
        )

    project = await Project.get(invite.project_id)
    if not project:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="project does not exist",
        )

    if user.id in project.clients or user.id in project.workers or user.id == project.owner:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="user already in project",
        )

    if invite.type == INVITE_TYPE_CLIENT:
        await project.update(Set({Project.clients: project.clients+[user.id]}))
    elif invite.type == INVITE_TYPE_WORKER:
        await project.update(Set({Project.workers: project.workers+[user.id]}))

    response = AcceptInviteResponse(project_id=invite.project_id)

    await make_log(project.id, user, f"accepted invite to project")

    await invite.delete()

    return response

###

@router.get("/get-payment/")
async def payment(user: Annotated[User, Depends(verify_user)], project_id: PydanticObjectId) -> Payment:
    _ = await verify_role(project_id, user, [ROLE.ANY])

    payment = await Payment.find_one({"project_id": project_id, "closed": False})
    if not payment:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="payment does not exist",
        )
    
    return payment

@router.post("/cancel-payment")
async def pay(user: Annotated[User, Depends(verify_user)], project_id: Annotated[PydanticObjectId, Query]):
    _ = await verify_role(project_id, user, [ROLE.CLIENT])

    payment = await Payment.find_one({"project_id": project_id, "closed": False})
    if not payment:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="payment does not exist",
        )
    
    
    filters = {"payment_id": payment.id}
    await Task.find(filters).update(Set({
        Task.payment_status: PAYMENT_STATUS.UNPAYED,
    }))

    await payment.delete()

    return None

@router.post("/pay")
async def pay(user: Annotated[User, Depends(verify_user)], project_id: Annotated[PydanticObjectId, Query]):
    _ = await verify_role(project_id, user, [ROLE.CLIENT])

    payment = await Payment.find_one({"project_id": project_id, "closed": False})
    if not payment:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="payment does not exist",
        )
    
    project = await Project.get(project_id)
    if not project:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="project does not exist",
        )

    if project.locked:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="project is locked",
        )
    
    await payment.update(Set({Payment.closed: True}))
    
    filters = {"project_id": project_id, "payment_id": payment.id}
    await Task.find(filters).update(Set({
        Task.payment_status: PAYMENT_STATUS.DONE,
        Task.locked: False
    }))

    return None

@router.post("/create-payment")
async def create_payment(user: Annotated[User, Depends(verify_user)], project_id: Annotated[PydanticObjectId, Query]) -> Payment:
    _ = await verify_role(project_id, user, [ROLE.OWNER])

    project = await Project.get(project_id)
    if not project:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="project does not exist",
        )

    if project.locked:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="project is locked",
        )
    
    payment = await Payment.find_one({"project_id": project_id, "closed": False})
    if payment:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="open payment already exists",
        )
    
    filters = {"project_id": project_id, "payment_status": PAYMENT_STATUS.UNPAYED, "uah_price": {"$not": {"$eq": 0}}, "locked": False}
    tasks = Task.find(filters)

    tasks_list = await tasks.to_list()

    if len(tasks_list) == 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="no tasks exist",
        )

    total = 0
    for t in tasks_list:
        total += t.uah_price

    payment: Payment = await Payment(
        project_id=project_id,
        price=total,
    ).create()

    await tasks.update(Set({
        Task.payment_status: PAYMENT_STATUS.IN_PROGRESS, 
        Task.payment_id: payment.id,
        Task.locked: True
    }))

    await make_log(project_id, user, f"created payment")

    return payment
