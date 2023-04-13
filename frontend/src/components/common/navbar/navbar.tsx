import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Logo from "../../../assets/images/logoTest41.png";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AvatarBtn from "../avatarbtn/AvatarBtn";
import { Container, useTheme } from "@mui/material";

export default function Navbar() {
  const theme = useTheme();
  return (
    <>
      <AppBar color="inherit" position="fixed" elevation={0}>
        <Toolbar>
          <Container maxWidth="xl" sx={{ height: "40px", display: "flex", justifyContent: "space-between", alignContent: "baseline" }}>
            <img src={Logo} alt="logo" style={{ width: "100px", height: "60px" }} />
            <Box>
              <TextField
                id="outlined-basic"
                label="Search for products"
                size="small"
                variant="outlined"
                placeholder="Search for products, brands and more"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box>
              <Stack spacing={2} direction="row" justifyContent="center" alignItems="center">
                <AvatarBtn />
                <IconButton size="large" edge="start" color="primary" aria-label="menu" sx={{ mr: 2 }}>
                  <ShoppingCartIcon />
                </IconButton>
              </Stack>
            </Box>
            {/* <Box>
            <Button color="primary">Login</Button>
            <Button color="secondary">Signup</Button>
          </Box> */}

            {/* <img src={Logo} alt="logo" style={{ width: "100px", height: "100px" }} /> */}
          </Container>
        </Toolbar>
      </AppBar>
      <Box sx={{ ...theme.mixins.toolbar, mb: 5 }}></Box>
    </>
  );
}
