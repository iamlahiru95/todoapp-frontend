import { useState } from "react";
import TodoItem from "./TodoItem";
import TodoEditor from "./TodoEditor";

export default function TodoList({ todoList }) {
  const [open, setOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState({
    id: 0,
    todo: "",
    createdOn: "",
    modifiedOn: "",
  });

  return (
    <div>
      <TodoEditor
        todo={selectedTodo}
        open={open}
        setOpen={setOpen}
      ></TodoEditor>

      {todoList.length === 0 ? (
        <h1>No todos found..</h1>
      ) : (
        todoList.map((todo) => (
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
