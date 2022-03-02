import { Todo } from './../types/todo';
import { KeyValue } from './../types/common';
import { Priority } from "../types/todo";

export const PRIORITY_OPTIONS: KeyValue<number, string>[] = [
    {
        key: Priority.Low,
        value: "Low"
    },
    {
        key: Priority.Normal,
        value: "Normal"
    },
    {
        key: Priority.High,
        value: "High"
    }
]

export const STORAGE_KEY = "todo-list";

export const DEFAULT_TODO: Todo = {
    id: -1,
    name: "",
    priority: Priority.Normal,
    dueDate: new Date().toISOString().slice(0, 10),
    description: ""
}