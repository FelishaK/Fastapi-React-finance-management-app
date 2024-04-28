from typing import Any

from fastapi import APIRouter, Depends, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.ext.asyncio import AsyncSession

from auth.scheme import ReturnUserS
from auth.services import AuthorizationService
from core import dbConf
from main.repositories import CategoryRepo
from main.schemas import CreateCategoryS, ReturnCategoryS


router = APIRouter(prefix="/categories", tags=["Categories"])


@router.get(
    "/all",
    status_code=status.HTTP_200_OK,
)
async def get_all_categories(
    repo: CategoryRepo = Depends(),
    session: AsyncSession = Depends(dbConf.get_async_session_dependency),
    credentials: HTTPAuthorizationCredentials = Depends(HTTPBearer()),
    auth_service: AuthorizationService = Depends()
) -> Any:
    auth_data: ReturnUserS = await auth_service.get_currently_authed_user(
        session=session, credentials=credentials
    )
    return await repo.get_all(session=session, user_id=auth_data.id)


@router.get("/{id}", status_code=status.HTTP_200_OK, response_model=ReturnCategoryS)
async def get_category_by_id(
    id: int,
    session: AsyncSession = Depends(dbConf.get_async_session_dependency),
    repo: CategoryRepo = Depends(),
    credentials: HTTPAuthorizationCredentials = Depends(HTTPBearer()),
    auth_service: AuthorizationService = Depends()
):
    auth_data: ReturnUserS = await auth_service.get_currently_authed_user(
        session=session, credentials=credentials
    )
    return await repo.get_by_id(session=session, id=id, user_id=auth_data.id)


@router.post("/", status_code=status.HTTP_201_CREATED, response_model=ReturnCategoryS)
async def create_category(
    user_data: CreateCategoryS,
    session: AsyncSession = Depends(dbConf.get_async_session_dependency),
    repo: CategoryRepo = Depends(),
    credentials: HTTPAuthorizationCredentials = Depends(HTTPBearer()),
    auth_service: AuthorizationService = Depends()
):
    auth_data: ReturnUserS = await auth_service.get_currently_authed_user(
        session=session, credentials=credentials
    )
    return await repo.create_category(
        session=session, data=user_data, user_id=auth_data.id)


@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_category(
    id: int,
    session: AsyncSession = Depends(dbConf.get_async_session_dependency),
    repo: CategoryRepo = Depends(),
) -> None:
    return await repo.delete(session=session, id=id)
