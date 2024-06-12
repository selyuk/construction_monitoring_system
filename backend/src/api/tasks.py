from database import Task, TaskUpdate, TaskCreate, Project, User
from database.project import ROLE
from database.history import make_log
from database.task import PAYMENT_STATUS
from api.auth import verify_user
from roles import verify_role
from utils import *

from fastapi import APIRouter, Query, Depends, HTTPException, status
from typing import Annotated, List
from beanie import PydanticObjectId
from beanie.operators import Set

router = APIRouter(prefix="/tasks", tags=["tasks"])

@router.get("/")
async def get_tasks(user: Annotated[User, Depends(verify_user)], project_id: Annotated[PydanticObjectId, Query]) -> List[Task]:
    await verify_role(project_id, user, [ROLE.ANY])

    return await Task.find(Task.project_id == project_id).to_list()

@router.get("/{task_id}")
async def get_task(user: Annotated[User, Depends(verify_user)], task_id: PydanticObjectId) -> Task:
    task = await Task.get(task_id)

    await verify_role(task.project_id, user, [ROLE.ANY])

    return task

@router.put("/{task_id}")
async def update_task(user: Annotated[User, Depends(verify_user)], task_id: PydanticObjectId, update: TaskUpdate) -> Task:
    task = await Task.get(task_id)
    if not task:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="task does not exist",
        )

    role = await verify_role(task.project_id, user, [ROLE.OWNER, ROLE.WORKER])

    project = await Project.get(task.project_id)
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

    if task.locked:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="task is locked",
        )

    set_ = None
    if role == ROLE.OWNER:
        set_dict = {
            Task.name: update.name,
            Task.description: update.description,
            Task.priority: update.priority,
            Task.attachments: update.attachments,
            Task.status: update.status,
            Task.tracking_time: update.tracking_time,
            Task.logged_time: update.logged_time,
        }

        if update.uah_price:
            if update.uah_price != task.uah_price:
                if task.payment_status != PAYMENT_STATUS.UNPAYED:
                    raise HTTPException(
                        status_code=status.HTTP_400_BAD_REQUEST,
                        detail=f"payment status is not {PAYMENT_STATUS.UNPAYED}",
                    )
                set_dict[Task.uah_price] = update.uah_price

        set_ = Set(set_dict)
    elif role == ROLE.WORKER:
        set_ = Set({
            Task.status: update.status,
            Task.logged_time: update.logged_time,
        })

    changes = get_update_changes(task, update, update.get_fields())
    await make_log(task.project_id, user, f"updated task[{task.id}] {task.name}. {changes}")

    return await task.update(set_)

@router.post("/")
async def add_task(user: Annotated[User, Depends(verify_user)], create: TaskCreate) -> Task:
    _ = await verify_role(create.project_id, user, [ROLE.OWNER])

    project = await Project.get(create.project_id)
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

    task = await Task(
        project_id=create.project_id,
        priority=create.priority,
        name=create.name,
        uah_price=create.price,
        description=create.description,
        attachments=create.attachments,
        tracking_time=create.tracking_time,
    ).create()

    await make_log(task.project_id, user, f"created task[{task.id}] {task.name}")

    return task

@router.delete("/{task_id}")
async def delete_task(user: Annotated[User, Depends(verify_user)], task_id: PydanticObjectId) -> Task:
    task = await Task.get(task_id)
    if not task:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="task does not exist",
        )
    
    project = await Project.get(task.project_id)
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
    
    if task.locked:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="task is locked",
        )

    _ = await verify_role(task.project_id, user, [ROLE.OWNER])

    await make_log(task.project_id, user, f"deleted task[{task.id}] {task.name}")

    deleted_task = task.model_copy()

    await task.delete()

    return deleted_task

@router.post("/{task_id}/close")
async def close_task(user: Annotated[User, Depends(verify_user)], task_id: PydanticObjectId):
    task = await Task.get(task_id)
    if not task:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="task does not exist",
        )

    _ = await verify_role(task.project_id, user, [ROLE.OWNER])

    project = await Project.get(task.project_id)
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

    await make_log(task.project_id, user, f"closed task[{task.id}] {task.name}")

    return await task.update(Set({
        Task.locked: True,
        Task.lock_time: current_utc_timestamp(),
    }))
