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
    // case "pages/changePage":
    //   return { ...state, page: action.payload };

    case "pages/addExpense":
      return { ...state, page: action.payload };

    case "pages/editExpense":
      return { ...state, page: action.payload };

    case "pages/addCategory":
      return { ...state, page: action.payload };

    case "pages/initial":
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
        moveInitial,
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

function moveInitial(dispatch) {
  return dispatch({ type: "pages/initial", payload: "initial" });
}

function moveAddExpense(dispatch) {
  return dispatch({ type: "pages/addExpense", payload: "addExpense" });
}

function moveEditExpense(dispatch) {
  return dispatch({ type: "pages/editExpense", payload: "editExpense" });
}

function moveAddCategory(dispatch) {
  return dispatch({ type: "pages/addCategory", payload: "addCategory" });
}

function chooseCategory(dispatch, data) {
  return dispatch({ type: "pages/chooseCategory", payload: data });
}

export {
  PageProvider,
  PageContext,
  moveInitial,
  moveAddExpense,
  moveEditExpense,
  moveAddCategory,
  chooseCategory,
};
