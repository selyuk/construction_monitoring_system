from fastapi.testclient import TestClient
from mongomock import MongoClient as AsyncMongoMockClient

from database import *

import pytest
import json

@pytest.mark.asyncio
async def test_auth(client: TestClient):
    client = await client
    
    db = AsyncMongoMockClient()
    await init_beanie(document_models=models, database=db["test_db"])

    register_form_data = {
        "name": "NAME",
        "username": "testuser",
        "password": "correct_password"
    }
    register_res = client.post("/api/auth/register", content=json.dumps(register_form_data), headers={"content-type": "application/json",})
    assert register_res.status_code == 200
    assert register_res.json()["access_token"] is not None

    login_form_data = {
        "username": "testuser",
        "password": "correct_password"
    }
    log_res = client.post("/api/auth/login", data=login_form_data, headers={"content-type": "application/x-www-form-urlencoded",})
    assert log_res.status_code == 200
    assert log_res.json()["access_token"] is not None

@pytest.mark.asyncio
async def test_crud_project(client: TestClient):
    client = await client
    
    token = await get_access_token(client)
    headers = {"content-type": "application/json", "Authorization": token}

    project_to_post = {"name": "test-project", "description": "description"}
    post_projects = client.post("/api/projects", content=json.dumps(project_to_post), headers=headers)
    assert post_projects.status_code == 200

    project = post_projects.json()

    assert project_to_post["name"] == project["name"]
    assert project_to_post["description"] == project["description"]

    update_project = dict(project).copy()
    update_project["name"] = "updated-name"

    put_project_response = client.put(f"/api/projects/{project['_id']}", content=json.dumps(update_project), headers=headers)
    assert put_project_response.status_code == 200

    get_project_response = client.get(f"/api/projects/{project['_id']}", headers=headers)
    assert get_project_response.json() == update_project

@pytest.mark.asyncio
async def test_crud_task(client: TestClient):
    client = await client
    
    token = await get_access_token(client)
    headers = {"content-type": "application/json", "Authorization": token}

    post_project = client.post("/api/projects", content=json.dumps({"name": "test-project", "description": "description"}), headers=headers)
    assert post_project.status_code == 200
    project = post_project.json()

    task_to_post = {
        "attachments": [],
        "description": "description",
        "name": "task-name",
        "priority": 1,
        "project_id": project["_id"],
        "status": "to_do",
        "tracking_time": 60000
    }
    post_task = client.post("/api/tasks", content=json.dumps(task_to_post), headers=headers)

    assert post_task.status_code == 200

    task = post_task.json()

    assert contains(task, task_to_post)

    task_to_update = {
        "priority": 2,
        "name": "Bedroom",
        "description": "Text",
        "tracking_time": 6000,
        "logged_time": 4500, 
        "status": "to_do",
        "attachments": []
    }
    update_task = dict(task).copy()
    update_task["name"] = "updated-name"

    put_task_response = client.put(f"/api/tasks/{task['_id']}", content=json.dumps(task_to_update), headers=headers)
    assert put_task_response.status_code == 200

    get_task_response = client.get(f"/api/tasks/{task['_id']}", headers=headers)
    assert get_task_response.status_code == 200
    assert contains(get_task_response.json(), task_to_update)

@pytest.mark.asyncio
async def test_crud_comment(client: TestClient):
    client = await client
    
    token = await get_access_token(client)
    headers = {"content-type": "application/json", "Authorization": token}
    
    post_project = client.post("/api/projects", content=json.dumps({"name": "test-project", "description": "description"}), headers=headers)
    assert post_project.status_code == 200
    project = post_project.json()

    task_to_post = {
        "attachments": [],
        "description": "description",
        "name": "task-name",
        "priority": 1,
        "project_id": project["_id"],
        "status": "to_do",
        "tracking_time": 60000
    }
    post_task = client.post("/api/tasks", content=json.dumps(task_to_post), headers=headers)
    assert post_task.status_code == 200

    task = post_task.json()

    comment_to_post = {
        "attachments": [],
        "data": "We need more resources!",
        "task_id": task["_id"],
    }
    post_comment = client.post("/api/comments", content=json.dumps(comment_to_post), headers=headers)
    assert post_comment.status_code == 200
    comment = post_comment.json()
    assert contains(comment, comment_to_post)

    comment_to_update = {
        "attachments": [],
        "data": "Everything fine."
    }
    put_comment_response = client.put(f"/api/comments/{comment['_id']}", content=json.dumps(comment_to_update), headers=headers)
    assert put_comment_response.status_code == 200
    
    assert contains(put_comment_response.json(), comment_to_update)

async def get_access_token(client: TestClient):
    db = AsyncMongoMockClient()
    await init_beanie(document_models=models, database=db["test_db"])

    register_form_data = {
        "name": "NAME",
        "username": "testuser",
        "password": "correct_password"
    }
    register_res = client.post("/api/auth/register", content=json.dumps(register_form_data), headers={"content-type": "application/json",})
    return f"Bearer {register_res.json()['access_token']}"

def contains(dict_a: dict, dict_b: dict):
    for b_key, b_value in dict_b.items():
        if b_key not in dict_a:
            return False
        if dict_a[b_key] != b_value:
            return False
    return True
