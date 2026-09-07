from datetime import datetime
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

app = FastAPI(title="Booking Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class BookingSchema(BaseModel):
    client_name: str = Field(min_length=2, max_length=50)
    service_name: str = Field(min_length=2)
    booking_time: str

class Booking(BookingSchema):
    id: int
    
bookings_db = []

@app.get("/api/bookings")
def get_all_bookings():
    return bookings_db

@app.post("/api/bookings", status_code=status.HTTP_201_CREATED)
def create_booking(data: BookingSchema):
    for item in bookings_db:
        if item.booking_time == data.booking_time:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Это время уже занято, выберите другое"
            )
    new_booking = Booking(
        id=len(bookings_db) + 1,
        **data.model_dump()
    )
    bookings_db.append(new_booking)
    return new_booking