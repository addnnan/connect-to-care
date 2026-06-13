from fastapi import APIRouter
from app.database import assessment_collection
from app.schemas.assessment import Assessment
from bson import ObjectId

router = APIRouter()

@router.post("/assessments")
def create_assessment(data: Assessment):

    assessment = data.model_dump()

    result = assessment_collection.insert_one(
        assessment
    )

    assessment["_id"] = str(result.inserted_id)
    return assessment



@router.get("/assessments")
def get_assessments():

    assessments = list(
        assessment_collection.find().sort("date", -1)
    )

    for item in assessments:
        item["_id"] = str(item["_id"])

    return assessments


@router.get("/assessments/{assessment_id}")
def get_assessment(assessment_id: str):

    assessment = assessment_collection.find_one(
        {"_id": ObjectId(assessment_id)}
    )

    if not assessment:
        return {"error": "Not found"}

    assessment["_id"] = str(
        assessment["_id"]
    )

    return assessment