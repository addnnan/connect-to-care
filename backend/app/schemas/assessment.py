from pydantic import BaseModel

class Assessment(BaseModel):
    type: str
    result: str
    score: int | None = None
    date: str
    details: dict