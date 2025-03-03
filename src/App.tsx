import { Container } from "@mui/material";
import TodoCard from "./components/TodoCard";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./components/Header";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/todos")
      .then((response) => setTodos(response.data));
  }, []);

  return (
    <Container>
      <Header></Header>
      <TodoCard todos={todos}></TodoCard>
    </Container>
  );
}

export default App;
