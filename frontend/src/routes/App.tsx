import { Routes, Route } from "react-router-dom";
import SideDrawer from "../components/drawer/SideDrawer";
import Home from "../pages/Home";
import ViewOrder from "../pages/ViewOrder/ViewOrder";

function App() {
  return (
    <Routes>
      <Route element={<SideDrawer />}>
        <Route path="/" element={<Home />} />
        <Route path="/example" element={<ViewOrder />} />
      </Route>
    </Routes>
  );
}

export default App;
