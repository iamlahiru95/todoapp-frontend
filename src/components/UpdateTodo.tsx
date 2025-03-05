import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useRef, useEffect, useState, Fragment } from "react";
import axios from "axios";

export default function UpdateTodo({
  setFetchTodos,
  todo,
  editTodoPopupVisibility,
  setEditTodoPopupVisibility,
}) {
  const [isProgressIndicatorVisible, setIsProgressIndicatorVisible] =
    useState(false);
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
    setIsProgressIndicatorVisible(true);
    axios
      .patch(`http://localhost:3000/todos/${todo.id}`, {
        todo: updatedTodo,
      })
      .then(() => {
        setTimeout(() => {
          setEditTodoPopupVisibility(false);
          setIsProgressIndicatorVisible(false);
          setFetchTodos(true);
        }, 1000);
      });
  };

  return (
    <Fragment>
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1000 })}
        open={isProgressIndicatorVisible}
        onClick={() => setIsProgressIndicatorVisible(false)}
      >
        <CircularProgress color="secondary" />
      </Backdrop>
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
    </Fragment>
  );
}
