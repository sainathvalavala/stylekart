import { NavLink } from "react-router-dom";
import {
  Home,
  Shirt,
  User,
  Baby,
  Sparkles,
} from "lucide-react";

function BottomNav() {
  const navItems = [
    { to: "/", label: "Home", icon: <Home size={20} /> },
    { to: "/men", label: "Men", icon: <Shirt size={20} /> },
    { to: "/women", label: "Women", icon: <User size={20} /> },
    { to: "/kids", label: "Kids", icon: <Baby size={20} /> },
    { to: "/beauty", label: "Beauty", icon: <Sparkles size={20} /> },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50
                 bg-white border-t border-gray-200
                 md:hidden"
    >
      <ul className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center text-[11px]
                 ${
                   isActive
                     ? "text-pink-600"
                     : "text-gray-500"
                 }`
              }
            >
              {item.icon}
              <span className="mt-1">{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default BottomNav;
