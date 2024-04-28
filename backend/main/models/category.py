from typing import TYPE_CHECKING
from sqlalchemy import UniqueConstraint, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from main.models import Base

if TYPE_CHECKING:
    from main.models import Expense


class Category(Base):
    __tablename__ = "categories"

    __table_args__ = (
        UniqueConstraint(
            "name",
            "sticker",
            name="uq_name_sticker",
        ),
    )

    name: Mapped[str] = mapped_column(unique=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    sticker: Mapped[str]

    expenses: Mapped[list["Expense"]] = relationship(
        back_populates="category", cascade="all, delete-orphan"
    )

    def __repr__(self):
        return f"Category(name={self.name}, user_id={self.user_id}, sticker={self.sticker})"
