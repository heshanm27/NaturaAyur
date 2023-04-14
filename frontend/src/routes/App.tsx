import { Routes, Route } from "react-router-dom";
import SideDrawer from "../components/drawer/SideDrawer";
import Home from "../pages/Home";
import OrderView from "../pages/OrderView/OrderView";
import LiveOrder from "../pages/LiveOrder/LiveOrder";
import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";
import HomeView from "../pages/UserArea/HomeView/HomeView";
import Navbar from "../components/common/navbar/navbar";
import CartView from "../pages/UserArea/Cart/CartView";
import AddProduct from "../pages/AddProduct/AddProduct";
import { ThemeProvider, createTheme } from "@mui/material";
import ProductView from "../pages/UserArea/ProductView/ProductView";
import ProductListView from "../pages/UserArea/ProductListView/ProductListView";
import SignIn from "../pages/SignIn/Signin";
import SellerSignUp from "../pages/SignUp/SellerSignUp";
import SignUp from "../pages/SignUp/SignUp";
import VerifyArea from "../pages/VerifyArea/VerifyArea";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#3ccb5c",
      },
      secondary: {
        main: "#3ccb5c",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route element={<SideDrawer />}>
          <Route element={<ProtectedRoute />}>
            <Route element={<RoleRoute allowedRoles={"admin"} />}>
              <Route path="/admin/add" element={<AddProduct />} />
              <Route path="/admin/orders/live" element={<Home />} />
              <Route path="/admin/orders/history" element={<Home />} />
            </Route>
            <Route element={<RoleRoute allowedRoles={"admin" || "seller"} />}>
              <Route path="/seller/add" element={<AddProduct />} />
              <Route path="/products" element={<Home />} />
              <Route path="/products:id" element={<Home />} />
              <Route path="/products:id/edit" element={<Home />} />
              <Route path="/seller/dashboard" element={<Home />} />
              <Route path="/seller/orders" element={<Home />} />
              <Route path="/seller/orders:id" element={<Home />} />
            </Route>
            <Route element={<RoleRoute allowedRoles={"admin" || "seller" || "user"} />}>
              <Route path="/user/cart" element={<Home />} />
              <Route path="/user/orders" element={<Home />} />
              <Route path="/user/orders:id" element={<Home />} />
              <Route path="/user/profile" element={<Home />} />
            </Route>
          </Route>
          <Route path="/liveorder" element={<LiveOrder />} />
          <Route path="/orderview" element={<OrderView />} />
          <Route path="/add" element={<AddProduct />} />
        </Route>
        <Route path="/" element={<HomeView />} />
        <Route path="/cart" element={<CartView />} />
        <Route path="/pro" element={<ProductView />} />
        <Route path="/list" element={<ProductListView />} />
        <Route path="/s" element={<OrderView />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/register/seller" element={<SellerSignUp />} />
        <Route path="/verify/:token" element={<VerifyArea />} />
        <Route path="/unauthorized" element={<Home />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
