import { v4 as uuidv4 } from "uuid";

export default function addTodo(currentTodos, action) {
  switch (action.type) {
    case "added":{
        const newTodo = {
          id: uuidv4(),
          title: action.payload.title,
          des: "",
          completed: false,
        };

        const UpdatesTodos = [...currentTodos, newTodo];
        localStorage.setItem("todos", JSON.stringify(UpdatesTodos));
        return UpdatesTodos;
    }
    case "deleted":{
      const UpdatesTodos = currentTodos.filter((t) => t.id !== action.payload.todo.id);
      localStorage.setItem("todos", JSON.stringify(UpdatesTodos));
      return UpdatesTodos
    }

    case 'updated': {
      const uptadesTodo = currentTodos.map((t) => {
        if (t.id === action.payload.todo.id) {
          return {
            ...t,
            title: action.payload.title,
            des: action.payload.des,
          };
        }
        return t;
      });
      localStorage.setItem("todos", JSON.stringify(uptadesTodo));
      return uptadesTodo;
    }
    case "get":{
      const storageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
      return storageTodos;
    }

    case "check": {
          const uptadesTodo = currentTodos.map((t) => {
            if (t.id === action.payload.todo.id) {
              return {
                ...t,
                completed: !t.completed,
              };
            }
            return t;
          });
          localStorage.setItem("todos", JSON.stringify(uptadesTodo));
          
          return uptadesTodo;
    }

    default:{
       throw Error("Invalid action type" + " " + action.type)
    }
  }
}
