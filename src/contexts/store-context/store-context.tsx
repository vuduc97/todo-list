import { createContext, FC, useContext, useEffect, useReducer } from "react";
import { STORAGE_KEY } from "../../constants";
import { Action, StoreContextProps } from "../../types/store-context";
import { Todo } from "../../types/todo";
import { todoReducer } from "./reducer";

export const StoreContext = createContext<StoreContextProps>({
  todos: [],
  dispatch: () => {},
});

export const useStore = () => useContext(StoreContext);

export const StoreProvider: FC = ({ children }) => {
  const [todos, dispatch] = useReducer(todoReducer, [] as Todo[]);

  useEffect(() => {
    const todoItems = localStorage.getItem(STORAGE_KEY);

    if (todoItems) {
      dispatch({ type: Action.Set, payload: [...JSON.parse(todoItems)] });
    }
  }, []);

  return <StoreContext.Provider value={{ todos, dispatch }}>{children}</StoreContext.Provider>;
};
