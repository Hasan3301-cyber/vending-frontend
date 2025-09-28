import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import App from "../App";
import Checkout from "../pages/Checkout/Checkout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      { path: "/", element: <App /> },
      { path: "checkout", element: <Checkout /> },
    ],
  },
]);
