# About the project

### This a simple expenses management app that allows you to keep track of how much money you spent on a particular expense category.You can sign up / sign in / log out of your account, choose date of expense, then edit the expense record or delete it if you want.

### Features implemented:

- Expenses, categories CRUD
- Authorization via JWT tokens (access and refresh tokens implemented)

---

### Core backend tech stack used: FastApi, SQLAlchemy 2.0, Alembic

### Core frontend tech stack used: React, tailwind CSS, React Router, React Query

# How to use the project

1. Clone repo: git clone https://github.com/FelishaK/Fastapi-React-finance-management-app.git
2. cd Fastapi-React-finance-management-app\backend 
3. docker-compose up --build
4. docker exec -it application bash
4. alembic revision --autogenerate
6. alembic upgrade head
### Steps 4,5,6 are optional, depending on the OS you use. For me, on windows 10, migrations are not run automatically via docker container(I get error in the terminal), so I have to run them manually. If you experience some kind of problem, when tables are not created, you probably need to go through steps 4-6.
