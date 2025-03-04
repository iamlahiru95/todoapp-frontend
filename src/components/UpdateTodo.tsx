import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useRef, useEffect, useState } from "react";
import axios from "axios";

export default function UpdateTodo({
  todo,
  editTodoPopupVisibility,
  setEditTodoPopupVisibility,
}) {
  const [updatedTodo, setUpdatedTodo] = useState("");
  const [isTodoEmpty, setIsTodoEmpty] = useState(false);
  const todoInputRef = useRef(null);
  useEffect(() => {
    setIsTodoEmpty(!updatedTodo);
  }, [updatedTodo]);
  useEffect(() => {
    if (editTodoPopupVisibility && todoInputRef.current) {
      todoInputRef.current.focus(); // Focus on the input when dialog opens
    }
  }, [editTodoPopupVisibility]);

  const handleClose = () => {
    setEditTodoPopupVisibility(false);
    setIsTodoEmpty(false);
  };

  const handleUpdateTodo = () => {
    axios
      .patch(`http://localhost:3000/todos/${todo.id}`, {
        todo: updatedTodo,
        modifiedOn: new Date(),
      })
      .then((response) => {
        console.log(response.data);
        setEditTodoPopupVisibility(false);
      });
  };

  return (
    <Dialog
      open={editTodoPopupVisibility}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Edit Todo</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
          noValidate
          autoComplete="off"
        >
          <TextField
            inputRef={todoInputRef}
            required
            id="outlined-required"
            label="Todo"
            defaultValue={todo.todo}
            onFocus={() => setUpdatedTodo(todoInputRef.current.value)}
            onChange={() => setUpdatedTodo(todoInputRef.current.value)}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="error" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          disabled={isTodoEmpty}
          variant="contained"
          color="primary"
          onClick={handleUpdateTodo}
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}
