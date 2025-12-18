import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Men from "./pages/Men.jsx";
import Women from "./pages/Women.jsx";
import Cart from "./pages/Cart.jsx";
import Order from "./pages/Order.jsx";
import Kids from "./pages/Kids.jsx";
import BeautyProducts from "./pages/BeautyProducts.jsx";
import HomePage from "./pages/Home.jsx";
import Wishlist from "./pages/wishlist.jsx";
import Products from "./components/products/Products.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        //When user visits "/:" <App /> renders <Slider /> renders inside <Outlet />
        index: true,
        element: <HomePage />,
      },
      {
        path: "men-&-women",
        element: <Products />,
      },
      {
        path: "men",
        element: <Men />,
      },
      {
        path: "women",
        element: <Women />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "wishlist",
        element: <Wishlist />,
      },
      {
        path: "order",
        element: <Order />,
      },
      {
        path: "kids",
        element: <Kids />,
      },
      {
        path: "beauty",
        element: <BeautyProducts />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
