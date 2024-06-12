from beanie import Document, PydanticObjectId
from pydantic import BaseModel, ConfigDict


class Attachment(Document):
    project_id: PydanticObjectId
    uploader_id: PydanticObjectId
    content_type: str
    data: str

    class Settings:
        name = "attachments"

    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "_id": "663f93a128ff75c29d6309e9",
                "project_id": "663f93a128ff75c29d6309e9",
                "uploader_id": "663f93a128ff75c29d6309e9",
                "content_type": "image/jpg",
                "data": "iVBORw0KGgoAAAANSUhEUgAAAZQAA...",
            }
        }
    )

    # class Config:
    #     json_schema_extra = {
    #         "example": {
    #             "_id": "663f93a128ff75c29d6309e9",
    #             "project_id": "663f93a128ff75c29d6309e9",
    #             "uploader_id": "663f93a128ff75c29d6309e9",
    #             "content_type": "image/jpg",
    #             "data": "iVBORw0KGgoAAAANSUhEUgAAAZQAA...",
    #         }
    #     }
