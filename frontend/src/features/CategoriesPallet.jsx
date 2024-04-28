import { useContext } from "react";
import { PageContext } from "../contexts/PageContext";
import Loader from "../ui/Loader";
import ChooseCategory from "../ui/ChooseCategory";
import Button from "../ui/Button";
import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "../services/api_categories";
import { useNavigate } from "react-router-dom";
import { refreshAccessToken } from "../services/api_auth";

function CategoriesPallet() {
  const { dispatch, chosenCategory, curPage } = useContext(PageContext);
  const navigate = useNavigate();

  const {
    isPending,
    data: categs,
    isError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
    retry: 2,
    onError: (error) => {
      if (error.status === 404) {
        navigateAddCategory();
      } else if (error.status === 401) {
        const isRefreshed = refreshAccessToken();
        if (isRefreshed) return navigate(0);
        return navigate("/signup");
      }
    },
  });

  function chooseCategory(categoryId) {
    dispatch({ type: "pages/chooseCategory", payload: categoryId });
  }

  function navigateAddCategory() {
    dispatch({ type: "pages/changePage", payload: "addCategory" });
  }

  return (
    <ul className="relative grid grid-cols-4 grid-rows-3  gap-14 text-2xl">
      {(isPending && <Loader />) ||
        (!isPending &&
          !isError &&
          categs?.map((category) => (
            <ChooseCategory
              key={category.id}
              id={category.id}
              isChosen={chosenCategory}
              sticker={category.sticker}
              category={category.name}
              onClick={() => chooseCategory(category.id)}
            />
          )))}
      <li className="flex justify-center">
        {categs && curPage !== "editExpense" && (
          <Button onClick={navigateAddCategory} type="add">
            +
          </Button>
        )}
      </li>
    </ul>
  );
}

export default CategoriesPallet;
