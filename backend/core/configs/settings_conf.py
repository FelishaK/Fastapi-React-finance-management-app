from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv("../../.env"))


__all__ = "settings"


class Settings(BaseSettings):
    DB_USER: str
    DB_PASSWORD: str
    DB_SERVER: str
    DB_PORT: int
    DB_NAME: str

    SECRET_KEY: str
    SALT: str
    ACCESS_TOKEN_EXPIRATION_TIME: int
    REFRESH_TOKEN_EXPIRATION_TIME: int

    @property
    def DB_URL(cls):
        return f"postgresql+asyncpg://{cls.DB_USER}:{cls.DB_PASSWORD}@{cls.DB_SERVER}:{cls.DB_PORT}/{cls.DB_NAME}"

    model_config = SettingsConfigDict(env_file="../../.env")


settings = Settings()
