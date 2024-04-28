from typing import Any

from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession

from auth.scheme import ReturnUserS
from core import dbConf
from main.repositories import UserRepo


router = APIRouter(prefix="/users", tags=["Users"])


@router.get(
    "/all",
    status_code=status.HTTP_200_OK,
)
async def get_all_users(
    repo: UserRepo = Depends(),
    session: AsyncSession = Depends(dbConf.get_async_session_dependency),
) -> Any:
    return await repo.get_all(session=session)


@router.get("/{id}", status_code=status.HTTP_200_OK, response_model=ReturnUserS)
async def get_user_by_id(
    id: int,
    session: AsyncSession = Depends(dbConf.get_async_session_dependency),
    repo: UserRepo = Depends(),
):
    return (await repo.get(session=session, user_id=id))[0]
