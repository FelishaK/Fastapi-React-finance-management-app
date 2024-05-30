from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from core.AbstractRepository import AbstractAuthRepo
from main.exceptions import NoDataFoundExc
from auth.helpers import hash_password
from main.models import User
from auth.jwt_exceptions import AlreadyExists, PasswordsDoNotMatchExc, NotAuthedExc
from core.configs.settings_conf import settings as config


class AuthRepo(AbstractAuthRepo):
    user_model = User

    async def get_auth_user_data(self, session: AsyncSession, email: str) -> dict:
        stmt = select(self.user_model).where(self.user_model.email == email)

        try:
            res: User = (await session.execute(stmt)).one_or_none()[0]
            if res:
                return {
                    "id": res.id,
                    "password": res.hashed_password,
                    "username": res.username,
                    "email": res.email,
                }
        except IndexError:
            raise NotAuthedExc("Wrong email / password")
        except TypeError:
            raise NotAuthedExc("Wrong email / password")

    async def register(self, session: AsyncSession, user_data: dict) -> None:
        if user_data["password"] != user_data["confirm_password"]:
            raise PasswordsDoNotMatchExc

        hashed_password = hash_password(
            password=user_data["password"], salt=config.SALT
        )
        try:
            await self.get_auth_user_data(session=session, email=user_data["email"])
        except NotAuthedExc:
            user = User(
                username=user_data["username"],
                email=user_data["email"],
                hashed_password=hashed_password,
            )
            session.add(user)
            await session.commit()
            return
        raise AlreadyExists("User")
