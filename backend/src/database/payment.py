from utils import current_utc_timestamp
from beanie import Document, PydanticObjectId
from pydantic import Field, ConfigDict


class Payment(Document):
    project_id: PydanticObjectId
    creation_time: int = Field(default_factory=current_utc_timestamp)
    closed: bool = False
    price: int

    class Settings:
        name = "payments"

    model_config = ConfigDict(
        json_schema_extra = {
            "example": {
                "_id": "663f93a128ff75c29d6309e9",
                "project_id": "663f93a128ff75c29d6309e9",
                "closed": False,
                "price": 120,
                "creation_time": 1715480548,
            }
        }
    )
