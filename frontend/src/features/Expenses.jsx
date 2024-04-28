import Category from "./Category";
import Button from "../ui/Button";
import { useContext, useState } from "react";
import { PageContext } from "../contexts/PageContext";
import { getAllExpenses } from "../services/api_expenses";
import { useQuery } from "@tanstack/react-query";
import { currencyFormatter } from "../utils/helpers";
import Loader from "../ui/Loader";
import { redirect, useNavigate } from "react-router-dom";
import { getAuthedUserInfo, refreshAccessToken } from "../services/api_auth";
import userLogout from "../utils/userLogout";

function Expenses() {
  const { dispatch } = useContext(PageContext);
  const [period, setPeriod] = useState("cur_week");
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const { isPending, data: expenses } = useQuery({
    queryKey: ["expenses", { period }],
    queryFn: async () => await getAllExpenses(period),
    retry: 2,
    onError: (error) => {
      if (error.status === 401) {
        const isRefreshed = refreshAccessToken();
        if (isRefreshed) return navigate(0);
        return navigate("/signup");
      }
    },
  });

  const totalAmount =
    expenses &&
    expenses?.reduce(
      (acc, currVal) => Number(acc) + Number(currVal?.amount),
      0,
    );

  return (
    <>
      <div className="flex flex-col items-center gap-4 bg-white shadow-appShadow sm:h-dvh sm:w-[650px]">
        <header className="mt-10 flex flex-col text-2xl font-bold">
          <p className="text-green-500">EXPENSES</p>
          <p
            onClick={() => userLogout(navigate)}
            className="text-zink-800 mt-5 cursor-pointer text-center hover:text-sky-800"
          >
            {username && (
              <span title="Log out" className="ml-2">
                {username}➡
              </span>
            )}
          </p>
        </header>

        <section>
          <ul className="flex flex-col items-center gap-5">
            <li className="text-md mt-3 text-center text-paleGrey">
              Spent this month
            </li>
            <li className="mt-3 font-robotoLight text-5xl text-green-600">
              {isPending ? "Loading . . ." : currencyFormatter(totalAmount)}
            </li>
            <li>
              <Button
                onClick={() =>
                  dispatch({ type: "pages/changePage", payload: "addExpense" })
                }
                type="add"
              >
                +
              </Button>
            </li>
          </ul>
        </section>

        <section className="mt-11 h-[600px] w-full">
          <div className="flex  justify-between">
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="ml-3 text-paleGrey"
            >
              <option value="cur_week">week</option>
              <option value="cur_month">month</option>
              <option value="cur_year">year</option>
            </select>
            <p className="mr-3 text-paleGrey">
              -{currencyFormatter(totalAmount)}
            </p>
          </div>

          <ul className="mt-5 flex h-[450px] w-full flex-col-reverse gap-2 overflow-y-scroll ">
            {isPending && <Loader />}
            {expenses?.map((expense) => (
              <Category
                onClick={() => {
                  dispatch({
                    type: "pages/chooseExpenseId",
                    payload: expense.id,
                  });
                  dispatch({
                    type: "pages/changePage",
                    payload: "editExpense",
                  });
                }}
                key={expense.id}
                date={expense.created_at}
                category={expense.category_name}
                sticker={expense.sticker}
                amountSpent={currencyFormatter(expense.amount)}
              />
            ))}
          </ul>
        </section>
        <p className="mb-10 text-xl font-bold text-green-400">
          Click &quot;+&quot; to ADD expense
        </p>
      </div>
    </>
  );
}

export async function loader() {
  const err = await getAuthedUserInfo();
  if (err.message === "Network Error") {
    throw new Error("Network error");
  }
  if (err?.response?.status >= 400) {
    const isRefreshed = await refreshAccessToken();
    if (!isRefreshed) {
      return redirect("/signup");
    }
  }
  return null;
}
export default Expenses;
