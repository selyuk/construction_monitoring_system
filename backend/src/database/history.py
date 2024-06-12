from utils import current_utc_timestamp
from beanie import Document, PydanticObjectId
from pydantic import Field, ConfigDict


class History(Document):
    project_id: PydanticObjectId
    user_id: PydanticObjectId
    username: str
    log: str
    time: int = Field(default_factory=current_utc_timestamp)

    class Settings:
        name = "history"

    model_config = ConfigDict(
        json_schema_extra = {
            "example": {
                "_id": "663f93a128ff75c29d6309e9",
                "project_id": "663f93a128ff75c29d6309e9",
                "user_id": "663f93a128ff75c29d6309e9",
                "username": "yavir",
                "log": "deleted task[663f93a128ff75c29d6309e9]",
                "time": 1715480548,
            }
        }
    )

async def make_log(project, user, log):
    await History(
        project_id=project, 
        user_id=user.id, 
        username=user.username,
        log=log
    ).create()
