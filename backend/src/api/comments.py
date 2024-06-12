from database import Comment, CommentUpdate, CommentCreate, Task, Project, User
from database.project import ROLE
from database.history import make_log
from api.auth import verify_user
from utils import *
from roles import verify_role

from fastapi import APIRouter, Query, Depends, HTTPException, status
from typing import Annotated, List
from beanie import PydanticObjectId
from beanie.operators import Set

router = APIRouter(prefix="/comments", tags=["comments"])

@router.get("/")
async def get_comments(user: Annotated[User, Depends(verify_user)], task_id: Annotated[PydanticObjectId, Query]) -> List[Comment]:
    task = await Task.find_one(Task.id == task_id)
    if not task:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="task does not exist",
        )

    _ = await verify_role(task.project_id, user, [ROLE.ANY])

    return await Comment.find(Comment.task_id == task_id).to_list()

@router.put("/{comment_id}")
async def update_comment(user: Annotated[User, Depends(verify_user)], comment_id: PydanticObjectId, update: CommentUpdate) -> Comment:
    comment = await Comment.get(comment_id)
    if not comment:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="comment does not exist",
        )
    
    project = await Project.get(comment.project_id)
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

    if comment.user_id != user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="not allowed",
        )
    
    _ = await verify_role(comment.project_id, user, [ROLE.ANY])

    set_ = Set({
        Comment.data: update.data,
        Comment.attachments: update.attachments,
        Comment.last_updated: current_utc_timestamp(),
        Comment.edited: True,
    })

    changes = get_update_changes(comment, update, update.get_fields())
    await make_log(comment.project_id, user, f"updated comment[{comment.id}]. {changes}")

    return await comment.update(set_)

@router.post("/")
async def add_comment(user: Annotated[User, Depends(verify_user)], create: CommentCreate) -> Comment:
    task = await Task.get(create.task_id)
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
    
    _ = await verify_role(task.project_id, user, [ROLE.ANY])

    comment = await Comment(
        project_id=task.project_id,
        task_id=task.id,
        user_id=user.id,
        attachments=create.attachments,
        username=user.username,
        name=user.name,
        data=create.data
    ).create()

    await make_log(task.project_id, user, f"created comment[{comment.id}]")

    return comment

@router.delete("/{comment_id}")
async def delete_comment(user: Annotated[User, Depends(verify_user)], comment_id: PydanticObjectId):
    comment = await Comment.get(comment_id)
    if not comment:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="comment does not exist",
        )
    
    task = await Task.get(comment.task_id)
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

    if comment.user_id != user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="not allowed",
        )
    
    await make_log(comment.project_id, user, f"deleted comment[{comment.id}]")

    await comment.delete()
