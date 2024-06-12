from database import User
from settings import settings

from fastapi.security import OAuth2PasswordRequestForm, HTTPBearer, HTTPAuthorizationCredentials
from fastapi import Depends, HTTPException, status, APIRouter
from datetime import timedelta, datetime, timezone
from passlib.context import CryptContext
from jose import JWTError, jwt
from pydantic import BaseModel
from beanie import PydanticObjectId
from typing import Annotated


ALGORITHM = "HS256"
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

router = APIRouter(prefix="/auth", tags=["auth"])


def create_access_token(data: dict, expires_delta: timedelta):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.secret_key, algorithm=ALGORITHM)
    return encoded_jwt

bearer_auth = HTTPBearer(auto_error=False)

async def verify_user(
    bearer: HTTPAuthorizationCredentials = Depends(bearer_auth)
):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    if not bearer:
        raise credentials_exception
    
    try:
        payload = jwt.decode(bearer.credentials, settings.secret_key, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    
    user = await User.get(user_id)
    if user is None:
        raise credentials_exception
    return user

class Token(BaseModel):
    access_token: str
    token_type: str

@router.post("/login")
async def login(form_data: Annotated[OAuth2PasswordRequestForm, Depends()]) -> Token:
    user = await User.find_one(User.username == form_data.username)
    if not user:
        raise HTTPException(status_code=400, detail="user does not exist")
    if not pwd_context.verify(form_data.password, user.password):
        raise HTTPException(status_code=400, detail="invalid password")
    
    access_token_expires = timedelta(minutes=settings.access_token_expiration_m)
    access_token = create_access_token(
        data={"sub": user.id.__str__()}, expires_delta=access_token_expires
    )

    return Token(access_token=access_token, token_type="bearer")

@router.post("/register")
async def register(form_data: User) -> Token:
    user = await User.find_one(User.username == form_data.username)
    if user:
        raise HTTPException(status_code=400, detail="user already exists")

    user = await User(
        password=pwd_context.hash(form_data.password), 
        username=form_data.username, 
        name=form_data.name
    ).create()

    access_token_expires = timedelta(minutes=settings.access_token_expiration_m)
    access_token = create_access_token(
        data={"sub": user.id.__str__()}, expires_delta=access_token_expires
    )

    return Token(access_token=access_token, token_type="bearer")
