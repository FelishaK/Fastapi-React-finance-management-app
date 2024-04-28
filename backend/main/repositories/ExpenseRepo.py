from sqlalchemy import select, text, and_
from sqlalchemy.ext.asyncio import AsyncSession
from main.repositories.BaseRepo import BaseRepo
from main.models import Expense, Category, User
from main.schemas import ReturnExpenseS, CreateExpenseS, UpdateExpenseS, ReturnShortExpenseS
from main.exceptions import NoDataFoundExc
from main.utils.helpers import convert_sort
from main.utils.helpers import choose_period
from core.AbstractRepository import AbstractRepo


class ExpenseRepo(BaseRepo):
    model = Expense

    def __init__(self: AbstractRepo):
        super().__init__(self.model)

    async def get_all(
        self,
        session: AsyncSession,
        user_id: int,
        period: str,
        page: int,
        limit: int,
        sort: str,
    ) -> list[ReturnExpenseS]:
        base_stmt = (
            select(
                Expense.id,
                Expense.amount,
                Expense.user_id,
                Expense.category_id,
                Category.sticker,
                Category.name,
                Expense.created_at,
            )
            .join(Category, Expense.category_id == Category.id)
            .join(User, Expense.user_id == User.id)
            .where(Expense.user_id == user_id)
        )

        base_stmt = choose_period(period=period, base_stmt=base_stmt, model=Expense)

        if sort and sort != "null":
            to_sort = text(convert_sort(sort))
            base_stmt = base_stmt.order_by(to_sort)

        offset_page = page - 1
        stmt = base_stmt.offset(offset_page * limit).limit(limit)

        res = (await session.execute(stmt)).mappings()

        if not res:
            raise NoDataFoundExc

        return [
            ReturnExpenseS(
                id=el["id"],
                category_name=el["name"],
                amount=el["amount"],
                sticker=el["sticker"],
                created_at=el["created_at"],
            )
            for el in res
        ]

    async def get_expense_by_id(self, session: AsyncSession, id: int, user_id: int) -> ReturnShortExpenseS:
        stmt = (
            select(
                Expense.id,
                Expense.amount,
                Expense.user_id,
                Expense.category_id,
                Expense.created_at,
            )
            .join(Category, Expense.category_id == Category.id)
            .join(User, Expense.user_id == User.id)
            .where(and_(Expense.id == id, User.id == user_id))
        )
        try:
            res = (await session.execute(stmt)).mappings().all()[0]
        except IndexError:
            raise NoDataFoundExc

        return ReturnShortExpenseS(
            id=res["id"],
            category_id=res["category_id"],
            amount=res["amount"],
            created_at=res["created_at"],
        )

    async def create_expense(self, session: AsyncSession, user_id: int, data: CreateExpenseS) -> None:
        data_obj: dict = data.model_dump()
        data_obj["user_id"] = user_id
        return await super().create(session=session, instance=data_obj)

    async def update(
        self, session: AsyncSession, update_data: UpdateExpenseS, instance_id: int
    ) -> ReturnExpenseS:
        data_obj: dict = update_data.model_dump(exclude_unset=True)
        return await super().update(
            session=session, instance_id=instance_id, update_data=data_obj
        )

    async def delete(self, session: AsyncSession, id: int) -> None:
        return await super().delete(session=session, instance_id=id)
