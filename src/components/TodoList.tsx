import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import UpdateTodo from "./UpdateTodo";
import axios from "axios";
import AddTodo from "./AddTodo";

export default function TodoList({ addTodoVisibility }) {
  const [open, setOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState({
    id: 0,
    todo: "",
    createdOn: "",
    modifiedOn: "",
  });
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/todos")
      .then((response) => setTodos(response.data));
  }, [open, addTodoVisibility]);

  return (
    <div>
      <UpdateTodo
        todo={selectedTodo}
        open={open}
        setOpen={setOpen}
      ></UpdateTodo>

      {todos.length === 0 ? (
        <h1>No todos found..</h1>
      ) : (
        todos.map((todo) => (
          <TodoItem
            todo={todo}
            setSelectedTodo={setSelectedTodo}
            setOpen={setOpen}
          ></TodoItem>
        ))
      )}
    </div>
  );
}
