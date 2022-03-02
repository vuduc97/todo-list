import { StoreProvider } from "../../contexts/store-context/store-context";
import { AddTodoContainer } from "../../features";
import classes from "./todo-page.module.scss";

export const TodoPage = () => {
  return (
    <StoreProvider>
      <div className={classes["todo__container"]}>
        <AddTodoContainer />
      </div>
    </StoreProvider>
  );
};
