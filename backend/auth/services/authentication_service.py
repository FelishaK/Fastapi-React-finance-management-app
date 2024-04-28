from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession
from auth.auth_repo import AuthRepo
from auth.scheme import CreateUserS
from core.AbstractService import AbstractAuthenticationService


class AuthenticationService(AbstractAuthenticationService):
    def __init__(self, repo: AuthRepo = Depends()):
        self.repo: AuthRepo = repo

    async def register_user(
        self, session: AsyncSession, user_data: CreateUserS
    ) -> None:
        data_obj: dict = user_data.model_dump()
        return await self.repo.register(session=session, user_data=data_obj)
