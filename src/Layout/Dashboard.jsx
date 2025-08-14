import {
  FaAtom,
  FaCalendar,
  FaFeather,
  FaHome,
  FaList,
  FaShoppingCart
} from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-purple-950">
      {/* Sidebar */}
      <div className="w-64 bg-orange-700 shadow-xl text-white">
        <div className="p-6 text-center font-bold text-2xl">
          📚 Book Dashboard
        </div>
        <ul className="space-y-3 px-4 pt-2 text-sm font-medium">
          <li>
            <NavLink
              to="/Dashboard/cart"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                  isActive
                    ? "bg-red-700 text-white"
                    : "bg-red-400 hover:bg-red-500 text-white"
                }`
              }
            >
              <FaShoppingCart />
              My Cart
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/Dashboard/userHome"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "bg-blue-600 text-white"
                }`
              }
            >
              <FaHome />
              User Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/Dashboard/paymentHistory"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "bg-red-400 hover:bg-red-500  text-white"
                }`
              }
            >
              <FaCalendar />
              PaymentHistry
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/Dashboard/booking"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "bg-blue-600 text-white"
                }`
              }
            >
              <FaList />
              My Booking
            </NavLink>
          </li>

          <div className="divider my-4 border-b border-white/30"></div>

          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "bg-red-400 hover:bg-red-500 text-white"
                }`
              }
            >
              <FaHome />
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/feature"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                  isActive
                    ? "bg-red-400  text-white"
                    : "bg-blue-600 text-white"
                }`
              }
            >
              <FaAtom />
              Feature
            </NavLink>
          </li>
        </ul>
      </div>

    
      <div className="flex-1 p-8 bg-purple rounded-tl-3xl shadow-inner">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
