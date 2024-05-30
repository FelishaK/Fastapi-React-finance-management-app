# About the project

### This a simple expenses management app that allows you to keep track of how much money you spent on a particular expense category.You can sign up / sign in / log out of your account, choose date of expense, then edit the expense record or delete it if you want.

### Features implemented:

- Expenses, categories CRUD
- filtering by period (week, month, year)
- pagination (only top 10 expenses are displayed within each period)
- Authorization via JWT tokens (access and refresh tokens implemented)

---

### Core backend tech stack used: FastApi, Pydantic, SQLAlchemy 2.0, Alembic

### Core frontend tech stack used: React, tailwind CSS, React Router, React Query, Axious

# How to use the project

1. Clone repo: git clone https://github.com/FelishaK/Fastapi-React-finance-management-app.git
2. cd Fastapi-React-finance-management-app\backend 
3. docker-compose up --build
4. docker exec -it application bash
5. cd alembic
6. mkdir versions
7. cd .. 
7. alembic revision --autogenerate
8. alembic upgrade head

