from sqlalchemy.ext.asyncio import (
    create_async_engine,
    async_sessionmaker,
    AsyncSession,
    async_scoped_session,
)
from asyncio import current_task
from sqlalchemy.exc import SQLAlchemyError
from core.configs.settings_conf import settings


class DbConfig:
    __slots__ = ("_engine", "_session")

    def __init__(self, url: str, echo: bool = False):
        try:
            self._engine = create_async_engine(url=url, echo=echo)

            self._session = async_sessionmaker(
                bind=self._engine,
                class_=AsyncSession,
                autoflush=False,
                expire_on_commit=False,
            )
        except SQLAlchemyError as e:
            raise f"DB connection error: Error while connecting to db: {e}"

    def get_scoped_session(self):
        return async_scoped_session(
            session_factory=self._session, scopefunc=current_task
        )

    async def get_async_session_dependency(self) -> AsyncSession:
        session = self.get_scoped_session()
        yield session
        await session.remove()


dbConf = DbConfig(url=settings.DB_URL, echo=True)
