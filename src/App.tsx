import { Container } from "@mui/material";
import TodoList from "./components/TodoList";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./components/Header";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/todos")
      .then((response) => setTodos(response.data));
  }, [todos]);

  return (
    <Container>
      <Header></Header>
      <TodoList todoList={todos}></TodoList>
    </Container>
  );
}

export default App;
