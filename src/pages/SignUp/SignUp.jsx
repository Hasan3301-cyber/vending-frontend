import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { createUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const from = "/feature"; //  Redirect to feature 


  const onSubmit = (data) => {
    console.log("Signup Data:", data);
    createUser(data.email, data.password, data.name, data.photoURL)
      .then((result) => {
        console.log("User signed up:", result.user);
      });
      Swal.fire({
              title: "Success!",
              text: "You have successfully logged in.",
              icon: "success",
              confirmButtonText: "OK",
            });
            
            navigate(from, { replace: true });      
             
            
  };

  return (
    <div className="hero min-h-screen bg-[url('https://images.pexels.com/photos/257360/pexels-photo-257360.jpeg?cs=srgb&dl=pexels-pixabay-257360.jpg&fm=jpg')] bg-cover bg-center bg-no-repeat">
      <div className="hero-overlay bg-black bg-opacity-10"></div>
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left text-white">
          <h1 className="text-5xl font-bold">Sign Up now!</h1>
          <p className="py-6">Create an account to access all features.</p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-white/30 backdrop-blur-md p-6 border border-gray-200">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">Name</span>
              </label>
              <input type="text" {...register("name", { required: true })} placeholder="Name"
                className="input input-bordered bg-transparent text-white placeholder-gray-200" />
              {errors.name && <span className="text-red-600">This field is required</span>}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">Profile Picture URL</span>
              </label>
              <input type="text" {...register("photoURL")} placeholder="Profile Picture URL (Optional)"
                className="input input-bordered bg-transparent text-white placeholder-gray-200" />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">Email</span>
              </label>
              <input type="email" {...register("email", { required: true })} placeholder="Email"
                className="input input-bordered bg-transparent text-white placeholder-gray-200" />
              {errors.email && <span className="text-red-600">This field is required</span>}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">Password</span>
              </label>
              <input type="password" {...register("password", { required: true, minLength: 6 })}
                placeholder="Password" className="input input-bordered bg-transparent text-white placeholder-gray-200" />
              {errors.password && <p className="text-red-600">Password must be at least 6 characters</p>}
            </div>

            <div className="form-control mt-6">
              <input className="btn btn-primary" type="submit" value="Sign Up" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;