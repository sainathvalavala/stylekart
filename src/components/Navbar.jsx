
import React from "react";
import { NavLink, Link } from "react-router-dom";
import { User, Heart, ShoppingBag } from "lucide-react";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">

          {/* LEFT: Logo + Categories */}
          <div className="flex items-center gap-12">
            {/* Logo */}
            <Link
              to="/"
              className="text-2xl font-bold tracking-wide text-pink-600"
            >
              SHOPIFY
            </Link>

            {/* Categories */}
            <ul className="flex items-center gap-8 text-sm font-semibold uppercase text-gray-800">
              {["men", "women", "kids", "products",  "beauty"].map(
                (item) => (
                  <li key={item} className="relative group">
                    <NavLink
                      to={`/${item}`}
                      className={({ isActive }) =>
                        `pb-2 transition-colors ${
                          isActive
                            ? "text-pink-600"
                            : "group-hover:text-pink-600"
                        }`
                      }
                    >
                      {item}
                    </NavLink>

                    {/* Underline */}
                    <span className="absolute left-0 -bottom-1 h-0.5 w-full bg-pink-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* RIGHT: Icons */}
          <div className="flex items-center gap-6">
            <NavIcon icon={<User size={20} />} label="Profile" />
            <NavIcon icon={<Heart size={20} />} label="Wishlist" />
            <NavIcon icon={<ShoppingBag size={20} />} label="Bag" />
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavIcon({ icon, label }) {
  return (
    <div className="flex flex-col items-center text-xs cursor-pointer text-gray-700 hover:text-pink-600">
      {icon}
      <span className="mt-1">{label}</span>
    </div>
  );
}

export default Navbar;














// import React from "react";
// import { Link, NavLink } from "react-router-dom";

// function Navbar() {
//   return (
//     <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
//       <div className="max-w-7xl mx-auto px-6">
//         <div className="flex items-center h-20 gap-10">
//           {/* Logo */}
//           <Link
//             to="/"
//             className="text-2xl font-bold tracking-wide text-pink-600"
//           >
//             MYNTRA
//           </Link>

//           {/* Nav Links */}
//           <ul className="flex items-center gap-8 text-sm font-semibold uppercase text-gray-800">
//             <li>
//               <NavLink
//                 to="/"
//                 className={({ isActive }) =>
//                   `relative pb-2 ${
//                     isActive ? "text-pink-600" : "hover:text-pink-600"
//                   }`
//                 }
//               >
//                 Home
//                 <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-pink-600 scale-x-0 hover:scale-x-100 transition-transform origin-left"></span>
//               </NavLink>
//             </li>

//             <li>
//               <NavLink
//                 to="/products"
//                 className={({ isActive }) =>
//                   `relative pb-2 ${
//                     isActive ? "text-pink-600" : "hover:text-pink-600"
//                   }`
//                 }
//               >
//                 Products
//                 <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-pink-600 scale-x-0 hover:scale-x-100 transition-transform origin-left"></span>
//               </NavLink>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;