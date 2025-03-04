import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

import Container from "@mui/material/Container";

import Button from "@mui/material/Button";

function Header({ setAddTodoVisibility }) {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1 }}>
            <Button
              onClick={() => setAddTodoVisibility(true)}
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
export default Header;
