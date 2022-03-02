import { DEFAULT_TODO } from "../../constants";
import { useStore } from "../../contexts/store-context/store-context";
import { Action } from "../../types/store-context";
import { DELETE_FLAG, Todo } from "../../types/todo";
import { TodoForm } from "./components/TodoForm";
import classes from "./assets/add-todo-form.module.scss";

export function AddTodoContainer() {
  const { dispatch } = useStore();

  function addTodo(todo: Todo) {
    dispatch({ type: Action.Add, payload: { ...todo, id: Date.now(), [DELETE_FLAG]: false } });
  }

  return (
    <div className={classes["add-todo-form__container"]}>
      <h1 className={classes["add-todo-form__title"]}>New Task</h1>
      <TodoForm initialValue={{ ...DEFAULT_TODO }} onSubmit={addTodo} />
    </div>
  );
}
