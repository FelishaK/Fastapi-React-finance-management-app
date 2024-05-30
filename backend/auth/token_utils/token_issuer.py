from enum import Enum
import jwt
from fastapi import Depends
from datetime import datetime, timedelta
from auth.auth_repo import AuthRepo
from auth.scheme import TokenS
from core.configs import settings as config


class TokenTypes(Enum):
    ACCESS_TOKEN = "access"
    REFRESH_TOKEN = "refresh"


class TokenIssuer:

    def __init__(self, repo: AuthRepo = Depends()):
        self.repo: AuthRepo = repo

    def create_access_token(self, email: str, username: str) -> str:
        return self.encode_jwt(email=email, username=username)

    def create_refresh_token(self, email: str) -> str:
        return self.encode_jwt(is_refresh=True, email=email, username=None)

    @staticmethod
    def encode_jwt(email: str, username: str | None, is_refresh: bool = False) -> str:
        token_type = (TokenTypes.ACCESS_TOKEN.value if not is_refresh
                      else TokenTypes.REFRESH_TOKEN.value)

        if not is_refresh:
            payload = {
                "exp": datetime.utcnow() + timedelta(hours=config.ACCESS_TOKEN_EXPIRATION_TIME),
                "iat": datetime.utcnow(),
                "sub": email,
                "username": username,
                "token_type": token_type
            }

        else:
            payload = {
                "exp": datetime.utcnow() + timedelta(days=config.REFRESH_TOKEN_EXPIRATION_TIME),
                "iat": datetime.utcnow(),
                "sub": email,
                "token_type": token_type,

            }

        return jwt.encode(payload=payload, key=config.SECRET_KEY, algorithm="HS256")

    def __call__(
            self,
            email: str,
            username: str | None = None,
            issue_refresh: bool = False,
            issue_both: bool = False
    ):
        if issue_both:
            access_token = self.create_access_token(email=email, username=username)
            refresh_token = self.create_refresh_token(email=email)

            return TokenS(
                access_token=access_token,
                refresh_token=refresh_token,
                type="Bearer"
            )

        elif issue_refresh and not issue_both:
            return self.create_refresh_token(email=email)

        elif not issue_refresh and not issue_both:
            return self.create_access_token(email=email, username=username)


