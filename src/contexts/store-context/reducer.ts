import { STORAGE_KEY } from "../../constants";
import { Action, StoreAction } from "../../types/store-context";
import { DELETE_FLAG, Todo } from "../../types/todo";

export const todoReducer = (state: Todo[], action: StoreAction): Todo[] => {
    const { type, payload } = action;

    switch (type) {
        // Add todo item
        case Action.Add:
            return addTodo(state, payload);
        // Edit todo item    
        case Action.Edit:
            return editTodo(state, payload)
        // Delete todo item  
        case Action.Delete:
            return deleteTodo(state, payload);
        // Mark element is deleted    
        case Action.MarkAsDelete:
            return markAsDelete(state, payload);
        case Action.Set:
        default:
            return [...payload];

    }
};

function addTodo(todos: Todo[], item: Todo) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...todos, item]));
    return [...todos, item];
}

function editTodo(todos: Todo[], item: Todo) {
    const editIndex = todos.findIndex((todo) => todo.id === item.id);
    if (editIndex === -1) {
        return [...todos];
    }

    todos[editIndex] = { ...item };
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...todos]));

    return [...todos];
}

function deleteTodo(todos: Todo[], id: number) {
    const restTodoItems = todos.filter((todo) => todo.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...restTodoItems]));

    return restTodoItems;
}

function markAsDelete(todos: Todo[], deleteItems: number[]) {
    const markAsDeleteItems = todos.map((todo) => ({
        ...todo,
        [DELETE_FLAG]: deleteItems.includes(todo.id)
    }));

    return markAsDeleteItems;
}