import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../store/auth/authSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const { user, message } = useSelector((state) => state.auth);
  let navigate = useNavigate();

  // when ever user login how to show the user profile picture means how to rerender header while login component change

  useEffect(() => {}, [user]);

  const logoutHandle = () => {
    dispatch(logout());
    toast.success("Logout Successfully!");
    setSidebarOpen(false);
    dispatch(reset());
    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center px-5 sm:px-14 bg-body-bg py-4 border-b border-border-info-color">
      <div className="flex items-center px-1 vsm:px-8 ">
        <Link to="/" className=" no-underline">
          <h1 className="text-3xl font-bold text-white font-Roboto">
            <span className="uppercase text-theme-color">A</span>uction
            <span className="uppercase text-theme-color">z</span>
          </h1>
        </Link>
      </div>
      <div className="flex items-center cursor-pointer">
        {user ? (
          <div>
            <img
              src={user?.profilePicture}
              key={user.profilePicture}
              alt="user image"
              className="w-10 h-10 rounded-full"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            />
          </div>
        ) : (
          <Link
            to="/login"
            className="bg-blue-500 no-underline font-Roboto text-base  hover:bg-color-danger transition-all duration-150 text-white py-2 px-3 rounded-md text-md font-semibold"
          >
            Sign In
          </Link>
        )}
      </div>

      {user && sidebarOpen ? (
        <div
          className={`${
            sidebarOpen ? "block" : "hidden"
          } rounded-sm  absolute right-12 top-16 mt-[4px] bg-body-bg z-50   w-[200px]`}
        >
          <nav className="pt-5">
            <Link
              to="/user-profile/profile"
              className="block no-underline text-white font-Roboto text-lg py-2 px-4 hover:bg-theme-bg-light"
              onClick={() => setSidebarOpen(false)}
            >
              Profile
            </Link>
            <Link
              to=""
              className="block no-underline text-white font-Roboto text-lg py-2 px-4 hover:bg-theme-bg-light"
              onClick={() => setSidebarOpen(false)}
            >
              Manage Items
            </Link>
            <Link
              to=""
              className="block no-underline text-white font-Roboto text-lg py-2 px-4 hover:bg-theme-bg-light"
              onClick={() => setSidebarOpen(false)}
            >
              Contact
            </Link>
            {user && user.userType === "seller" ? (
              <Link
                to="/create-auction"
                className="block no-underline text-white font-Roboto text-lg py-2 px-4 hover:bg-theme-bg-light"
                onClick={() => setSidebarOpen(false)}
              >
                Upload items
              </Link>
            ) : null}
            <Link
              to="/change-password"
              className="block no-underline text-white font-Roboto text-lg py-2 px-4 hover:bg-theme-bg-light"
              onClick={() => setSidebarOpen(false)}
            >
              Change Password
            </Link>
            <Link
              onClick={() => {
                logoutHandle();
                setSidebarOpen(false);
              }}
              className="block no-underline text-white font-Roboto text-lg py-2 px-4 hover:bg-theme-bg-light"
            >
              Logout
            </Link>
          </nav>
        </div>
      ) : null}
    </div>
  );
};

export default Header;
