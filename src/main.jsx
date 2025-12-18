import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Products from "./features/products/Products.jsx";
import Men from "./features/men/Men.jsx";
import Women from "./features/women/Women.jsx";
import Cart from "./features/cart/Cart.jsx";
import Order from "./pages/Order.jsx";
import Kids from "./features/kids/Kids.jsx";
import BeautyProducts from "./features/beautyProducts/BeautyProducts.jsx";
import HomePage from "./layout/HomePage.jsx";
import Wishlist from "./features/wishlist/Wishlist.jsx";


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
        path: "products",
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
        element: <Wishlist/>,
      },
      {
        path: "order",
        element: <Order/>,
      },
      {
        path: "kids",
        element: <Kids/>,
      },
      {
        path: "beauty",
        element: <BeautyProducts/>,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
