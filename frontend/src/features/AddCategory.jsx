import Button from "../ui/Button";
import { useContext } from "react";
import { PageContext } from "../contexts/PageContext";
import { createCategory } from "../services/api_categories";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../main";
import { useForm } from "react-hook-form";

function AddCategory() {
  const { dispatch } = useContext(PageContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate } = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  const onSubmit = (data) => {
    mutate(data);
    dispatch({ type: "pages/changePage", payload: "addExpense" });
  };

  return (
    <section className="flex flex-col items-center gap-5 bg-white shadow-appShadow sm:h-dvh sm:w-[650px]">
      <div>
        <h1 className="font-3xl mt-36 text-center text-3xl font-medium">
          New Category
        </h1>

        <form
          id="categoryForm"
          onSubmit={handleSubmit(onSubmit)}
          className="mt-36 flex flex-col gap-10"
        >
          <div className="relative h-10 w-full min-w-[200px]">
            <div className="text-blue-gray-500 absolute right-3 top-2/4 grid h-5 w-5 -translate-y-2/4 place-items-center">
              <span>🎨</span>
            </div>
            <input
              {...register("sticker", {
                required: true,
                // maxLength: {
                //   value: 1,
                //   message: "Choose only 1 sticker!",
                // },
              })}
              className="text-blue-gray-700 font-sans disabled:bg-blue-gray-50 placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border-blue-gray-200 peer h-full w-full rounded-[7px] border border-t-transparent bg-transparent px-3 py-2.5 !pr-9 text-sm font-normal outline outline-0 transition-all placeholder-shown:border focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0"
            />
            <label className="peer-placeholder-shown:text-blue-gray-500 peer-disabled:peer-placeholder-shown:text-blue-gray-500 before:content[' '] after:content[' '] before:border-blue-gray-200 after:border-blue-gray-200 pointer-events-none absolute -top-1.5 left-0 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mr-1 before:mt-[6.5px] before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-l before:border-t before:transition-all after:pointer-events-none after:ml-1 after:mt-[6.5px] after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-r after:border-t after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-l-2 peer-focus:before:border-t-2 peer-focus:before:!border-gray-900 peer-focus:after:border-r-2 peer-focus:after:border-t-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent">
              Choose sticker (CMD/WIN + .)
            </label>
            {/* {errors?.sticker?.message && (
              <span className="text-base text-red-600">
                {errors.sticker.message}
              </span>
            )} */}
          </div>

          <div>
            <label htmlFor="category" className="font-medium">
              Category
            </label>
            <input
              {...register("name", {
                required: {
                  value: true,
                  message: "Choose a category",
                },
              })}
              type="text"
              className="border-blue-gray-200 font-sans text-blue-gray-700 placeholder-shown:border-blue-gray-200 disabled:bg-blue-gray-50 peer h-full w-full border-b bg-transparent pb-1.5 pt-4 text-center text-xl font-normal outline outline-0 transition-all focus:border-gray-900 focus:outline-0 disabled:border-0"
            />
            {errors?.name?.message && (
              <span className="text-base text-red-600">
                {errors.name.message}
              </span>
            )}
          </div>
          <div className="mt-24 flex w-full justify-around">
            <Button
              type="cancel"
              onClick={() =>
                dispatch({ type: "pages/changePage", payload: "addExpense" })
              }
            >
              Cancel
            </Button>
            <Button />
            <span className="ml-8">
              <Button form="categoryForm" submit="submit" type="confirm">
                Confirm
              </Button>
            </span>
          </div>
        </form>
      </div>
    </section>
  );
}

export default AddCategory;
