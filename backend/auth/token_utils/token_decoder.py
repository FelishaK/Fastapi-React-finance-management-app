import jwt
from jwt import ExpiredSignatureError, InvalidTokenError
from core.configs import settings as config
from auth.jwt_exceptions import TokenExpiredExc, InvalidTokenExc


class TokenDecoder:
    def __init__(self):
        pass

    @staticmethod
    def decode_jwt(token: str) -> dict:
        try:
            payload = jwt.decode(jwt=token, key=config.SECRET_KEY, algorithms=["HS256"])
            return payload
        except ExpiredSignatureError:
            raise TokenExpiredExc
        except InvalidTokenError:
            raise InvalidTokenExc

    def __call__(self, token: str):
        return self.decode_jwt(token=token)

