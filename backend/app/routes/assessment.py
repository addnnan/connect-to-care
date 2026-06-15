from fastapi import APIRouter, Depends
from app.database import assessment_collection
from app.schemas.assessment import Assessment
from bson import ObjectId
from app.utils.dependencies import get_current_user

router = APIRouter()

@router.post("/assessments")
def create_assessment(
    assessment: Assessment,
    user_id: str = Depends(get_current_user)
):
    data = assessment.model_dump()

    data["user_id"] = user_id

    result = assessment_collection.insert_one(data)

    data["_id"] = str(result.inserted_id)

    return data



@router.get("/assessments")
def get_assessments(
    user_id: str = Depends(get_current_user)
):

    assessments = list(
        assessment_collection.find(
            {"user_id": user_id}
        ).sort("date", -1)
    )

    for item in assessments:
        item["_id"] = str(item["_id"])

    return assessments


@router.get("/assessments/{assessment_id}")
def get_assessment(
    assessment_id: str,
    user_id: str = Depends(get_current_user)
    ):

    assessment = assessment_collection.find_one(
        {"_id": ObjectId(assessment_id), "user_id": user_id}
    )

    if not assessment:
        return {"error": "Not found"}

    assessment["_id"] = str(
        assessment["_id"]
    )

    return assessment