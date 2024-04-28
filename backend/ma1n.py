import uvicorn
from fastapi import FastAPI
from main.routers.category_routers import router as category_router
from main.routers.expenses_routers import router as expenses_router
from auth.auth_routers import router as auth_router
from main.routers.user_routers import router as users_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:8080",
    "http://localhost:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


for router in (category_router, expenses_router, auth_router, users_router):
    app.include_router(router)


@app.get("/")
def home():
    return {"hello": "world"}


if __name__ == "__main__":
    uvicorn.run("ma1n:app", reload=True)
