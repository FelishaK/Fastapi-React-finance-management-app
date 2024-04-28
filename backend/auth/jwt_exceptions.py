from fastapi import HTTPException


class TokenExpiredExc(HTTPException):
    def __init__(self):
        super().__init__(
            status_code=401,
            detail="Token has been expired",
            headers={"WWW-Authenticate": "Bearer"},
        )


class InvalidTokenExc(HTTPException):
    def __init__(self):
        super().__init__(
            status_code=401,
            detail="Invalid token",
            headers={"WWW-Authenticate": "Bearer"},
        )


class NotAuthedExc(HTTPException):
    def __init__(self, message: str = "Not Authorized"):
        super().__init__(
            status_code=401, detail=f"{message}", headers={"WWW-Authenticate": "Bearer"}
        )


class PasswordsDoNotMatchExc(HTTPException):
    def __init__(self, message: str = "Passwords do not match"):
        super().__init__(
            status_code=401,
            detail=f"{message}",
        )


class AlreadyExists(HTTPException):
    def __init__(self, entity):
        super().__init__(status_code=409, detail=f"{entity} already exists!")
