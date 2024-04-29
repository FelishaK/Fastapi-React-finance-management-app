
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession
from starlette import status

from core.AbstractRepository import AbstractRepo
from sqlalchemy import insert, update, delete, and_
from sqlalchemy.sql import select
from main.models import Category, Expense, User
from typing import TypeVar, Generic
from main.exceptions import NoDataFoundExc
from fastapi import HTTPException

DataT = TypeVar("DataT", Category, Expense, User)


class BaseRepo(AbstractRepo, Generic[DataT]):
    __slots__ = ("model",)

    def __init__(self, model):
        self.model = model

    async def get(
        self,
        user_id: int,
        session: AsyncSession,
    ) -> list[DataT]:
        stmt = select(self.model).where(self.model.user_id == user_id)

        if not (res := list(await session.scalars(stmt))):
            raise NoDataFoundExc
        return res

    async def get_by_id(self, user_id: int, session: AsyncSession, id: int) -> DataT:
        stmt = select(self.model).where(and_(self.model.user_id == user_id, self.model.id == id))

        if not (res := (await session.execute(stmt)).scalar_one_or_none()):
            raise NoDataFoundExc
        return res

    async def create(self, session: AsyncSession, instance: dict) -> DataT:
        stmt = insert(self.model).values(**instance).returning(self.model)

        try:
            returned_instance = await session.execute(stmt)
            await session.commit()
            return returned_instance.scalar_one_or_none()

        except IntegrityError as e:
            print(e)
            raise HTTPException(
                status_code=400,
                detail="Some error occurred while creating. May be entity already exists or no "
                "associative entity",
            )

    async def update(
        self, session: AsyncSession, update_data: dict, instance_id: int
    ) -> DataT:
        stmt = (
            update(self.model)
            .values(**update_data)
            .where(self.model.id == instance_id)
            .returning(self.model)
        )

        try:
            returned_instance = await session.execute(stmt)
            await session.commit()
            return returned_instance.scalar_one_or_none()
        except IntegrityError as e:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Some conflict occurred while updating data",
            )

    async def delete(self, session: AsyncSession, instance_id: int) -> None:
        res = await session.execute(
            select(self.model).where(self.model.id == instance_id))
        if not res.scalar_one_or_none():
            raise NoDataFoundExc

        stmt = delete(self.model).where(self.model.id == instance_id)

        try:
            await session.execute(stmt)
            await session.commit()
        except IntegrityError as e:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Some conflict occurred while deleting data",
            )
