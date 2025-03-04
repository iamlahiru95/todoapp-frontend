import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import axios from "axios";

export default function DeleteTodo({
  todo,
  deleteTodoPopupVisibility,
  setDeleteTodoPopupVisibility,
}) {
  const handleClose = () => {
    setDeleteTodoPopupVisibility(false);
  };

  const handleDeleteTodo = () => {
    axios
      .delete(`http://localhost:3000/todos/${todo.id}`)
      .then(() => setDeleteTodoPopupVisibility(false));
  };

  return (
    <Dialog
      open={deleteTodoPopupVisibility}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Delete Todo</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
          noValidate
          autoComplete="off"
        >
          <TextField
            disabled
            id="outlined-required"
            label="Todo"
            defaultValue={todo.todo}
          />
        </Box>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete above task?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="info" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="contained" color="error" onClick={handleDeleteTodo}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
