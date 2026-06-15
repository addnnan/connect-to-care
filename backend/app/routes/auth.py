from fastapi import APIRouter, HTTPException
from app.database import users_collection
from app.utils.security import hash_password
from app.utils.security import verify_password
from app.utils.auth import create_access_token

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/register")
def register(user: dict):

    existing_user = users_collection.find_one(
        {"email": user["email"]}
    )

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    users_collection.insert_one(
        {
            "name": user["name"],
            "email": user["email"],
            "password": hash_password(user["password"]),
        }
    )

    return {"message": "User registered successfully"}




@router.post("/login")
def login(data: dict):

    user = users_collection.find_one(
        {"email": data["email"]}
    )

    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    valid = verify_password(
        data["password"],
        user["password"]
    )

    if not valid:
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    token = create_access_token(
        str(user["_id"])
    )

    return {
        "token": token,
        "user": {
            "id": str(user["_id"]),
            "name": user["name"],
            "email": user["email"],
        }
    }





