from fastapi import Depends, APIRouter
from sqlalchemy.ext.asyncio import AsyncSession

from auth.scheme import CreateUserS, TokenS, LoginUserS, ReturnUserS
from core import dbConf
from auth.services import AuthorizationService, AuthenticationService
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

router = APIRouter(prefix="/auth", tags=["Sign up & Sign in"])
http_bearer = HTTPBearer()


@router.post("/register")
async def register(
        data: CreateUserS,
        session: AsyncSession = Depends(dbConf.get_async_session_dependency),
        service: AuthenticationService = Depends(),
) -> None:
    return await service.register_user(session=session, user_data=data)


@router.post("/login", response_model=TokenS)
async def login(
        data: LoginUserS,
        session: AsyncSession = Depends(dbConf.get_async_session_dependency),
        service: AuthorizationService = Depends(),
):
    return await service.user_authorize(session=session, user_data=data)


@router.get("/me", response_model=ReturnUserS)
async def get_currently_authed_user(
        session: AsyncSession = Depends(dbConf.get_async_session_dependency),
        credentials: HTTPAuthorizationCredentials = Depends(http_bearer),
        service: AuthorizationService = Depends(),
):
    return await service.get_currently_authed_user(
        session=session, credentials=credentials
    )


@router.post(
    "/refresh",
    response_model_exclude_none=True,
    response_model=TokenS)
async def refresh_token(
        session: AsyncSession = Depends(dbConf.get_async_session_dependency),
        credentials: HTTPAuthorizationCredentials = Depends(http_bearer),
        service: AuthorizationService = Depends(),
):
    return await service.user_authorize_for_refresh(session=session, credentials=credentials)
