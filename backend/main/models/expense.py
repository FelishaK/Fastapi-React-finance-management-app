from typing import TYPE_CHECKING
from sqlalchemy import ForeignKey, TIMESTAMP, ForeignKeyConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship
from main.models import Base
from datetime import datetime


if TYPE_CHECKING:
    from main.models import Category
    from main.models import User


class Expense(Base):

    category_id: Mapped[int] = mapped_column(
        ForeignKey("categories.id")
    )
    user_id: Mapped[int | None] = mapped_column(
        ForeignKey("users.id")
    )
    amount: Mapped[float]
    created_at: Mapped[datetime] = mapped_column(TIMESTAMP(timezone=False))

    category: Mapped["Category"] = relationship(back_populates="expenses")

    user: Mapped["User"] = relationship(back_populates="expenses")

    def __repr__(self):
        return f"Expense(name={self.category_id}, category_id={self.category_id}, amount={self.amount})"
