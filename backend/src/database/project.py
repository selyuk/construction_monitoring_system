from utils import current_utc_timestamp

from beanie import Document, PydanticObjectId
from pydantic import Field, BaseModel, ConfigDict
from typing import List


class ROLE:
    OWNER = "owner"
    WORKER = "worker"
    CLIENT = "client"
    ANY = "any"

class Project(Document):
    name: str
    description: str
    owner: PydanticObjectId
    workers: List[PydanticObjectId]
    clients: List[PydanticObjectId]
    started: bool = False
    locked: bool = False
    start_time: int
    creation_time: int = Field(default_factory=current_utc_timestamp)

    class Settings:
        name = "projects"

    model_config = ConfigDict(
        json_schema_extra = {
            "example": {
                "_id": "663f93a128ff75c29d6309e9",
                "name": "test-name",
                "description": "description",
                "locked": False,
                "owner": "663f93a128ff75c29d6309e9",
                "workers": ["663f93a128ff75c29d6309e9", "663f93a128ff75c29d6309e9"],
                "clients": ["663f93a128ff75c29d6309e9"],
                "start_time": 1715480548,
            }
        }
    )

    def get_role(self, user_id: PydanticObjectId):
        if self.owner == user_id:
            return ROLE.OWNER
        if user_id in self.workers:
            return ROLE.WORKER
        if user_id in self.clients:
            return ROLE.CLIENT
        return None

class ProjectUpdate(BaseModel):
    name: str
    description: str
    workers: List[PydanticObjectId]
    clients: List[PydanticObjectId]

    def get_fields(self) -> List[str]:
        return [
            "name",
            "description",
            "workers",
            "clients"
        ]

    model_config = ConfigDict(
        json_schema_extra = {
            "example": {
                "name": "test-name",
                "description": "description",
                "workers": ["663f93a128ff75c29d6309e9", "663f93a128ff75c29d6309e9"],
                "clients": ["663f93a128ff75c29d6309e9"],
            }
        }
    )


class ProjectCreate(BaseModel):
    name: str
    description: str

    model_config = ConfigDict(
        json_schema_extra = {
            "example": {
                "name": "test-name",
                "description": "description",
            }
        }
    )
