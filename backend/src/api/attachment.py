from database import User, Attachment, Project
from api.auth import verify_user
from database.project import ROLE
from database.history import make_log
from roles import verify_role

from fastapi import APIRouter, Query, Depends, UploadFile, HTTPException, status
from typing import Annotated, List
from beanie.operators import Set
from beanie import PydanticObjectId
from base64 import b64encode


router = APIRouter(prefix="/attachments", tags=["attachments"])

@router.get("/{attachment_id}")
async def get_attachment(user: Annotated[User, Depends(verify_user)], attachment_id: PydanticObjectId) -> Attachment:
    attachment = await Attachment.get(attachment_id)
    if not attachment:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="attachment does not exist",
        )

    _ = verify_role(attachment.project_id, user, [ROLE.ANY])

    return attachment

@router.post("/")
async def upload_attachment(user: Annotated[User, Depends(verify_user)], project_id: Annotated[PydanticObjectId, Query], file: UploadFile)  -> Attachment:
    _ = verify_role(project_id, user, [ROLE.ANY])

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
    
    if file.size > 1048576:  # 1 MB
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="file max size is 1MB",
        )

    data = b64encode(await file.read()).decode("utf-8")
    
    attachment = await Attachment(
        project_id=project_id,
        uploader_id=user.id,
        data=data,
        content_type=file.content_type
    ).create()

    await make_log(attachment.project_id, user, f"uploaded attachment[{attachment.id}]")

    return attachment

@router.delete("/{attachment_id}")
async def delete_attachment(user: Annotated[User, Depends(verify_user)], attachment_id: PydanticObjectId):
    attachment = await Attachment.get(attachment_id)
    if not attachment: 
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="attachment does not exist",
        )
    
    project = await Project.get(attachment.project_id)
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

    if attachment.uploader_id != user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="not allowed",
        )

    _ = verify_role(attachment.project_id, user, [ROLE.ANY])

    await make_log(attachment.project_id, user, f"deleted attachment[{attachment.id}]")

    await attachment.delete()
