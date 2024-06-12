from api.auth import router as auth_router
from api.tasks import router as tasks_router
from api.projects import router as projects_router
from api.history import router as history_router
from api.attachment import router as attachment_router
from api.comments import router as comments_router

from fastapi import APIRouter, Depends
from api.auth import verify_user

router = APIRouter(prefix="/api")

router.include_router(auth_router)
router.include_router(tasks_router)
router.include_router(projects_router)
router.include_router(history_router)
router.include_router(attachment_router)
router.include_router(comments_router)

@router.get("/hello", dependencies=[Depends(verify_user)])
async def read_root():
    return {"Hello": "World"}
