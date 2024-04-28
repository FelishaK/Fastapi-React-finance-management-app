from abc import ABC, abstractmethod
from typing import TypeVar, Generic

__all__ = "AbstractRepo"

from sqlalchemy.ext.asyncio import AsyncSession

from auth.scheme import CreateUserS, LoginUserS, TokenS

ReturnDataT = TypeVar("ReturnDataT")
CreateDataT = TypeVar("CreateDataT")
UpdateDataT = TypeVar("UpdateDataT")


class AbstractRepo(ABC, Generic[ReturnDataT, CreateDataT, UpdateDataT]):
    model = None

    @abstractmethod
    async def get(self, user_id: int, session: AsyncSession) -> ReturnDataT:
        ...

    @abstractmethod
    async def get_by_id(self, user_id: int, session: AsyncSession, id: int):
        ...

    @abstractmethod
    async def create(self, session: AsyncSession, data: CreateDataT) -> ReturnDataT:
        ...

    @abstractmethod
    async def update(
        self, session: AsyncSession, update_data: UpdateDataT, instance_id: int
    ) -> ReturnDataT:
        ...


class AbstractAuthRepo:
    @abstractmethod
    async def get_auth_user_data(self, session: AsyncSession, email: str) -> dict:
        ...

    @abstractmethod
    async def register(self, session: AsyncSession, user_data: dict):
        ...
