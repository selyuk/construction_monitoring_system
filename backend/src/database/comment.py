from utils import current_utc_timestamp
from beanie import Document, PydanticObjectId
from pydantic import Field, BaseModel, ConfigDict
from typing import List


class Comment(Document):
    project_id: PydanticObjectId
    task_id: PydanticObjectId
    user_id: PydanticObjectId
    attachments: List[PydanticObjectId]
    username: str
    name: str
    data: str
    edited: bool = False
    last_updated: int = Field(default_factory=current_utc_timestamp)
    creation_time: int = Field(default_factory=current_utc_timestamp)

    class Settings:
        name = "comments"

    model_config = ConfigDict(
        json_schema_extra = {
            "example": {
                "_id": "663f93a128ff75c29d6309e9",
                "project_id": "663f93a128ff75c29d6309e9",
                "task_id": "663f93a128ff75c29d6309e9",
                "user_id": "663f93a128ff75c29d6309e9",
                "attachments": ["663f93a128ff75c29d6309e9"],
                "username": "yavir",
                "name": "Yaroslav Vishpa",
                "data": "We need more resources!",
                "edited": False,
                "creation_time": 1715480548,
                "last_updated": 1715480548,
            }
        }
    )

class CommentUpdate(BaseModel):
    attachments: List[PydanticObjectId]
    data: str

    def get_fields(self) -> List[str]:
        return [
            "attachments",
            "data"
        ]

    class Settings:
        name = "comments"

    model_config = ConfigDict(
        json_schema_extra = {
            "example": {
                "attachments": ["663f93a128ff75c29d6309e9"],
                "data": "Everything fine.",
            }
        }
    )

class CommentCreate(BaseModel):
    task_id: PydanticObjectId
    attachments: List[PydanticObjectId]
    data: str

    class Settings:
        name = "comments"

    model_config = ConfigDict(
        json_schema_extra = {
            "example": {
                "task_id": "663f93a128ff75c29d6309e9",
                "attachments": ["663f93a128ff75c29d6309e9"],
                "data": "We need more resources!",
            }
        }
    )
