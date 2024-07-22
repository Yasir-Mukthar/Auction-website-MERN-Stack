import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login, reset } from "../../store/auth/authSlice";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  // const [showPassword, setShowPassword] = useState(false);

  // const togglePasswordVisibility = () => {
  //   setShowPassword(!showPassword);
  // };
  useEffect(() => {
    if (user) {
      navigate("/admin/users");
    }
    if (isError) {
      toast.error(message);
      dispatch(reset());
    }
    if (isSuccess) {
      toast.success(message);
      dispatch(reset());
      if(user?.userType==="admin"){
        navigate("/admin/users");

      } else{
        navigate("/dashboard")
      }
    }

    return () => {
      dispatch(reset());
    };
  }, [isSuccess, isError, user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    dispatch(login(formData));
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#061224] text-[#7386a8]">

    <div className="flex w-[90%]  flex-col items-center rounded-xl bg-[#071B36] py-8 sm:w-2/5 sm:px-6">
      <h1 className="text-3xl font-bold text-white">
        <span className="uppercase text-[#00A3FF]">B</span>id
        <span className="uppercase text-[#00A3FF]">F</span>air
      </h1>
      

     
        <p className="m-2 text-xl">Login with your account</p>
        <p className="my-3 h-[1px] w-[80%] bg-[#747d9340]"></p>
        <form
          className="flex w-[90%] flex-col sm:w-[90%]"
          onSubmit={handleSubmit}

        >
          <label className="my-1 text-lg">Email Address</label>
          <input
            type="email"
            placeholder="Your Email"
            className=" w-full pl-5 py-3 rounded text-white bg-[#0E294D] placeholder-body-text-color outline-none mb-3 border border-border-info-color focus:border-theme-color"
            name="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <label className="my-1 mt-2 text-lg">Password</label>
          <div className=" pr-3 overflow-hidden flex justify-between items-center w-full rounded bg-[#0E294D] outline-none mb-4 border border-border-info-color">
            <input
              type="password"
              placeholder="Your Password "
              className=" w-full pl-5 py-3 bg-[#0E294D] text-white placeholder-body-text-color outline-none "
              name="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            {/* <abbr title="Show / Hide Password">
              <button
                className=" p-2 hover:bg-theme-bg rounded-full h-fit active:scale-90 hover: transition-all"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <FaRegEye size={18} />
                ) : (
                  <FaRegEyeSlash size={18} className=" text-gray-400 " />
                )}
              </button>
            </abbr> */}
          </div>
          {/* <Link
            to="/forgot-password"
            className="my-1 text-theme-color no-underline hover:text-color-danger"
          >
            Forget Password?
          </Link> */}
          <button
            type="submit"
            className="my-4 font-Roboto outline-none border-none w-full rounded bg-[#00A3FF] px-4 py-3 font-bold hover:bg-color-danger  text-[#ffffff]"
          >
            Sign In
          </button>
        </form>

        {/* <p>
          Dont have an account?{" "}
          <Link
            to="/register"
            className="font-bold text-[#29B6F6] hover:text-color-danger"
          >
            Sign Up.
          </Link>
        </p> */}
      </div>
    </div>
  );
};

export default Login;
