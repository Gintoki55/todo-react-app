
import { todosContext } from "./context/context";
import { useState, useContext, useEffect } from "react";
export function UnCompleteTodo() {
       useEffect(() => {
         const storageTodos = JSON.parse(localStorage.getItem("todos"));
         console.log(storageTodos);
         const result = storageTodos.filter((todo)=>{
            return todo.completed === false
            console.log(result)
         })

       }, [])
}
