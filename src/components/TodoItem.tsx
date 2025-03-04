import Typography from "@mui/material/Typography";
import { Button, Grid2, Paper } from "@mui/material";

export default function TodoItem({ todo, setSelectedTodo, setOpen }) {
  return (
    <Paper key={todo.id} sx={{ paddingX: 2, paddingY: 1, marginY: 1 }}>
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
              onClick={() => {
                setSelectedTodo(todo);
                setOpen(true);
              }}
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
  );
}
