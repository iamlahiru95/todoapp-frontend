import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

export default function Header({ setAddTodoPopupVisibility }) {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1 }}>
            <Button
              onClick={() => setAddTodoPopupVisibility(true)}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Add Todo
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
