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

function App() {
  return (
    <Routes>
      <Route element={<SideDrawer />}>
        {/* <Route element={<ProtectedRoute />}> */}
        {/* <Route element={<RoleRoute allowedRoles={"admin"} />}> */}
        <Route path="/home" element={<AddProduct />} />
        {/* </Route> */}
        {/* <Route element={<RoleRoute allowedRoles={"admin" || "seller"} />}>
            <Route path="/home" element={<Home />} />
          </Route>
          <Route element={<RoleRoute allowedRoles={"admin" || "seller" || "user"} />}>
            <Route path="/home" element={<Home />} />
          </Route> */}
        {/* </Route> */}
        <Route path="/liveorder" element={<LiveOrder />} />
        <Route path="/orderview" element={<OrderView />} />
        <Route path="/add" element={<AddProduct />} />
      </Route>
      <Route path="/home" element={<Home />} />
      <Route path="/ss" element={<HomeView />} />
      <Route path="/" element={<CartView />} />
      <Route path="/s" element={<OrderView />} />
    </Routes>
  );
}

export default App;
