import React from "react";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import Slider from "./pages/Slider";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <div>
      <Navbar />
      <ToastContainer  position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="light"/>
      <div>
        <Outlet/>
      </div>
    </div>
  );
}

export default App;
