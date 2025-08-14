import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (!loading && !user && !showAlert) {
      setShowAlert(true); // prevent multiple alerts
      Swal.fire({
        title: "Please LogIn to Observe the Features",
        text: "You are not logged in!",
        icon: "warning",
        confirmButtonText: "OK"
      });
    }
  }, [loading, user, showAlert]);

  if (loading) {
    return <progress className="progress w-56"></progress>;
  }

  if (user) {
    return children;
  }

  // Redirect unauthenticated user
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoutes;
