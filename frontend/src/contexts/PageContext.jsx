import { createContext, useReducer } from "react";

const PageContext = createContext("page");

//pages: initial, addExpense, editExpense, addCategory

const initialState = {
  page: "initial",
  chosenExpenseId: null,
  chosenCategory: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "pages/changePage":
      return { ...state, page: action.payload };

    case "pages/chooseCategory":
      if (action.payload === state.chosenCategory)
        return { ...state, chosenCategory: null };
      return { ...state, chosenCategory: action.payload };

    case "pages/chooseExpenseId":
      return { ...state, chosenExpenseId: action.payload };

    default:
      throw new Error("Unknown action type!");
  }
}

function PageProvider({ children }) {
  const [
    {
      page: curPage,
      chosenCategory: chosenCategory,
      username,
      chosenExpenseId,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  return (
    <PageContext.Provider
      value={{
        curPage,
        username,
        chosenCategory,
        dispatch,
        chosenExpenseId,
      }}
    >
      {children}
    </PageContext.Provider>
  );
}

export { PageProvider, PageContext };
