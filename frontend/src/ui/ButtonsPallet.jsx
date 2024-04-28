import { useContext } from "react";
import Button from "./Button";
import { PageContext } from "../contexts/PageContext";

function ButtonsPallet({ cancelPageName, formName }) {
  const { dispatch } = useContext(PageContext);

  return (
    <div className="flex w-full justify-around">
      <Button
        type="cancel"
        onClick={() =>
          dispatch({
            type: "pages/changePage",
            payload: cancelPageName,
          })
        }
      >
        Cancel
      </Button>
      <Button />
      <Button type="confirm" form={formName}>
        Confirm
      </Button>
    </div>
  );
}

export default ButtonsPallet;
