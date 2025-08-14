import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Provider/AuthProvider";
import { FaShoppingCart, FaUser, FaSignOutAlt, FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import useCart from "../../../hooks/Hook/useCart";

const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [cart] = useCart();
  
  const handleLogOut = () => {
    logOut()
      .then(() => {
        console.log("User logged out");
      })
      .catch(error => console.log(error));
  };

  return (
    <nav className="navbar fixed z-50 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 backdrop-blur-lg bg-opacity-95 max-w-screen-xl text-white shadow-2xl border-b border-purple-500/20">
      {/* Brand Section */}
      <div className="navbar-start">
        <div className="dropdown lg:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-slate-800 rounded-box w-52 border border-purple-500/20">
            <li><Link to="/" className="hover:text-purple-300 transition-colors">Home</Link></li>
            <li><Link to="/menu" className="hover:text-purple-300 transition-colors">About</Link></li>
            <li><Link to="/feature" className="hover:text-purple-300 transition-colors">Features</Link></li>
            <li><Link to="/secret" className="hover:text-purple-300 transition-colors">Secret</Link></li>
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost normal-case text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300">
          LaW
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-2">
          <li>
            <Link to="/" className="px-4 py-2 rounded-lg hover:bg-purple-600/30 hover:text-purple-200 transition-all duration-300 hover:scale-105 active:scale-95">
              Home
            </Link>
          </li>
          <li>
            <Link to="/menu" className="px-4 py-2 rounded-lg hover:bg-purple-600/30 hover:text-purple-200 transition-all duration-300 hover:scale-105 active:scale-95">
              About
            </Link>
          </li>
          <li>
            <Link to="/feature" className="px-4 py-2 rounded-lg hover:bg-purple-600/30 hover:text-purple-200 transition-all duration-300 hover:scale-105 active:scale-95">
              Features
            </Link>
          </li>
          <li>
            <Link to="/secret" className="px-4 py-2 rounded-lg hover:bg-purple-600/30 hover:text-purple-200 transition-all duration-300 hover:scale-105 active:scale-95">
              Secret
            </Link>
          </li>
          <li>
            <Link to="/dashboard/cart" className="relative group">
              <button className="btn bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 border-none text-white shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 active:scale-95">
                <FaShoppingCart className="text-lg" />
                <span className="ml-2">Cart</span>
                <div className="badge badge-secondary bg-gradient-to-r from-orange-500 to-red-500 border-none text-white font-bold animate-pulse">
                  {cart.length}
                </div>
              </button>
            </Link>
          </li>
        </ul>
      </div>

      {/* User Section */}
      <div className="navbar-end flex items-center gap-3">
        {user ? (
          <div className="flex items-center gap-3">
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar ring-2 ring-purple-400 hover:ring-purple-300 transition-all duration-300">
                <div className="w-10 rounded-full">
                  <img 
                    src={user.photoURL || "https://via.placeholder.com/150"} 
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </div>
              </div>
              <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-slate-800 rounded-box w-52 border border-purple-500/20">
                <li className="menu-title">
                  <span className="text-purple-300">Account</span>
                </li>
                <li>
                  <Link to="/profile" className="hover:text-purple-300 transition-colors">
                    <FaUser className="w-4 h-4" />
                    Profile
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogOut} className="hover:text-red-300 transition-colors">
                    <FaSignOutAlt className="w-4 h-4" />
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link 
              to="/login" 
              className="btn bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-none text-white shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <FaSignInAlt className="w-4 h-4" />
              Login
            </Link>
            <Link 
              to="/signup" 
              className="btn bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 border-none text-white shadow-lg hover:shadow-green-500/25 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <FaUserPlus className="w-4 h-4" />
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;