import React from "react";
import Navbar from "./components/navbar/Navbar";
import BottomBar from "./components/bottomBar/BottomBar";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Top Navbar */}
      <Navbar />

      {/* Toasts notification */}
      <ToastContainer position="top-center" autoClose={2000} theme="light" />

      {/* 
        MAIN CONTENT
        - flex-1 pushes footer to bottom
          - padding avoids navbar & bottom bar overlap
        pt-14  -> navbar height (56px)
        pb-16  -> bottom nav height (64px)
      */}
      <main className=" flex-1 pt-3 pb-16 md:pt-0 md:pb-0">
        <Outlet />
      </main>
      {/* FOOTER (GLOBAL) */}
      <Footer />
      {/* BOTTOM BAR (MOBILE) */}
      {/* Sticky Bottom Nav (mobile only) */}
      <BottomBar />
    </div>
  );
}

export default App;
