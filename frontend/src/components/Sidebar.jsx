import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { reset, logout } from "../store/auth/authSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { FaUser, FaCirclePlus } from "react-icons/fa6";
import { IoIosNotifications, IoMdSettings, IoIosListBox } from "react-icons/io";
import { FaEdit, FaListAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoLogOutSharp, IoWalletOutline } from "react-icons/io5";

const Sidebar = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  const handleLinkClick = (path) => {
    setActiveLink(path);
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  //console.log(user, "user in sidebar..........,,,,,,.. usertype..");

  useEffect(() => {}, [user]);

  const logoutHandle = () => {
    dispatch(logout());
    toast.success("Logout Successfully!");
    dispatch(reset());
    navigate("/login");
  };

  return (
    <div className="w-full lg:w-[25%] min-w-[250px] lg:max-w-[350px] ">
      <div className="text-white bg-theme-bg p-5 rounded-2xl">
        <ul className="flex flex-col gap-1 font-medium cursor-pointer">
          <li>
            <Link
              className={`flex items-center gap-2 py-2 px-4 rounded-lg cursor-pointer hover:pl-[20px] hover:text-theme-color hover:bg-theme transition-all duration-500 ${
                activeLink === "/user-profile/profile"
                  ? "bg-theme-color hover:text-white"
                  : ""
              }`}
              to="/user-profile/profile"
              onClick={() => handleLinkClick("/user-profile/profile")}
            >
              <FaUser
                size={16}
                className={`text-theme-color transition-all duration-500 ${
                  activeLink === "/user-profile/profile" ? " text-white" : ""
                }`}
              />
              Profile
            </Link>
          </li>

          {user?.userType == "seller" && (
            <>
              <li>
                <Link
                  className={`flex items-center gap-2 py-2 px-4 rounded-lg cursor-pointer hover:pl-[20px] hover:text-theme-color hover:bg-theme transition-all duration-500 ${
                    activeLink === "/user-profile/manage-items"
                      ? "bg-theme-color hover:text-white"
                      : ""
                  }`}
                  to="/user-profile/manage-items"
                  onClick={() => handleLinkClick("/user-profile/manage-items")}
                >
                  <FaEdit
                    size={16}
                    className={`text-theme-color transition-all duration-500 ${
                      activeLink === "/user-profile/manage-items"
                        ? " text-white"
                        : ""
                    }`}
                  />
                  Manage Items
                </Link>
              </li>
              <li>
                <Link
                  className="flex items-center gap-2  py-2 px-4 rounded-lg cursor-pointer hover:pl-[20px] hover:text-theme-color hover:bg-theme transition-all duration-500"
                  to="/create-auction"
                >
                  <FaCirclePlus size={16} className="text-theme-color" />
                  Create Auction
                </Link>
              </li>
            </>
          )}
          <li>
            <Link
              className={`flex items-center gap-2 py-2 px-4 rounded-lg cursor-pointer hover:pl-[20px] hover:text-theme-color hover:bg-theme transition-all duration-500 ${
                activeLink === "/user-profile/bids-items"
                  ? "bg-theme-color hover:text-white"
                  : ""
              }`}
              to="/user-profile/bids-items"
              onClick={() => handleLinkClick("/user-profile/bids-items")}
            >
              <IoIosListBox
                size={18}
                className={`text-theme-color transition-all duration-500 ${
                  activeLink === "/user-profile/bids-items" ? " text-white" : ""
                }`}
              />
              Bids Items
            </Link>
          </li>
          <li>
            <Link
              className={`flex items-center gap-2 py-2 px-4 rounded-lg cursor-pointer hover:pl-[20px] hover:text-theme-color hover:bg-theme transition-all duration-500 ${
                activeLink === "/user-profile/notifications"
                  ? "bg-theme-color hover:text-white"
                  : ""
              }`}
              to="/user-profile/notifications"
              onClick={() => handleLinkClick("/user-profile/notifications")}
            >
              <IoIosNotifications
                size={18}
                className={`text-theme-color transition-all duration-500 ${
                  activeLink === "/user-profile/notifications"
                    ? " text-white"
                    : ""
                }`}
              />
              Notifications
            </Link>
          </li>
          <li>
            <Link
              className={`flex items-center gap-2 py-2 px-4 rounded-lg cursor-pointer hover:pl-[20px] hover:text-theme-color hover:bg-theme transition-all duration-500 ${
                activeLink === "/user-profile/account-settings"
                  ? "bg-theme-color hover:text-white"
                  : ""
              }`}
              to="/user-profile/account-settings"
              onClick={() => handleLinkClick("/user-profile/account-settings")}
            >
              <IoMdSettings
                size={18}
                className={`text-theme-color transition-all duration-500 ${
                  activeLink === "/user-profile/account-settings"
                    ? " text-white"
                    : ""
                }`}
              />
              Account Settings
            </Link>
          </li>
          <li>
            <Link
              className={`flex items-center gap-2 py-2 px-4 rounded-lg cursor-pointer hover:pl-[20px] hover:text-theme-color hover:bg-theme transition-all duration-500 ${
                activeLink === "/user-profile/change-password"
                  ? "bg-theme-color hover:text-white"
                  : ""
              }`}
              to="/user-profile/change-password"
              onClick={() => handleLinkClick("/user-profile/change-password")}
            >
              <RiLockPasswordFill
                size={16}
                className={`text-theme-color transition-all duration-500 ${
                  activeLink === "/user-profile/change-password"
                    ? " text-white"
                    : ""
                }`}
              />
              Change Password
            </Link>
          </li>
          <li>
            <Link
              className={`flex items-center gap-2 py-2 px-4 rounded-lg cursor-pointer hover:pl-[20px] hover:text-theme-color hover:bg-theme transition-all duration-500 ${
                activeLink === "/user-profile/payment-method"
                  ? "bg-theme-color hover:text-white"
                  : ""
              }`}
              to="/user-profile/payment-method"
              onClick={() => handleLinkClick("/user-profile/payment-method")}
            >
              <IoWalletOutline
                size={18}
                className={`text-theme-color transition-all duration-500 ${
                  activeLink === "/user-profile/payment-method"
                    ? " text-white"
                    : ""
                }`}
              />
              Payment Method
            </Link>
          </li>
          <li>
            <Link
              className="flex items-center gap-2 py-2 px-4 rounded-lg cursor-pointer hover:pl-[20px] hover:text-theme-color hover:bg-theme transition-all duration-500"
              onClick={() => {
                logoutHandle();
              }}
            >
              <IoLogOutSharp size={18} className="text-theme-color" />
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
