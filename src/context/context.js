import { createContext, useContext, useReducer } from "react";
import addTodo from "../reduceres/TodoReducer";

export const todosContext = createContext([])
const storageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];

export const DataContextProvider = ({ children }) => {
     const [todos, dispatch] = useReducer(addTodo,storageTodos);
  return (
    <todosContext.Provider value={{ todos, dispatch }}>
      {children}
    </todosContext.Provider>
  );
};

export const UseContextData = () => {
    return useContext(todosContext);
}