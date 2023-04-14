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
import { useAppSelector } from "../../../redux/redux-hooks";
import { Typography, Link, Badge } from "@mui/material";

export default function Navbar() {
  const theme = useTheme();
  const { isLoggedIn } = useAppSelector((state) => state.authSlice);
  const { items } = useAppSelector((state) => state.cartSlice);
  console.log("items in cart", items);
  return (
    <>
      <AppBar color="inherit" position="fixed" elevation={0}>
        <Toolbar>
          <Container maxWidth="xl" sx={{ height: "40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Link href="/">
              <img src={Logo} alt="logo" style={{ width: "60px", height: "50px" }} />
            </Link>
            <Box sx={{ width: "50%" }}>
              <TextField
                id="outlined-basic"
                label="Search for products"
                size="small"
                fullWidth
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
                {isLoggedIn ? <AvatarBtn /> : <Login />}

                <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                  <Badge badgeContent={items.length} color="error">
                    <ShoppingCartIcon />
                  </Badge>
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

function Login() {
  return (
    <>
      <Typography variant="caption" component="h1">
        Hi!
      </Typography>
      <Typography variant="caption">
        <Link href="/signin" underline="hover">
          Sign in
        </Link>{" "}
        or{" "}
        <Link href="/register" underline="hover">
          register
        </Link>
      </Typography>
      <Typography variant="caption" component="h1">
        <Link href="/register/seller" underline="hover" color={"black"}>
          Sell
        </Link>
      </Typography>
    </>
  );
}
