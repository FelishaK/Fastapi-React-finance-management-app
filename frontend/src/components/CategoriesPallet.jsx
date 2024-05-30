import { useContext, useEffect } from "react";
import {
  PageContext,
  chooseCategory,
  moveAddCategory,
} from "../contexts/PageContext";
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
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
    retry: 1,
  });

  useEffect(() => {
    if (isError) {
      const statusCode = +error.message;
      if (statusCode === 404) {
        moveAddCategory(dispatch);
      } else if (statusCode === 401) {
        const isRefreshed = refreshAccessToken();
        if (isRefreshed) return navigate(0);
        return navigate("/signup");
      }
    }
  }, [navigate, error?.message, isError, dispatch]);

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
              onClick={() => chooseCategory(dispatch, category.id)}
            />
          )))}
      <li className="flex justify-center">
        {categs && curPage !== "editExpense" && (
          <Button onClick={() => moveAddCategory(dispatch)} type="add">
            +
          </Button>
        )}
      </li>
    </ul>
  );
}

export default CategoriesPallet;
