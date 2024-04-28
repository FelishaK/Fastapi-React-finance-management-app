from enum import Enum

from sqlalchemy import column
from datetime import datetime, timedelta


class ExpensePeriods(Enum):
    cur_week: int = 1
    cur_month: int = 1
    cur_year: int = 1


def convert_sort(sort: str) -> str:
    return ",".join(sort.split("-"))


def convert_columns(columns: str) -> list[column]:
    return columns.split("-")


def choose_period(period: str, base_stmt, model):
    now = datetime.now()

    if period == str(ExpensePeriods.cur_week.name):
        prev_week = now - timedelta(weeks=ExpensePeriods.cur_week.value)
        return base_stmt.where(model.created_at.between(prev_week, now))

    elif period == str(ExpensePeriods.cur_month.name):
        prev_month = now - (timedelta(days=30))
        return base_stmt.where(model.created_at.between(prev_month, now))

    elif period == str(ExpensePeriods.cur_year.name):
        prev_year = now - (timedelta(days=365))
        return base_stmt.where(model.created_at.between(prev_year, now))

    return base_stmt
