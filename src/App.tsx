import { Container } from "@mui/material";
import TodoList from "./components/TodoList";
import Header from "./components/Header";
import { useState } from "react";
import AddTodo from "./components/AddTodo";

function App() {
  const [addTodoPopupVisibility, setAddTodoPopupVisibility] = useState(false);

  return (
    <Container>
      <Header setAddTodoPopupVisibility={setAddTodoPopupVisibility}></Header>
      <AddTodo
        addTodoPopupVisibility={addTodoPopupVisibility}
        setAddTodoPopupVisibility={setAddTodoPopupVisibility}
      ></AddTodo>
      <TodoList addTodoPopupVisibility={addTodoPopupVisibility}></TodoList>
    </Container>
  );
}

export default App;
