import { Container } from "@mui/material";
import TodoList from "./components/TodoList";
import Header from "./components/Header";
import { useState } from "react";
import AddTodo from "./components/AddTodo";

function App() {
  const [addTodoPopupVisibility, setAddTodoPopupVisibility] = useState(false);
  const [fetchTodos, setFetchTodos] = useState(false);

  return (
    <Container>
      <Header setAddTodoPopupVisibility={setAddTodoPopupVisibility}></Header>
      <AddTodo
        setFetchTodos={setFetchTodos}
        addTodoPopupVisibility={addTodoPopupVisibility}
        setAddTodoPopupVisibility={setAddTodoPopupVisibility}
      ></AddTodo>
      <TodoList
        fetchTodos={fetchTodos}
        setFetchTodos={setFetchTodos}
      ></TodoList>
    </Container>
  );
}

export default App;
