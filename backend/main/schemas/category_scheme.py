from pydantic import BaseModel, Field


class ReturnCategoryS(BaseModel):
    id: int
    name: str
    sticker: str


class CreateCategoryS(BaseModel):
    name: str
    sticker: str = Field(max_length=1)
