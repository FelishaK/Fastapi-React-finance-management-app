import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { formatDate } from "../utils/helpers";
import { useForm } from "react-hook-form";

function ChooseExpensePrice({
  value: calValue,
  onChange: onCalValueChange,
  onSubmit,
  children,
  inputValue = "",
  isEditing = false,
}) {
  const [calOpen, setCalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <main className="relative mt-44 text-2xl text-paleGrey">
      <section className="flex items-center justify-center">
        <p className="flex gap-2">
          {children.length > 1 ? children[0] : children}
          {!formatDate(calValue) ? calValue : formatDate(calValue)}
        </p>
        <div className="absolute top-44 z-50">
          {!isEditing && calOpen && (
            <Calendar value={calValue} onChange={onCalValueChange} />
          )}
        </div>

        <button
          className="ml-5"
          onClick={() => setCalOpen((calOpen) => !calOpen)}
        >
          {!isEditing && (calOpen ? "❌" : "📆")}
        </button>
      </section>
      <section className="relative flex w-full flex-col">
        <form id="expenseAmountForm" onSubmit={handleSubmit(onSubmit)}>
          <input
            autoComplete="off"
            {...register("amount", {
              required: { value: true, message: "Enter amount!" },
              max: {
                value: 10000,
                message: "Maximum amount per expense is 10000.00$",
              },
            })}
            defaultValue={inputValue}
            type="text"
            id="expense"
            className="placeholder mt-9 py-1.5 pb-4  text-center  text-3xl font-bold text-gray-900 placeholder:text-center focus:outline-none"
            placeholder="0.00"
          />
        </form>

        <span className="border-round absolute inset-x-0 bottom-0 h-1  rounded-full bg-gray-200"></span>
      </section>
      <span className="flex justify-center  text-red-600">
        {errors?.amount?.message && errors.amount.message}
      </span>
      <div className="mt-5 flex w-full justify-center">{children[1]}</div>
    </main>
  );
}

export default ChooseExpensePrice;
