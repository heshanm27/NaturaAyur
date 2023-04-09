import { Routes, Route } from "react-router-dom";
import SideDrawer from "../components/drawer/SideDrawer";
import Home from "../pages/Home";
import OrderView from "../pages/OrderView/OrderView";
import LiveOrder from "../pages/LiveOrder/LiveOrder";
import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";
import HomeView from "../pages/UserArea/HomeView/HomeView";
import Navbar from "../components/common/navbar/navbar";

function App() {
  return (
    <Routes>
      <Route element={<SideDrawer />}>
        <Route element={<ProtectedRoute />}>
          <Route element={<RoleRoute allowedRoles={"admin"} />}>
            <Route path="/home" element={<Home />} />
          </Route>
          <Route element={<RoleRoute allowedRoles={"admin" || "seller"} />}>
            <Route path="/home" element={<Home />} />
          </Route>
          <Route element={<RoleRoute allowedRoles={"admin" || "seller" || "user"} />}>
            <Route path="/home" element={<Home />} />
          </Route>
        </Route>
      </Route>
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<HomeView />} />
      <Route path="/s" element={<OrderView />} />
      <Route path="/liveorder" element={<LiveOrder />} />
    </Routes>
  );
}

export default App;
