import { useStore } from "../../contexts/store-context/store-context";
import { Action } from "../../types/store-context";
import { DELETE_FLAG, Todo } from "../../types/todo";
import { Button, ButtonColor, TextField } from "../../components/form-control";
import { useState } from "react";
import classes from "./assets/todo-list.module.scss";
import { TodoItem } from "./components/TodoItem";

export function TodoListContainer() {
  const [bulkItems, setBulkItems] = useState<number[]>([]);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const { dispatch, todos } = useStore();

  function editTodo(todo: Todo) {
    dispatch({ type: Action.Edit, payload: { ...todo, [DELETE_FLAG]: false } });
  }

  function deleteTodo(id: number) {
    dispatch({ type: Action.Delete, payload: id });
  }

  function handleCheckBulkItem(id: number) {
    if (bulkItems.includes(id)) {
      setBulkItems((bulkItems) => bulkItems.filter((item) => item !== id));
      return;
    }

    setBulkItems((bulkItems) => [...bulkItems, id]);
  }

  function markAsDelete() {
    dispatch({ type: Action.MarkAsDelete, payload: [...bulkItems] });
    setBulkItems([]);
  }

  function getTodos() {
    return todos
      .filter((item) => item.name.toLowerCase().includes(searchKeyword.toLowerCase()))
      .sort((prev, next) => {
        return new Date(prev.dueDate).getTime() - new Date(next.dueDate).getTime();
      });
  }

  return (
    <div className={classes["todo-list__container"]}>
      <h1 className={classes["todo-list__title"]}>Todo List</h1>
      <section className={classes["todo-list__list"]}>
        <TextField
          className={classes["todo-list__search"]}
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          name="search"
          placeholder="Search..."
        />
        <section className={classes["todo-list__items"]}>
          {getTodos().map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              bulkFlag={bulkItems.includes(todo.id)}
              onEdit={editTodo}
              onDelete={deleteTodo}
              onBulkCheck={handleCheckBulkItem}
            />
          ))}
        </section>
      </section>
      {bulkItems.length > 0 && (
        <section className={classes["todo-list__bulk"]}>
          <p>Bulk Action</p>
          <div className={classes["todo-list__bulk__action"]}>
            <Button color={ButtonColor.Info} type="button">
              Done
            </Button>
            <Button color={ButtonColor.Danger} onClick={markAsDelete}>
              Remove
            </Button>
          </div>
        </section>
      )}
    </div>
  );
}
