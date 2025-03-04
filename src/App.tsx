import { Container } from "@mui/material";
import TodoList from "./components/TodoList";
import Header from "./components/Header";
import { useState } from "react";
import AddTodo from "./components/AddTodo";

function App() {
  const [addTodoVisibility, setAddTodoVisibility] = useState(false);

  return (
    <Container>
      <Header setAddTodoVisibility={setAddTodoVisibility}></Header>
      <AddTodo
        addTodoVisibility={addTodoVisibility}
        setAddTodoVisibility={setAddTodoVisibility}
      ></AddTodo>
      <TodoList addTodoVisibility={addTodoVisibility}></TodoList>
    </Container>
  );
}

export default App;
