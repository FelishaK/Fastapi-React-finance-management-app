from sqlalchemy.orm import Mapped, mapped_column, relationship
from main.models import Base
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from main.models import Expense


class User(Base):
    username: Mapped[str]
    email: Mapped[str] = mapped_column(unique=True)
    hashed_password: Mapped[str]

    expenses: Mapped[list["Expense"]] = relationship(
        back_populates="user", cascade="all, delete-orphan"
    )
