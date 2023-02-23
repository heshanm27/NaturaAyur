import { Routes, Route } from "react-router-dom";
import SideDrawer from "../components/drawer/SideDrawer";
import Home from "../pages/Home";
import OrderView from "../pages/OrderView/OrderView";
import LiveOrder from "../pages/LiveOrder/LiveOrder";

function App() {
  return (
    <Routes>
      <Route element={<SideDrawer />}>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<OrderView />} />
        <Route path="/liveorder" element={<LiveOrder />} />
      </Route>
    </Routes>
  );
}

export default App;
