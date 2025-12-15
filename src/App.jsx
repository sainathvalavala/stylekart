import React from "react";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import Slider from "./pages/Slider";
function App() {
  return (
    <div>
      <Navbar></Navbar>
      <div>
        <Outlet></Outlet>
      </div>
    </div>
  );
}

export default App;
