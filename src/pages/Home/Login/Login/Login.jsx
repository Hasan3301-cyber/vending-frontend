import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { AuthContext } from "../../../../Provider/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const [error, setError] = useState("");
  const [captchaError, setCaptchaError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/feature";

  const { signIn } = useContext(AuthContext);

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    const captchaInput = form.captcha.value;

    if (!email || !password) {
      setError("Email and password are required!");
      return;
    }

    if (!validateCaptcha(captchaInput)) {
      setCaptchaError("Invalid CAPTCHA. Please try again.");
      return;
    }

    try {
      const result = await signIn(email, password);
      console.log("User signed in:", result.user);

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "You have successfully logged in",
        showConfirmButton: false,
        timer: 1500
      });

      navigate(from, { replace: true });

      // Clear form and errors
      setError("");
      setCaptchaError("");
      form.reset();
    } catch (error) {
      console.error(error);
      setError("Login failed. Please check your credentials.");
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Login failed",
        text: "Please check your credentials",
        showConfirmButton: false,
        timer: 2000
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-cover bg-center bg-no-repeat"
         style={{ backgroundImage: "url('https://images.pexels.com/photos/257360/pexels-photo-257360.jpeg?cs=srgb&dl=pexels-pixabay-257360.jpg&fm=jpg')" }}>
      <div className="card w-full max-w-md shadow-2xl bg-white/30 backdrop-blur-md p-6 border border-gray-200">
        <form onSubmit={handleLogin} className="card-body">
          <h1 className="text-4xl font-bold text-blue-900 text-center mb-6">Login</h1>

          {error && <p className="text-red-500 text-center mb-2">{error}</p>}

          <div className="form-control">
            <label className="label">
              <span className="label-text text-white">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="input input-bordered bg-transparent text-white placeholder-gray-200 w-full"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-white">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="input input-bordered bg-transparent text-red-600 placeholder-gray-200 w-full"
              required
            />
            <label className="label">
              <a href="#" className="label-text-alt text-white link link-hover">
                Forgot password?
              </a>
            </label>
          </div>

          // CAPTCHA Section 
          <div className="form-control">
            <label className="label">
              <LoadCanvasTemplate />
            </label>
            <input
              type="text"
              name="captcha"
              placeholder="Enter the CAPTCHA"
              className="input input-bordered bg-transparent text-white placeholder-gray-200 w-full"
              required
            />
            {captchaError && <p className="text-red-500 mt-1">{captchaError}</p>}
          </div>

          <div className="form-control mt-6">
            <input
              className="btn btn-primary w-full"
              type="submit"
              value="Login"
            />
          </div>
        </form>
        <p className="text-white text-center mt-4">
          <small>
            New here? <Link to="/signup" className="text-purple-950">Create Account</Link>
          </small>
        </p>
      </div>
    </div>
  );
};

export default Login;
