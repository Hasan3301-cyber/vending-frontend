import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Menu from "../pages/menu/menu/Menu";
import Login from "../pages/Home/Login/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import Secret from "../pages/Shared/secret/Secret";
import PrivateRoutes from "./PrivateRoutes";
import Order from "../pages/Order/order/Order";
import Features from "../pages/Feature/feature/Features";
import App from "../pages/FindLawer/findlawer/FindLawer";
import Dashboard from "../Layout/Dashboard";
import Cart from "../pages/Dashboard/cart"; 
import Payment from "../pages/Payment/Payment";
import PaymentHistory from "../pages/Dashboard/paymentHistory";
import AIChatInterface from "../pages/ai/ai";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      { path: "/", element: <Home /> },
      { path: "menu", element: <Menu /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <SignUp /> },
      { path: "ask", element: <AIChatInterface/> },
      { path: "order", element: <Order /> },
      { path: "findlawer", element: <App /> },
      {
        path: "feature",
        element: (
          <PrivateRoutes>
            <Features />
          </PrivateRoutes>
        ),
      },
      {
        path: "secret",
        element: (
          <PrivateRoutes>
            <Secret />
          </PrivateRoutes>
        ),
      },
    ],
  },
  {
    path: "dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "cart",
        element: <Cart /> 
      },
      {
        path: "payment",
        element: <Payment/>  
      },
      {
        path: "paymentHistory", 
        element: <PaymentHistory /> 
      }
    ]
  }
]);
