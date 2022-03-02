export const DELETE_FLAG = Symbol.for("deleteFlag");

export enum Priority {
    Low,
    Normal,
    High
}

export interface Todo {
    id: number;
    name: string;
    description?: string;
    dueDate: Date | string;
    priority: Priority;
    [DELETE_FLAG]?: boolean;
}