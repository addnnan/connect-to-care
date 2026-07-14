from fastapi import APIRouter, Depends
from app.database import assessment_collection
from app.schemas.assessment import Assessment
from bson import ObjectId
from app.utils.dependencies import get_current_user

router = APIRouter()

ML_BEHAVIORAL_WEIGHTS = {
    # Critical Predictors
    "A1": 0.26,   # Follows point
    "A9": 0.26,   # Brings objects to show
    "A3": 0.17,   # Pretend play
    "A6": 0.13,   # Gazing following
    "A10": 0.11,  # Response to name
    # Baseline (Everything else defaults to 0.02)
    "A2": 0.02, "A4": 0.02, "A5": 0.02, "A7": 0.02, "A8": 0.02, 
    "A11": 0.02, "A12": 0.02, "A13": 0.02, "A14": 0.02, "A15": 0.02, 
    "A17": 0.02, "A18": 0.02, "A19": 0.02, "A20": 0.02
}

MCHAT_QUESTIONS = {
    1: {"id": "mchat_1", "domain": "communication", "text": "If you point at something across the room, does your child look at it?"},
    2: {"id": "mchat_2", "domain": "sensory", "text": "Have you ever wondered if your child might be deaf?"},
    3: {"id": "mchat_3", "domain": "motor", "text": "Does your child play pretend or make-believe?"},
    4: {"id": "mchat_4", "domain": "motor", "text": "Does your child like climbing on things?"},
    5: {"id": "mchat_5", "domain": "sensory", "text": "Does your child make unusual finger movements near his or her eyes?"},
    6: {"id": "mchat_6", "domain": "communication", "text": "Does your child point with one finger to ask for something or to get help?"},
    7: {"id": "mchat_7", "domain": "communication", "text": "Does your child point with one finger to show you something interesting?"},
    8: {"id": "mchat_8", "domain": "social", "text": "Is your child interested in other children?"},
    9: {"id": "mchat_9", "domain": "communication", "text": "Does your child show you things by bringing them to you or holding them up for you to see — not to get help, but just to share?"},
    10: {"id": "mchat_10", "domain": "communication", "text": "Does your child respond when you call his or her name?"},
    11: {"id": "mchat_11", "domain": "social", "text": "When you smile at your child, does he or she smile back at you?"},
    12: {"id": "mchat_12", "domain": "sensory", "text": "Does your child get upset by everyday noises?"},
    13: {"id": "mchat_13", "domain": "motor", "text": "Does your child walk?"},
    14: {"id": "mchat_14", "domain": "social", "text": "Does your child look you in the eye when you are talking to him or her, playing with him or her, or dressing him or her?"},
    15: {"id": "mchat_15", "domain": "communication", "text": "Does your child try to copy what you do?"},
    16: {"id": "mchat_16", "domain": "communication", "text": "If you turn your head to look at something, does your child look around to see what you are looking at?"},
    17: {"id": "mchat_17", "domain": "social", "text": "Does your child try to get you to watch him or her?"},
    18: {"id": "mchat_18", "domain": "communication", "text": "Does your child understand when you tell him or her to do something?"},
    19: {"id": "mchat_19", "domain": "social", "text": "If something new happens, does your child look at your face to see how you feel about it?"},
    20: {"id": "mchat_20", "domain": "motor", "text": "Does your child like movement activities?"}
}

@router.post("/assessments")
def create_assessment(
    assessment: Assessment,
    user_id: str = Depends(get_current_user)
):
    data = assessment.model_dump()
    data["user_id"] = user_id

    a_type = data.get("type")
    if a_type in ("autism", "autism-followup"):
        failed_items = []
        details = data.get("details", {})
        
        if a_type == "autism":
            elevated_nums = details.get("elevatedItems", [])
            for num in elevated_nums:
                try:
                    num_int = int(num)
                    failed_items.append(num_int)
                except (ValueError, TypeError):
                    pass
        elif a_type == "autism-followup":
            item_scores = details.get("itemScores", {})
            for key, val in item_scores.items():
                if val == 1:
                    try:
                        num_int = int(key.split("_")[1])
                        failed_items.append(num_int)
                    except (IndexError, ValueError, TypeError):
                        pass
        
        sorted_failed = []
        for num in failed_items:
            q_info = MCHAT_QUESTIONS.get(num)
            if q_info:
                weight = ML_BEHAVIORAL_WEIGHTS.get(f"A{num}", 0.02)
                sorted_failed.append({
                    "num": num,
                    "id": q_info["id"],
                    "question": q_info["text"],
                    "domain": q_info["domain"],
                    "weight": weight
                })
        
        sorted_failed.sort(key=lambda x: (-x["weight"], x["num"]))
        
        if "details" not in data:
            data["details"] = {}
        data["details"]["sortedFailedQuestions"] = sorted_failed

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