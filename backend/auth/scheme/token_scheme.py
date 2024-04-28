from pydantic import BaseModel


class TokenS(BaseModel):
    access_token: str
    refresh_token: str | None = None
    type: str
