import { AppBar, Toolbar, Typography } from "@mui/material";

function NavBar() {
  return (
    <AppBar position="relative">
      <Toolbar>
        <Typography variant="h6" color="inherit" noWrap>
          SHOPPING LIST
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
