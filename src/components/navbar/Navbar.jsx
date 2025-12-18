import React from "react";
import { NavLink, Link } from "react-router-dom";
import { User, Heart, ShoppingBag } from "lucide-react";
import { useSelector } from "react-redux";

function Navbar() {
  const cartItems = useSelector((state) => state.cart.items);

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // ✅ Separate label & path (IMPORTANT)
  const navItems = [
    { label: "Men", path: "men" },
    { label: "Women", path: "women" },
    { label: "Men & Women", path: "men-&-women" },
    { label: "Kids", path: "kids" },
    { label: "Beauty", path: "beauty" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* LEFT: Logo + Categories */}
          <div className="flex items-center gap-8 md:gap-12">
            {/* Logo */}
            <Link
              to="/"
              className="text-xl md:text-2xl font-bold tracking-wide text-pink-600"
              style={{ fontFamily: "Playfair Display", fontWeight: 600 }}
            >
              STYLEKART
            </Link>

            {/* Categories (desktop only) */}
            <ul className="hidden md:flex items-center gap-8 text-sm font-semibold uppercase text-gray-800">
              {navItems.map(({ label, path }) => (
                <li key={path} className="relative group">
                  <NavLink
                    to={`/${path}`}
                    className={({ isActive }) =>
                      `pb-2 transition-colors ${
                        isActive
                          ? "text-pink-600"
                          : "group-hover:text-pink-600"
                      }`
                    }
                  >
                    {label}
                  </NavLink>

                  {/* underline */}
                  <span className="absolute left-0 -bottom-1 h-0.5 w-full bg-pink-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT: Icons */}
          <div className="flex items-center gap-5 md:gap-6">
            <NavIcon icon={<User size={20} />} label="Profile" />

            <Link to="/wishlist" className="relative">
              <NavIcon icon={<Heart size={20} />} label="Wishlist" />
            </Link>

            <Link to="/cart" className="relative">
              <NavIcon icon={<ShoppingBag size={20} />} label="Bag" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-pink-600 text-white 
                  text-[10px] font-bold w-5 h-5 rounded-full 
                  flex items-center justify-center"
                >
                  {cartCount}
                </span>
              )}
            </Link>
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
      <span className="mt-0.5">{label}</span>
    </div>
  );
}

export default Navbar;
