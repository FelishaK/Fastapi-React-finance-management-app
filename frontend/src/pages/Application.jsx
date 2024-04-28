import { useContext } from "react";
import Expenses from "../features/Expenses";
import AddExpense from "../features/AddExpense";
import EditExpense from "../features/EditExpense";
import { PageContext } from "../contexts/PageContext";
import AddCategory from "../features/AddCategory";

function Application() {
  const { curPage } = useContext(PageContext);
  const isEditExpense = curPage === "editExpense";
  const isInitial = curPage === "initial";
  const isAddExpense = curPage === "addExpense";
  const isAddCategory = curPage === "addCategory";
  return (
    <>
      {(isAddExpense && <AddExpense />) ||
        (isInitial && <Expenses />) ||
        (isAddCategory && <AddCategory />) ||
        (isEditExpense && <EditExpense />)}
    </>
  );
}

export default Application;
