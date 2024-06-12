from pydantic_settings import BaseSettings
from pydantic import Field, ConfigDict
import os

class Settings(BaseSettings):
    test: str = Field("default value test", alias="TEST")

    db_name: str = Field("", alias="DB_NAME")
    mongo_url: str = Field("", alias="MONGO_URL")

    secret_key: str = Field(alias="SECRET_KEY")
    access_token_expiration_m: int = Field(1440, alias="ACCESS_TOKEN_EXPIRATION_M")
    invite_length: int = Field(12, alias="INVITE_LEN")

    model_config = ConfigDict({
            "env_file": ".env",
            "case_sensitive": False,
            "extra": "forbid"
        }
    )

settings = Settings(BaseSettings)
