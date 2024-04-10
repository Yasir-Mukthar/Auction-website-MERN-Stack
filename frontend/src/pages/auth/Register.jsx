import { Link,useNavigate } from "react-router-dom";
import { useState ,useEffect} from "react";
import { useDispatch,useSelector } from "react-redux";
import {toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { register, reset } from "../../store/auth/authSlice";


const Register = () => {

  const [formData, setFormData] = useState({ fullName: "", email: "", password: "" });
  // Redux dispatch and state
  const dispatch = useDispatch();
  const {user,isLoading, isError, isSuccess, message} = useSelector(state => state.auth);
  const navigate = useNavigate();
  
  useEffect(()=>{
    
  
    if(user) {
      navigate("/");
    }

    if(isSuccess){
      toast.success(message);
      navigate('/login');
    } 
    if(isError){
      toast.error(message);
      dispatch(reset());
    }


    return () => {
      dispatch(reset());
    }


  },[isError,isSuccess,user]);



  // Submit the form data to the server
  const handleRegister = async (e) => {
    e.preventDefault();
   

    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!emailRegex.test(formData.email)) {
      toast.error("Email is invalid");
      return false;
    }else if(!passwordRegex.test(formData.password)) {
      toast.error("Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character");
      return false;
    }else {
      console.log(formData);
      dispatch(register(formData));
     
    }

    

   

  };

  



  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#061224] text-[#7386a8]">
      <div className="flex w-[90%]  flex-col items-center justify-center rounded-xl bg-[#071B36] py-8 sm:w-2/5 sm:px-6">
        <h1 className="text-3xl font-bold text-white">
          <span className="uppercase text-[#00A3FF]">B</span>id
          <span className="uppercase text-[#00A3FF]">F</span>air
        </h1>
        <p className="m-2 text-xl">Create your new account</p>
        <p className="my-3 h-[1px] w-[80%] bg-[#747d9340]"></p>
        <form className="flex w-[90%] flex-col sm:w-[90%]" onSubmit={handleRegister}>
          <label  className="my-1 text-lg">
            Full Name
          </label>
          <input
            type="text"
            placeholder="Your Name"
            className="focus:border-1 rounded border-[1px] text-white  bg-[#0E294D] px-5 py-3 mb-2 outline-none focus:border-[#00A3FF]  border-none focus:border-1 focus:border-solid placeholder-body-text-color "
            name="fullName"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            required
            // add validation here
            minLength={5}

          />
          <label className="my-1 text-lg">
            Email Address
          </label>
          <input
            type="email"
            placeholder="Your Email"
            className="focus:border-1 rounded text-white border-[1px] focus:border-[#00A3FF]  border-none focus:border-1 focus:border-solid bg-[#0E294D] px-5 py-3 outline-none  mb-2 placeholder-body-text-color"
            name="email"
            value={formData.email}
            onChange={(e)=> setFormData({...formData, email: e.target.value})}
            required

          />
          <label  className="my-1 mt-2 text-lg">
            Password
          </label>
          <input
            type="password"
            placeholder="Your Password"
            className="focus:border-1 text-white rounded border-[1px] bg-[#0E294D] px-5 py-3 outline-none focus:border-[#00A3FF]  border-none focus:border-1 focus:border-solid mb-4 placeholder-body-text-color"
            name="password"
            value={formData.password}
            onChange={(e)=> setFormData({...formData, password: e.target.value})}
            required
          />
          <button
            type="submit"
            className="my-4 font-Roboto outline-none border-none w-full rounded bg-[#00A3FF] px-4 py-3 font-bold hover:bg-color-danger  text-[#ffffff]"
            disabled={isLoading ? true : false}
          >
            Sign Up
          </button>
        </form>

        <p>
          Already have an account?{" "}
          <Link to="/login" className="font-bold text-[#29B6F6] hover:text-color-danger">
            Sign In.
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
