import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import UpdateTodo from "./UpdateTodo";
import axios from "axios";
import DeleteTodo from "./DeleteTodo";

export default function TodoList({ addTodoPopupVisibility }) {
  const [editTodoPopupVisibility, setEditTodoPopupVisibility] = useState(false);
  const [deleteTodoPopupVisibility, setDeleteTodoPopupVisibility] =
    useState(false);
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
  }, [
    editTodoPopupVisibility,
    addTodoPopupVisibility,
    deleteTodoPopupVisibility,
  ]);

  return (
    <div>
      <UpdateTodo
        todo={selectedTodo}
        editTodoPopupVisibility={editTodoPopupVisibility}
        setEditTodoPopupVisibility={setEditTodoPopupVisibility}
      ></UpdateTodo>

      <DeleteTodo
        todo={selectedTodo}
        deleteTodoPopupVisibility={deleteTodoPopupVisibility}
        setDeleteTodoPopupVisibility={setDeleteTodoPopupVisibility}
      ></DeleteTodo>

      {todos.length === 0 ? (
        <h1>No todos found..</h1>
      ) : (
        todos.map((todo) => (
          <TodoItem
            todo={todo}
            setSelectedTodo={setSelectedTodo}
            setEditTodoPopupVisibility={setEditTodoPopupVisibility}
            setDeleteTodoPopupVisibility={setDeleteTodoPopupVisibility}
          ></TodoItem>
        ))
      )}
    </div>
  );
}
