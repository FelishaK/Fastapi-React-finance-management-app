from pydantic import BaseModel, EmailStr, Field


class ReturnUserS(BaseModel):
    id: int
    username: str
    email: EmailStr


class CreateUserS(BaseModel):
    username: str
    email: EmailStr
    password: str = Field(min_length=6)
    confirm_password: str


class LoginUserS(BaseModel):
    email: EmailStr
    password: str = Field(min_length=6)
