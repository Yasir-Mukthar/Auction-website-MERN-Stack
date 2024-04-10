import { useNavigate, useParams } from "react-router-dom"

import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";
import { reset, resetNewPassword } from "../../store/auth/authSlice";



const ResetNewPassword = () => {
    const { id, token } = useParams();
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const {isSuccess, isError, message} = useSelector((state) => state.auth);
    const navigate= useNavigate()


    useEffect(() => {
        if (isSuccess) {
            toast.success(message);
            setPassword("");
            navigate("/login");

        }
        if (isError) {
            toast.error(message);
        }

        return () => {
            dispatch(reset());
        }

    }, [isSuccess, isError]);



    const resetnewPassword = (e) => {
        e.preventDefault();

        if (password === "") {
            toast.error("Password is required");
            return false;
        } 
        
        let data = {
            password: password,
             id,
             token,
        };

        dispatch(resetNewPassword(data));
       

    }



  return (
 <div className="flex h-screen w-full items-center justify-center bg-[#061224] text-[#7386a8]">
      <div className="flex w-[90%] flex-col items-center rounded-xl bg-[#071B36] py-8 sm:w-2/5 sm:px-6">
        <h1 className="text-3xl font-bold text-white">
          <span className="uppercase text-[#00A3FF]">B</span>id
          <span className="uppercase text-[#00A3FF]">F</span>air
        </h1>
        <p className="my-3 h-[1px] w-[80%] bg-[#747d9340]"></p>
        <form
          className="flex w-[90%] flex-col sm:w-[90%]"
          onSubmit={resetnewPassword}
        >
          <label className="my-1 text-lg">Enter New Password</label>
          <input
            type="password"
            placeholder="Your new Password"
            className="focus:border-1 rounded text-white border-[1px] focus:border-[#00A3FF]  border-none focus:border-1 focus:border-solid bg-[#0E294D] px-5 py-3 outline-none  mb-2 placeholder-body-text-color"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            
            required
          />

          <button
            type="submit"
            className="my-4 font-Roboto outline-none border-none w-full rounded bg-[#00A3FF] px-4 py-3 font-bold hover:bg-color-danger  text-[#ffffff]"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>  )
}

export default ResetNewPassword