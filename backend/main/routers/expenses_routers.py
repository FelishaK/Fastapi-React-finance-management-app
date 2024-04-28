from fastapi import APIRouter, Depends, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.ext.asyncio import AsyncSession

from auth.scheme import ReturnUserS
from core import dbConf
from main.repositories import ExpenseRepo
from main.schemas import CreateExpenseS, ReturnExpenseS, UpdateExpenseS, ReturnShortExpenseS
from auth.services import AuthorizationService


router = APIRouter(prefix="/expenses", tags=["Expenses"])


@router.get(
    "/all",
    status_code=status.HTTP_200_OK,
    response_model=list[ReturnExpenseS],
)
async def get_all_expenses(
    page: int = 1,
    limit: int = 10,
    sort: str = None,
    period: str = "cur_week",
    repo: ExpenseRepo = Depends(),
    session: AsyncSession = Depends(dbConf.get_async_session_dependency),
    credentials: HTTPAuthorizationCredentials = Depends(HTTPBearer()),
    auth_service: AuthorizationService = Depends()
):
    auth_data: ReturnUserS = await auth_service.get_currently_authed_user(
        session=session, credentials=credentials
    )
    return await repo.get_all(
            session=session,
            user_id=auth_data.id,
            period=period,
            limit=limit,
            sort=sort,
            page=page,
            )


@router.get("/{id}", status_code=status.HTTP_200_OK, response_model=ReturnShortExpenseS)
async def get_expense_by_id(
    id: int,
    session: AsyncSession = Depends(dbConf.get_async_session_dependency),
    repo: ExpenseRepo = Depends(),
    credentials: HTTPAuthorizationCredentials = Depends(HTTPBearer()),
    auth_service: AuthorizationService = Depends()
):
    auth_data: ReturnUserS = await auth_service.get_currently_authed_user(
        session=session, credentials=credentials
    )

    return await repo.get_expense_by_id(
        session=session, id=id, user_id=auth_data.id
    )


@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_expense(
    user_data: CreateExpenseS,
    session: AsyncSession = Depends(dbConf.get_async_session_dependency),
    repo: ExpenseRepo = Depends(),
    credentials: HTTPAuthorizationCredentials = Depends(HTTPBearer()),
    auth_service: AuthorizationService = Depends()
) -> None:
    auth_data: ReturnUserS = await auth_service.get_currently_authed_user(
        session=session, credentials=credentials
    )
    return await repo.create_expense(session=session, data=user_data, user_id=auth_data.id)


@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_expense(
    id: int,
    session: AsyncSession = Depends(dbConf.get_async_session_dependency),
    repo: ExpenseRepo = Depends(),
) -> None:
    return await repo.delete(session=session, id=id)


@router.patch("/{id}")
async def update_expense(
    id: int,
    update_data: UpdateExpenseS,
    session: AsyncSession = Depends(dbConf.get_async_session_dependency),
    repo: ExpenseRepo = Depends(),
):
    return await repo.update(session=session, instance_id=id, update_data=update_data)
