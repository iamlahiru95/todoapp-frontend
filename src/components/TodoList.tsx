import { Fragment, useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import UpdateTodo from "./UpdateTodo";
import axios from "axios";
import DeleteTodo from "./DeleteTodo";
import { Backdrop, CircularProgress } from "@mui/material";

export default function TodoList({ fetchTodos, setFetchTodos }) {
  const [isProgressIndicatorVisible, setIsProgressIndicatorVisible] =
    useState(false);
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
    setIsProgressIndicatorVisible(true);
    axios.get("http://localhost:3000/todos").then((response) => {
      setTimeout(() => {
        setTodos(response.data);
        setIsProgressIndicatorVisible(false);
      }, 1000);
    });
  }, [fetchTodos]);

  return (
    <Fragment>
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1000 })}
        open={isProgressIndicatorVisible}
        onClick={() => setIsProgressIndicatorVisible(false)}
      >
        <CircularProgress color="success" />
      </Backdrop>

      <UpdateTodo
        setFetchTodos={setFetchTodos}
        todo={selectedTodo}
        editTodoPopupVisibility={editTodoPopupVisibility}
        setEditTodoPopupVisibility={setEditTodoPopupVisibility}
      ></UpdateTodo>

      <DeleteTodo
        setFetchTodos={setFetchTodos}
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
    </Fragment>
  );
}
