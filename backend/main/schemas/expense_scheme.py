from pydantic import BaseModel
from datetime import date


class ReturnExpenseS(BaseModel):
    id: int
    amount: float
    category_name: str
    sticker: str
    created_at: date

class ReturnShortExpenseS(BaseModel):
    id: int
    amount: float
    category_id: int
    created_at: date


class CreateExpenseS(BaseModel):
    category_id: int
    amount: float
    created_at: date


class UpdateExpenseS(BaseModel):
    category_id: int
    amount: float
    created_at: date | None = None
