from abc import ABC, abstractmethod
from sqlalchemy.ext.asyncio import AsyncSession
from auth.scheme import CreateUserS


class AbstractAuthenticationService(ABC):
    @abstractmethod
    async def register_user(
        self, session: AsyncSession, user_data: CreateUserS
    ) -> None:
        ...
