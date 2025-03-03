import Typography from "@mui/material/Typography";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid2,
  Paper,
  TextField,
} from "@mui/material";
import { useRef, useState } from "react";
import axios from "axios";

export default function TodoCard({ todos }) {
  const [open, setOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState({
    id: 0,
    todo: "",
    createdOn: "",
    modifiedOn: "",
  });
  const todoInputRef = useRef(null);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = (todo) => {
    setOpen(true);
    setSelectedTodo(todo);
    console.log(todoInputRef.current);
  };

  const handleUpdateTodo = (todoId, todo) => {
    axios
      .patch(`http://localhost:3000/todos/${todoId}`, {
        todo,
        modifiedOn: new Date(),
      })
      .then((response) => {
        console.log(response.data);
        setOpen(false);
      });
  };

  return (
    <div>
      {/* Edit todo dialog */}
      <Dialog
        open={open}
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
            <div>
              <TextField
                inputRef={todoInputRef}
                required
                id="outlined-required"
                label="Todo"
                defaultValue={selectedTodo.todo}
              />
            </div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            disabled={todoInputRef.current?.value ? false : true}
            variant="contained"
            color="primary"
            onClick={() =>
              handleUpdateTodo(selectedTodo.id, todoInputRef.current?.value)
            }
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>

      {/* Todo list */}
      {todos.length === 0 ? (
        <h1>No todos found..</h1>
      ) : (
        todos.map((todo, index) => (
          <Paper key={index} sx={{ paddingX: 2, paddingY: 1, marginY: 1 }}>
            <Grid2 container spacing={1} gridColumn={2}>
              <Grid2 size={{ lg: "grow", md: "grow", sm: "grow", xs: 12 }}>
                <Typography variant="h5" gutterBottom>
                  {todo.todo}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Created On: {todo.createdOn}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Modified On: {todo.modifiedOn}
                </Typography>
              </Grid2>
              <Grid2
                container
                alignContent="center"
                justifyContent="center"
                size={{ lg: 2, md: 2, sm: 2, xs: 12 }}
              >
                <Grid2 size={{ lg: 12, md: 12, sm: 12, xs: 6 }}>
                  <Button
                    fullWidth
                    color="primary"
                    variant="contained"
                    onClick={() => handleClickOpen(todo)}
                  >
                    Edit
                  </Button>
                </Grid2>
                <Grid2 size={{ lg: 12, md: 12, sm: 12, xs: 6 }}>
                  <Button fullWidth color="error" variant="contained">
                    Delete
                  </Button>
                </Grid2>
              </Grid2>
            </Grid2>
          </Paper>
        ))
      )}
    </div>
  );
}
