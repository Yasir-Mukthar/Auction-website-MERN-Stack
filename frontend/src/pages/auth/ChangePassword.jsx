import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { reset ,changeCurrentPassword} from "../../store/auth/authSlice";

const ChangePassword = () => {
    const [formData, setFormData] = useState({ oldPassword: "", newPassword: "" });

  const dispatch = useDispatch();
  const { isSuccess, isError, message } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      toast.success(message);
      navigate("/");
    }
    if (isError) {
      toast.error(message);
    }

    return () => {
      dispatch(reset());
    };
  }, [isSuccess, isError]);

    const handleChangeCurrentPassword = (e) => {
    e.preventDefault();

    if (formData.oldPassword === "" || formData.newPassword === "") {
        toast.error("All fields are required");
        return false;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if(!passwordRegex.test(formData.newPassword)) {
        toast.error("Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character");
        return false;
      }

    dispatch(changeCurrentPassword(formData));


    }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-[#061224] text-[#7386a8]">
      <div className="flex w-[90%] flex-col items-center rounded-xl bg-[#071B36] py-8 sm:w-2/5 sm:px-6">
        <h1
        className="text-2xl font-semibold text-white"
        >Change Password</h1>
        <form
          className="flex w-[90%] flex-col sm:w-[90%]"
          onSubmit={handleChangeCurrentPassword}
        >
          <label className="my-1 text-lg">Old Password</label>
          <input
            type="password"
            placeholder="Enter old Password"
            className="focus:border-1 rounded text-white border-[1px] focus:border-[#00A3FF]  border-none focus:border-1 focus:border-solid bg-[#0E294D] px-5 py-3 outline-none  mb-2 placeholder-body-text-color"
            name="oldPassword"
            value={formData.oldPassword}
            onChange={(e) => setFormData({ ...formData, oldPassword: e.target.value })}
           
            required
          />

          <label className="my-1 text-lg">New Password</label>
          <input
            type="password"
            placeholder="Enter new Password"
            className="focus:border-1 rounded text-white border-[1px] focus:border-[#00A3FF]  border-none focus:border-1 focus:border-solid bg-[#0E294D] px-5 py-3 outline-none  mb-2 placeholder-body-text-color"
            name="newPassword"
            value={formData.newPassword}
            onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
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
    </div>
  );
};

export default ChangePassword;
