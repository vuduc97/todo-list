import { useState } from "react";
import { Accordion, Fade } from "../../../components/animations";
import { Button, ButtonColor, Checkbox } from "../../../components/form-control";
import { DELETE_FLAG, Todo } from "../../../types/todo";
import { TodoForm } from "./TodoForm";
import classes from "../assets/todo-item.module.scss";

interface TodoItemProps {
  todo: Todo;
  bulkFlag: boolean;
  onEdit: (todo: Todo) => void;
  onDelete: (id: number) => void;
  onBulkCheck: (id: number) => void;
}

export function TodoItem({ todo, bulkFlag, onBulkCheck, onEdit, onDelete }: TodoItemProps) {
  const [fadedOut, setFadeOut] = useState(false);
  const [expand, setExpand] = useState(false);

  function handleEdit(todo: Todo) {
    onEdit(todo);
    setExpand(false);
  }

  return (
    <Fade
      className={classes["todo-item__container"]}
      fadeOut={fadedOut || todo[DELETE_FLAG] || false}
      onFadedOut={() => onDelete(todo.id)}
    >
      <header className={classes["todo-item__header"]}>
        <div className={classes["todo-item__title"]}>
          <Checkbox checked={bulkFlag} label={todo.name} onChange={() => onBulkCheck(todo.id)} />
        </div>
        <div className={classes["todo-item__action"]}>
          <Button color={ButtonColor.Info} onClick={() => setExpand(!expand)}>
            Detail
          </Button>
          <Button color={ButtonColor.Danger} onClick={() => setFadeOut(true)}>
            Remove
          </Button>
        </div>
      </header>
      <Accordion expand={expand}>
        <section className={classes["todo-item__form"]}>
          <TodoForm initialValue={{ ...todo }} onSubmit={handleEdit} />
        </section>
      </Accordion>
    </Fade>
  );
}
