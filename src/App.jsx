// import React from "react";
// import Navbar from "./components/Navbar";
// import BottomNav from "./components/BottomBar";
// import { Outlet } from "react-router-dom";
// import { ToastContainer } from "react-toastify";

// function App() {
//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* ======================
//           STICKY TOP NAVBAR
//       ====================== */}
//       <Navbar />

//       {/* ======================
//           TOAST NOTIFICATIONS
//       ====================== */}
//       <ToastContainer
//         position="top-center"
//         autoClose={2000}
//         theme="light"
//       />

//       {/* ======================
//           MAIN CONTENT AREA
//           ✔ pt-2  → mobile navbar height
//           ✔ md:pt-20 → desktop navbar height
//           ✔ pb-16 → mobile bottom nav
//       ====================== */}
//       <main className="pt-2 pb-16 md:pb-0">
//         <Outlet />
//       </main>

//       {/* ======================
//           STICKY BOTTOM NAV
//           (MOBILE ONLY)
//       ====================== */}
//       <BottomNav />
//     </div>
//   );
// }

// export default App;
import React from "react";
import Navbar from "./components/Navbar";
import BottomNav from "./components/BottomBar";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Top Navbar */}
      <Navbar />

      {/* Toasts */}
      <ToastContainer
        position="top-center"
        autoClose={2000}
        theme="light"
      />

      {/* 
        MAIN CONTENT
        pt-14  -> navbar height (56px)
        pb-16  -> bottom nav height (64px)
      */}
      <main className="pt-3 pb-16 md:pt-0 md:pb-0">
        <Outlet />
      </main>

      {/* Sticky Bottom Nav (mobile only) */}
      <BottomNav />
    </div>
  );
}

export default App;
