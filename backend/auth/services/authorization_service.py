
from fastapi import Depends
from fastapi.security import HTTPAuthorizationCredentials
from sqlalchemy.ext.asyncio import AsyncSession
from auth.auth_repo import AuthRepo
from auth.jwt_exceptions import InvalidTokenExc, NotAuthedExc
from auth.scheme import TokenS, LoginUserS, ReturnUserS
from auth.helpers import validate_password
from auth.token_utils import TokenIssuer, TokenDecoder, TokenTypes


class AuthorizationService:
    def __init__(self, repo: AuthRepo = Depends()):
        self.repo = repo
        self.__tokenIssuer = TokenIssuer()
        self.__tokenDecoder = TokenDecoder()

    async def user_authorize(
        self, session: AsyncSession, user_data: LoginUserS
    ) -> TokenS:
        user = await self.repo.get_auth_user_data(
            session=session, email=user_data.email
        )
        try:
            tokens: TokenS = self.__tokenIssuer(
                email=user["email"],
                username=user["username"],
                issue_both=True
            )
            if user and validate_password(user_data.password, user["password"]):
                return tokens

        except IndexError:
            raise NotAuthedExc

    async def user_authorize_for_refresh(
            self,
            session: AsyncSession,
            credentials: HTTPAuthorizationCredentials
    ) -> TokenS:
        payload: dict = self.get_token_payload(credentials=credentials, is_refreshing=True)
        email = payload["sub"]

        user = await self.repo.get_auth_user_data(
            session=session, email=email
        )
        if user:
            token: str = self.__tokenIssuer(email=user["email"], username=user["username"], issue_refresh=False)
            print("ACCESS TOKEN", token)
            return TokenS(
                access_token=token,
                type="Bearer"
            )

    async def get_currently_authed_user(
        self, session: AsyncSession, credentials: HTTPAuthorizationCredentials
    ) -> ReturnUserS:
        payload: dict = self.get_token_payload(credentials=credentials)
        email = payload["sub"]

        user_data: dict = await self.repo.get_auth_user_data(
            session=session, email=email
        )

        return ReturnUserS(
            id=user_data["id"], username=user_data["username"], email=user_data["email"]
        )

    def get_token_payload(
            self,
            credentials: HTTPAuthorizationCredentials,
            is_refreshing: bool = False
    ) -> dict:
        token = credentials.credentials
        payload: dict = self.__tokenDecoder(token=token)
        if not is_refreshing and payload.get("token_type") != TokenTypes.ACCESS_TOKEN.value:
            raise InvalidTokenExc
        else:
            return payload
