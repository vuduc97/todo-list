import { Button, ButtonColor, Dropdown, Textarea, TextField } from "../../../components/form-control";
import { DEFAULT_TODO, PRIORITY_OPTIONS } from "../../../constants";
import { useForm } from "../../../hooks";
import { Todo } from "../../../types/todo";
import { string, date } from "../../../utils/validation-utils";
import classes from "../assets/todo-form.module.scss";

interface TodoFormProps {
  initialValue?: Todo;
  onSubmit: (todo: Todo) => void;
}

export function TodoForm({ onSubmit, initialValue = { ...DEFAULT_TODO } }: TodoFormProps) {
  const { errors, getFieldValue, setFieldValue, handleSubmit, reset } = useForm<Todo>({
    initValue: { ...initialValue },
    validations: {
      name: [string().required("name", "Task title is required")],
      dueDate: [date().presentOrFutureDate("dueDate", "Due date must be greater than or equal to the current date")],
    },
    submit,
  });

  function submit(todo: Todo) {
    onSubmit(todo);
    reset();
  }

  return (
    <form onSubmit={handleSubmit} className={classes["todo-form"]}>
      <div className={classes["todo-form__group"]}>
        <TextField
          value={getFieldValue("name")}
          errorMessage={errors?.name}
          onChange={setFieldValue}
          name="name"
          placeholder="Add new task..."
        />
      </div>
      <div className={classes["todo-form__group"]}>
        <Textarea
          value={getFieldValue("description")}
          onChange={setFieldValue}
          name="description"
          label="Description"
        />
      </div>
      <div className={classes["todo-form__group"]}>
        <div className={classes["todo-form__item"]}>
          <TextField
            value={getFieldValue("dueDate")}
            onChange={setFieldValue}
            errorMessage={errors?.dueDate}
            name="dueDate"
            label="Due Date"
            type="date"
          />
        </div>
        <div className={classes["todo-form__item"]}>
          <Dropdown
            value={getFieldValue("priority")}
            onChange={setFieldValue}
            name="priority"
            label="Priority"
            options={PRIORITY_OPTIONS}
          />
        </div>
      </div>
      <div className={classes["todo-form__group"]}>
        <Button className={classes["todo-form__action"]} color={ButtonColor.Success} type="submit">
          {initialValue.id !== -1 ? "Edit" : "Add"}
        </Button>
      </div>
    </form>
  );
}
