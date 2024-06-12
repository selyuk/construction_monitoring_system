from utils import current_utc_timestamp

from beanie import Document, PydanticObjectId
from pydantic import Field, BaseModel, ConfigDict
from typing import List, Optional


class STATUS:
    TO_DO = "to_do"
    IN_PROGRESS = "in_progress"
    DONE = "done"

class PAYMENT_STATUS:
    UNPAYED = "unpayed"
    IN_PROGRESS = "in_progress"
    DONE = "done"

class Task(Document):
    project_id: PydanticObjectId
    status: str = STATUS.TO_DO

    payment_id: PydanticObjectId | None = None
    payment_status: str = PAYMENT_STATUS.UNPAYED
    uah_price: int 

    priority: int
    name: str
    description: str
    attachments: List[PydanticObjectId]
    locked: bool = False
    tracking_time: int
    logged_time: int = 0
    start_time: int = 0
    creation_time: int = Field(default_factory=current_utc_timestamp)
    lock_time: int = 0

    class Settings:
        name = "tasks"

    model_config = ConfigDict(
        json_schema_extra = {
            "example": {
                "_id": "663f93a128ff75c29d6309e9",
                "project_id": "663f93a128ff75c29d6309e9",
                "priority": 1,
                "payment_status": "unpayed",
                "payment_id": None,
                "uah_price": 0,
                "name": "task-name",
                "status": "to_do",
                "description": "description",
                "locked": False,
                "attachments": [],
                "start_time": 1715480548,
                "lock_time": 1715480548,
            }
        }
    )

class TaskUpdate(BaseModel):
    priority: Optional[int]
    name: Optional[str]
    uah_price: Optional[int]
    description: Optional[str]
    tracking_time: Optional[int]
    logged_time: Optional[int]
    status: Optional[str]
    attachments: Optional[List[PydanticObjectId]]

    def get_fields(self) -> List[str]:
        return [
            "priority",
            "name",
            "description",
            "tracking_time",
            "logged_time",
            "status",
            "attachments",
        ]

    model_config = ConfigDict(
        json_schema_extra = {
            "example": {
                "priority": 1,
                "name": "Bedroom",
                "uah_price": 120,
                "description": "Text",
                "tracking_time": 6000,
                "logged_time": 4500, 
                "status": "to_do",
                "attachments": ["663f93a128ff75c29d6309e9"]
            }
        }
    )

class TaskCreate(BaseModel):
    project_id: PydanticObjectId
    priority: int
    name: str
    price: int 
    description: str
    attachments: List[PydanticObjectId]
    tracking_time: int
    
    model_config = ConfigDict(
        json_schema_extra = {
            "example": {
                "project_id": "663f93a128ff75c29d6309e9",
                "priority": 1,
                "price": 0,
                "name": "task-name",
                "status": "to_do",
                "description": "description",
                "attachments": [],
                "tracking_time": 60000,
            }
        }
    )
