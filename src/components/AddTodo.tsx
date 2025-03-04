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

export default function AddTodo({ addTodoVisibility, setAddTodoVisibility }) {
  const [newTodo, setNewTodo] = useState("");
  const [isTodoEmpty, setIsTodoEmpty] = useState(false);
  const todoInputRef = useRef(null);
  useEffect(() => {
    setIsTodoEmpty(!newTodo);
  }, [newTodo]);
  useEffect(() => {
    if (addTodoVisibility && todoInputRef.current) {
      todoInputRef.current.focus(); // Focus on the input when dialog opens
    }
  }, [open]);

  const handleClose = () => {
    setAddTodoVisibility(false);
    setIsTodoEmpty(false);
  };

  const handleAddTodo = () => {
    axios
      .post(`http://localhost:3000/todos`, {
        todo: newTodo,
      })
      .then((response) => {
        console.log(response.data);
        setAddTodoVisibility(false);
      });
  };

  return (
    <Dialog
      open={addTodoVisibility}
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
