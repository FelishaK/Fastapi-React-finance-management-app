import { useContext } from "react";
import Expenses from "../components/Expenses";
import AddExpense from "../components/AddExpense";
import EditExpense from "../components/EditExpense";
import { PageContext } from "../contexts/PageContext";
import AddCategory from "../components/AddCategory";

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
