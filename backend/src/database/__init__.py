# DO NOT REMOVE unused imports here. 
# It is used in other modules that imports database module

from database.project import Project, ProjectUpdate, ProjectCreate
from database.payment import Payment
from database.task import Task, TaskUpdate, TaskCreate
from database.attachment import Attachment
from database.history import History
from database.user import User
from database.comment import Comment, CommentUpdate, CommentCreate
from database.invite import Invite, GenerateInvite
from mongomock_motor import AsyncMongoMockClient
from settings import settings

from beanie import init_beanie

import motor.motor_asyncio


models = [
    User,
    Project,
    History,
    Task,
    Attachment,
    Invite,
    Comment,
    Payment,
]

async def init_db():
    client = motor.motor_asyncio.AsyncIOMotorClient(
        settings.mongo_url
    )

    await init_beanie(database=client[settings.db_name], document_models=models)
