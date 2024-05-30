import { useContext } from "react";
import Button from "./Button";
import { PageContext, moveInitial } from "../contexts/PageContext";

function ButtonsPallet({ navigationFunc = moveInitial, formName }) {
  const { dispatch } = useContext(PageContext);

  return (
    <div className="flex w-full justify-around">
      <Button type="cancel" onClick={() => navigationFunc(dispatch)}>
        Cancel
      </Button>
      <Button />
      <Button type="confirm" submit="submit" form={formName}>
        Confirm
      </Button>
    </div>
  );
}

export default ButtonsPallet;
