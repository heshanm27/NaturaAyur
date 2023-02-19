import { Routes, Route } from "react-router-dom";
import SideDrawer from "../components/drawer/SideDrawer";
import Home from "../pages/Home";

function App() {
  return (
    <Routes>
      <Route element={<SideDrawer />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
