import bcrypt
from bcrypt import checkpw, hashpw
from fastapi import HTTPException, status
from core.configs.settings_conf import settings


def hash_password(password: str, salt: str = settings.SALT) -> str:
    print("PASSWORD: ", password)
    print("SALT: ", salt)
    password_to_bytes = password.encode("utf8")
    hashed_password = hashpw(password_to_bytes, salt.encode("utf8"))
    return hashed_password.decode("utf8")


def validate_password(password: str, hashed_password: str) -> bool:
    if not (
        is_password_correct := checkpw(password.encode(), hashed_password.encode())
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Wrong password"
        )
    return is_password_correct
