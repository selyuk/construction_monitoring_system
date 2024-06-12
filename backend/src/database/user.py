from datetime import datetime
from beanie import Document
from pydantic import BaseModel, ConfigDict
from typing import Optional


class User(Document):
    name: str
    username: str
    password: str

    class Settings:
        name = "users"

    model_config = ConfigDict(
        json_schema_extra = {
            "example": {
                "_id": "663f93a128ff75c29d6309e9",
                "name": "Yaroslav Vishkin",
                "username": "yavir",
                "password": "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824",
            }
        }
    )
