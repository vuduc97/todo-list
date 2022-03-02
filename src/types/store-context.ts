import { Todo } from "./todo";

export interface StoreContextProps {
    todos: Todo[];
    dispatch: (action: StoreAction) => void;
}

export enum Action {
    Set,
    Add,
    Edit,
    Delete,
    MarkAsDelete
}

export interface ModifyAction {
    type: Action.Add | Action.Edit;
    payload: Todo;
}

export interface DeleteAction {
    type: Action.Delete;
    payload: number;
}

export interface MarkAsDeleteAction {
    type: Action.MarkAsDelete;
    payload: number[];
}

export interface SetTodoAction {
    type: Action.Set;
    payload: Todo[];
}

export type StoreAction = SetTodoAction | ModifyAction | DeleteAction | MarkAsDeleteAction;