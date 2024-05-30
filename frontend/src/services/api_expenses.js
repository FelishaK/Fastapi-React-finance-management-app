import axios from "axios";
import { getTokenToSend } from "../utils/helpers";

async function getAllExpenses(period) {
  const tokenToSend = getTokenToSend();
  try {
    return await axios({
      method: "GET",
      url: `http://127.0.0.1:8000/expenses/all?&page=1&limit=10&sort=amount&period=${period}`,
      headers: { Authorization: tokenToSend },
    }).then((response) => response.data);
  } catch (err) {
    throw new Error(err);
  }
}

export async function getExpenseById(id) {
  const tokenToSend = getTokenToSend();
  try {
    return await axios({
      method: "GET",
      url: `http://127.0.0.1:8000/expenses/${id}`,
      headers: { Authorization: tokenToSend },
    }).then((response) => response.data);
  } catch (err) {
    throw new Error(err.message);
  }
}

async function createExpense({ categoryId, amount, creationDate }) {
  const tokenToSend = getTokenToSend();

  const data = {
    category_id: categoryId,
    amount: amount,
    created_at: creationDate,
  };

  try {
    return await axios
      .post("http://127.0.0.1:8000/expenses/", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: tokenToSend,
        },
      })
      .then((response) => response.data);
  } catch (err) {
    throw new Response("Icorrect data input", { status: 422 });
  }
}

export async function updateExpense({ id, category_id, amount, created_at }) {
  const tokenToSend = getTokenToSend();
  const dataObj = {
    category_id: category_id,
    amount: amount,
    created_at: created_at,
  };

  try {
    return await axios
      .patch(`http://127.0.0.1:8000/expenses/${id}`, dataObj, {
        headers: {
          "Content-Type": "application/json",
          Authorization: tokenToSend,
        },
      })
      .then((response) => response?.response?.data);
  } catch (err) {
    throw new Response("Invalid input", { status: 422 });
  }
}

export async function deleteExpense({ expenseId }) {
  const tokenToSend = getTokenToSend();

  try {
    return await axios
      .delete(`http://127.0.0.1:8000/expenses/${expenseId}`, {
        headers: {
          Authorization: tokenToSend,
        },
      })
      .then((response) => response.status);
  } catch (err) {
    throw new Error(err.message);
  }
}
export { getAllExpenses, createExpense };
