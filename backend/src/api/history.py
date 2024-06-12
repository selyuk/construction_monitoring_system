from database import History, User
from database.project import ROLE
from api.auth import verify_user
from roles import verify_role

from fastapi import APIRouter, Query, Depends
from fastapi.responses import FileResponse
from starlette.background import BackgroundTask
from typing import Annotated, List
from beanie import PydanticObjectId
from datetime import datetime, timezone

import tempfile
import os


router = APIRouter(prefix="/history", tags=["history"])

@router.get("/")
async def get_history(user: Annotated[User, Depends(verify_user)], project_id: Annotated[PydanticObjectId, Query]) -> FileResponse:
    _ = await verify_role(project_id, user, [ROLE.ANY])

    history = await History.find(History.project_id == project_id).sort(-History.time).to_list()
    data =  "\n".join(map(convert_history_to_log, history))

    with tempfile.NamedTemporaryFile(delete=False, suffix=".log") as temp_file:
        temp_file.write(data.encode('utf-8'))
        temp_file_path = temp_file.name

    response = FileResponse(temp_file_path, media_type='text/plain', filename=f"{project_id.__str__()}.log", background=BackgroundTask(cleanup(temp_file_path)))

    return response

def convert_history_to_log(h: History):
    return f"{prettify_timestamp(h.time)} : project[{h.project_id}] {h.username}[{h.user_id}] {h.log}"

def cleanup(temp_file_path):
    def f(): 
        os.remove(temp_file_path)
    return f

def prettify_timestamp(timestamp):
    dt_object = datetime.fromtimestamp(timestamp, tz=timezone.utc)
    return dt_object.strftime('%Y-%m-%d %H:%M:%S %Z')

