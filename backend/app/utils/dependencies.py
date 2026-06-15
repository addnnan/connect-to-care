from fastapi import Header, HTTPException
from jose import jwt

SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"


def get_current_user(
    authorization: str = Header(None)
):
    # print("Authorization Header:", authorization)  # Debugging line
    if not authorization:
        raise HTTPException(
            status_code=401,
            detail="Not authenticated"
        )

    token = authorization.replace(
        "Bearer ",
        ""
    )

    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        return payload["sub"]

    except Exception:
        raise HTTPException(
            status_code=401,
            detail="Invalid token"
        )