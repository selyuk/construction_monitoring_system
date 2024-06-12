from beanie import Document, PydanticObjectId
from pydantic import BaseModel, ConfigDict


INVITE_TYPE_CLIENT = "client"
INVITE_TYPE_WORKER = "worker"


class Invite(Document):
    project_id: PydanticObjectId
    type: str
    code: str

    class Settings:
        name = "invites"

    model_config = ConfigDict(
        json_schema_extra = {
            "example": {
                "_id": "663f93a128ff75c29d6309e9",
                "project_id": "663f93a128ff75c29d6309e9",
                "type": "worker",
                "code": "ba4a-cd79-33ea"
            }
        }
    )

class GenerateInvite(BaseModel):
    project_id: PydanticObjectId
    type: str

    model_config = ConfigDict(
        json_schema_extra = {
            "example": {
                "project_id": "663f93a128ff75c29d6309e9",
                "type": "worker",
            }
        }
    )
