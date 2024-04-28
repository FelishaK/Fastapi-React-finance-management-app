__all__ = ("AlreadyExistsExc", "NoDataFoundExc", "NoAssociativeEntityExc")

from fastapi import HTTPException


class AlreadyExistsExc(HTTPException):
    def __init__(self):
        super().__init__(status_code=409, detail=f"This entity already exists")


class NoAssociativeEntityExc(HTTPException):
    def __init__(self):
        super().__init__(status_code=400, detail=f"Associative entity does not exist")


class NoDataFoundExc(HTTPException):
    def __init__(self):
        super().__init__(
            status_code=404,
            detail=f"No data was found",
        )
