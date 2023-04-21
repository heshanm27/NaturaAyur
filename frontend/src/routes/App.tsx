import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import SideDrawer from "../components/drawer/SideDrawer";
import OrderView from "../pages/OrderView/OrderView";
import LiveOrder from "../pages/LiveOrder/LiveOrder";
import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";
import HomeView from "../pages/UserArea/HomeView/HomeView";
import CartView from "../pages/UserArea/Cart/CartView";
import AddProduct from "../pages/AddProduct/AddProduct";
import { ThemeProvider, createTheme } from "@mui/material";
import ProductView from "../pages/UserArea/ProductView/ProductView";
import ProductListView from "../pages/UserArea/ProductListView/ProductListView";
import SignIn from "../pages/SignIn/Signin";
import SellerSignUp from "../pages/SignUp/SellerSignUp";
import SignUp from "../pages/SignUp/SignUp";
import VerifyArea from "../pages/VerifyArea/VerifyArea";
import CategoryPage from "../pages/AdminArea/Category/CategoryPage";
import UserManagmentPage from "../pages/AdminArea/UserManagment/UserManagmentPage";
import OrderHistory from "../pages/OrderHistory/OrderHistory";
import ProductsPage from "../pages/SellerArea/ProductsPage/ProductsPage";
import PaymentSuccess from "../pages/UserArea/Payment/Success/PaymentSuccess";
import PaymentCancel from "../pages/UserArea/Payment/Cancle/PaymentCancel";

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
          {/* <Route element={<ProtectedRoute />}>
            <Route element={<RoleRoute allowedRoles={["admin"]} />}> */}
          <Route path="/admin/add" element={<AddProduct />} />
          <Route path="/admin/orders/live" element={<LiveOrder />} />
          <Route path="/admin/orders/history" element={<OrderHistory />} />
          <Route path="/admin/categories" element={<CategoryPage />} />
          <Route path="/admin/usermangment" element={<UserManagmentPage />} />
          {/* </Route> */}
          {/* <Route element={<RoleRoute allowedRoles={["admin", "seller"]} />}> */}
          <Route path="/seller/orders/live" element={<LiveOrder />} />
          <Route path="/seller/orders/history" element={<OrderHistory />} />
          <Route path="/seller/products/add" element={<AddProduct />} />
          <Route path="/seller/products" element={<ProductsPage />} />
          <Route path="/seller/products:id" element={<ProductsPage />} />
          <Route path="/products:id/edit" element={<ProductsPage />} />
          <Route path="/seller/orders:id" element={<ProductsPage />} />
          {/* </Route> */}
          {/* <Route element={<RoleRoute allowedRoles={["admin", "seller", "user"]} />}> */}
          <Route path="/user/cart" element={<ProductsPage />} />
          <Route path="/user/orders" element={<ProductsPage />} />
          <Route path="/user/orders:id" element={<ProductsPage />} />
          <Route path="/user/profile" element={<ProductsPage />} />
          <Route path="/user/payment/success" element={<PaymentSuccess />} />
          <Route path="/user/payment/cancel" element={<PaymentCancel />} />
          {/* </Route>
          </Route> */}
          <Route path="/liveorder" element={<LiveOrder />} />
          <Route path="/orderview" element={<OrderView />} />
          <Route path="/add" element={<AddProduct />} />
        </Route>
        <Route path="/" element={<HomeView />} />
        <Route path="/cart" element={<CartView />} />
        <Route path="/product/:id" element={<ProductView />} />
        <Route path="/list" element={<ProductListView />} />
        <Route path="/s" element={<OrderView />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/register/seller" element={<SellerSignUp />} />
        <Route path="/verify/:token" element={<VerifyArea />} />
        <Route path="/unauthorized" element={<ProductsPage />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
