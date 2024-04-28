import { useContext, useEffect, useState } from "react";
import Button from "../ui/Button";
import CategoriesPallet from "./CategoriesPallet";
import { PageContext } from "../contexts/PageContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteExpense,
  getExpenseById,
  updateExpense,
} from "../services/api_expenses";
import ButtonsPallet from "../ui/ButtonsPallet";
import ChooseExpensePrice from "../ui/ChooseExpensePrice";
import { formatDateForAPI } from "../utils/helpers";

function EditExpense() {
  const { chosenExpenseId, dispatch, chosenCategory } = useContext(PageContext);

  const queryClient = useQueryClient();

  const { data: expense } = useQuery({
    querykey: ["expense", { chosenExpenseId }],
    queryFn: async () => await getExpenseById(chosenExpenseId),
  });

  const [value, onChange] = useState();
  const [amount, setAmount] = useState("");

  useEffect(() => {
    setAmount(expense?.amount);
    onChange(expense?.created_at);
    dispatch({ type: "pages/chooseCategory", payload: expense?.category_id });
    return () => {
      dispatch({ type: "pages/chooseCategory", payload: null });
    };
  }, [expense, amount, dispatch]);

  const { mutate: mutateDelete } = useMutation({
    mutationFn: deleteExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
  });

  const { mutateAsync: mutateUpdate } = useMutation({
    mutationFn: updateExpense,
    queryKey: ["expenses"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
  });

  const onDeleteClick = () => {
    mutateDelete({
      expenseId: expense.id,
    });
    navigateInitial();
  };

  const onSubmit = async (data) => {
    const formattedDate = formatDateForAPI(value) || value;
    mutateUpdate({
      id: chosenExpenseId,
      category_id: chosenCategory,
      amount: +data.amount,
      created_at: formattedDate,
    });
    reinitializeCategory();
    navigateInitial();
  };

  function reinitializeCategory() {
    dispatch({ type: "pages/chooseCategory", payload: null });
  }

  function navigateInitial() {
    dispatch({ type: "pages/changePage", payload: "initial" });
  }

  return (
    <section className="flex flex-col items-center  bg-white shadow-appShadow sm:h-dvh sm:w-[650px]">
      <header className="mt-10 flex flex-col text-2xl font-bold">
        <p className="text-green-500">EXPENSES</p>
      </header>

      <ChooseExpensePrice
        value={value}
        inputValue={amount}
        onChange={onChange}
        onSubmit={onSubmit}
        isEditing={true}
      >
        <span>Was created on</span>
        <Button type="delete" onClick={onDeleteClick}>
          Delete
        </Button>
      </ChooseExpensePrice>

      <div className="mt-32 flex w-full items-center justify-center px-9">
        <CategoriesPallet />
      </div>
      <ButtonsPallet cancelPageName="initial" formName="expenseAmountForm" />
    </section>
  );
}

export default EditExpense;
