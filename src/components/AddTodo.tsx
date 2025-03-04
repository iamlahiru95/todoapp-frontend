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

export default function AddTodo({
  addTodoPopupVisibility,
  setAddTodoPopupVisibility,
}) {
  const [newTodo, setNewTodo] = useState("");
  const [isTodoEmpty, setIsTodoEmpty] = useState(false);
  const todoInputRef = useRef(null);
  useEffect(() => {
    setIsTodoEmpty(!newTodo);
  }, [newTodo]);
  useEffect(() => {
    if (addTodoPopupVisibility && todoInputRef.current) {
      todoInputRef.current.focus(); // Focus on the input when dialog opens
    }
  }, [addTodoPopupVisibility]);

  const handleClose = () => {
    setAddTodoPopupVisibility(false);
    setIsTodoEmpty(false);
  };

  const handleAddTodo = () => {
    axios
      .post(`http://localhost:3000/todos`, {
        todo: newTodo,
      })
      .then(() => setAddTodoPopupVisibility(false));
  };

  return (
    <Dialog
      open={addTodoPopupVisibility}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Add Todo</DialogTitle>
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
            onFocus={() => setNewTodo(todoInputRef.current.value)}
            onChange={() => setNewTodo(todoInputRef.current.value)}
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
          onClick={handleAddTodo}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}
