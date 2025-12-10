from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from typing import List
from uuid import UUID
from app.utils.db import get_session
from app.models.study_plan_model import StudyPlan

router = APIRouter(prefix="/study-plans", tags=["Study Plans"])

@router.post("/", response_model=StudyPlan, status_code=status.HTTP_201_CREATED)
def create_study_plan(
    plan: StudyPlan, 
    db: Session = Depends(get_session)
):
    """Creates a new study plan."""
    db.add(plan)
    db.commit()
    db.refresh(plan)
    return plan

@router.get("/{user_id}", response_model=List[StudyPlan])
def get_user_study_plans(
    user_id: UUID, 
    db: Session = Depends(get_session)
):
    """Retrieves all study plans for a specific user."""
    statement = select(StudyPlan).where(StudyPlan.user_id == user_id)
    plans = db.exec(statement).all()
    return plans