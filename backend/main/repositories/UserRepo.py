from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from auth.scheme import ReturnUserS
from core import AbstractRepo
from main.exceptions import NoDataFoundExc
from main.models import User
from main.repositories.BaseRepo import BaseRepo


class UserRepo(BaseRepo):
    model = User

    def __init__(self: AbstractRepo):
        super().__init__(self.model)

    async def get_all(
        self,
        session: AsyncSession,
    ) -> list[ReturnUserS]:
        stmt = select(User)
        res: list[User] = list(await session.scalars(stmt))
        print(res)

        return [
            ReturnUserS(id=el.id, username=el.username, email=el.email) for el in res
        ]

    async def get_user_id(self, session: AsyncSession, id: int) -> ReturnUserS:
        try:
            return (await super().get(session=session, user_id=id))[0]
        except IndexError:
            raise NoDataFoundExc

    async def delete(self, session: AsyncSession, id: int) -> None:
        return await super().delete(session=session, instance_id=id)
