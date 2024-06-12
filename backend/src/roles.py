from database import User, Project
from database.project import ROLE
from beanie import PydanticObjectId
from fastapi import HTTPException, status
from typing import List


async def verify_role(project_id: PydanticObjectId, user: User, allowed_roles: List[str]) -> str:
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

    if ROLE.ANY in allowed_roles:
        return
    if role not in allowed_roles:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="not allowed",
        )
    
    return role
