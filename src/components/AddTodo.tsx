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

export default function AddTodo({
  setFetchTodos,
  addTodoPopupVisibility,
  setAddTodoPopupVisibility,
}) {
  const [isProgressIndicatorVisible, setIsProgressIndicatorVisible] =
    useState(false);
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
    setIsProgressIndicatorVisible(true);
    axios
      .post(`http://localhost:3000/todos`, {
        todo: newTodo,
      })
      .then(() => {
        setTimeout(() => {
          setAddTodoPopupVisibility(false);
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
        <CircularProgress color="success" />
      </Backdrop>
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
    </Fragment>
  );
}
