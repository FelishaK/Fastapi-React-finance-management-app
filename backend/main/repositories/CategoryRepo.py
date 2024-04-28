from sqlalchemy import select, and_
from sqlalchemy.ext.asyncio import AsyncSession

from main.exceptions import NoDataFoundExc
from main.repositories.BaseRepo import BaseRepo
from main.models import Category
from main.schemas import ReturnCategoryS, CreateCategoryS
from core.AbstractRepository import AbstractRepo


class CategoryRepo(BaseRepo):
    model = Category

    def __init__(self: AbstractRepo):
        super().__init__(self.model)

    async def get_all(
        self,
        session: AsyncSession,
        user_id: int
    ) -> list[ReturnCategoryS]:
        res: list[Category] = await super().get(
            session=session,
            user_id=user_id
        )
        return [
            ReturnCategoryS(id=el.id, name=el.name, sticker=el.sticker) for el in res
        ]

    async def get_by_id(
            self, session: AsyncSession, user_id: int, id: int
    ) -> ReturnCategoryS:
        return await super().get_by_id(session=session, user_id=user_id, id=id)

    async def create_category(
        self, session: AsyncSession, user_id: int, data: CreateCategoryS
    ) -> ReturnCategoryS:
        data_obj: dict = data.model_dump()
        data_obj["user_id"] = user_id
        result_inst: Category = await super().create(session=session, instance=data_obj)

        return ReturnCategoryS(
            id=result_inst.id, name=result_inst.name, sticker=result_inst.sticker
        )

    async def delete(self, session: AsyncSession, id: int) -> None:
        return await super().delete(session=session, instance_id=id)
