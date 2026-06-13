from fastapi import FastAPI
from pydantic import BaseModel
from app.ai.openai_eval import analyze_text
from fastapi.middleware.cors import CORSMiddleware
from app.routes.assessment import router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)

class AssessmentRequest(BaseModel):
    text: str

@app.post("/api/analyze")
def analyze_assessment(req: AssessmentRequest):
    return analyze_text(req.text)
