import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../../store/auth/authSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";
import { IoIosNotificationsOutline } from "react-icons/io";
// import { getNotificationForUser } from "../store/notification/notificationSlice";
// import socket from "../socket";
import { FaBars, FaTimes } from "react-icons/fa";
import NavSidebar from "./NavSidebar";

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [navbarOpen, setNavbarOpen] = useState(false);

  const dispatch = useDispatch();
   const { user } = useSelector((state) => state.auth);
//   const { notifications } = useSelector((state) => state.notification);
  let navigate = useNavigate();
  const closeNavbar=()=>{
    setNavbarOpen(false)
  
  }
//   let location = useLocation();
//   const logInUser = JSON.parse(localStorage.getItem("user"));

//   //console.log(notifications, "notifications............ header......");
//   //i want a length of isRead ===false
//   const unReadNotifications = notifications.filter(
//     (notification) => notification.isRead === false
//   );
//   //console.log(unReadNotifications.length, "unreadnotificatons........ length");

//   useEffect(() => {}, [user]);
//   useEffect(() => {
//     if (logInUser) {
//       dispatch(getNotificationForUser());
//     }
//     socket.on("newBidNotification", (data) => {
//       //console.log(
//         data,
//         " new bid notification data from socket.,,,,,,,,,,,,,,,,,,,,,,,,.........."
//       );
//       socket.emit("joinAuction", logInUser?._id);

//       dispatch(getNotificationForUser());
//     });

//     //console.log(notifications, "notification dispatch............");
//   }, [location]);

  const logoutHandle = () => {
    dispatch(logout());
    toast.success("Logout Successfully!");
    setSidebarOpen(false);
    dispatch(reset());
    navigate("/admin/login");
  };

  return (
    <div className="flex justify-between items-center px-2  sm:px-14 bg-body-bg py-4 border-b border-border-info-color">
      <div className="flex items-center px-1 z-[1]">
        <Link to="/admin/dashboard" className=" no-underline ">
          <h1 className="text-3xl font-bold text-white font-Roboto">
            <span className="uppercase text-theme-color">B</span>id
            <span className="uppercase text-theme-color">F</span>air
          </h1>
        </Link>
      </div>
      {/* <div className="hidden sm:block">
        <Link to="/" className="text-white font-Roboto text-lg mx-3">
          Home
        </Link>

        <Link to="/contact-us" className="text-white font-Roboto text-lg mx-3">
          Contact Us
        </Link>
        <Link to="/about-us" className="text-white font-Roboto text-lg mx-3">
          About Us
        </Link>
        {user && (
          <Link
            to="/user-profile/cart"
            className="text-white font-Roboto text-lg mx-3"
          >
            Cart
          </Link>
        )}
      </div> */}
      <div className="flex items-center cursor-pointer z-[1]">
        {user ? (
          <div className="flex justify-center items-center">
            <img
              src={user?.profilePicture}
              key={user.profilePicture}
              alt="user image"
              className="w-10 h-10 rounded-full order-2 cursor-pointer"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            />
            <Link to="/user-profile/notifications" className="mr-2">
              {/* {unReadNotifications.length > 0 ? (
                <span className="absolute right-0 top-0 w-[18px] h-[18px] flex items-center justify-center bg-theme-color rounded-full  text-white text-xs font-bold">
                  {unReadNotifications.length}
                </span>
              ) : null} */}

              {/* <IoIosNotificationsOutline
                size={37}
                className="text-white text-xl cursor-pointer bg-theme-bg hover:text-theme-color rounded-full p-2 transition-all "
              /> */}
            </Link>
            <Link
              onClick={() => setNavbarOpen(!navbarOpen)}
              className="text-white font-Roboto sm:hidden text-lg mx-3 order-3"
            >
              {navbarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </Link>
          </div>
        ) : (
          <>
            <Link
              to="/admin/login"
              className="bg-blue-500 no-underline font-Roboto text-base  hover:bg-color-danger transition-all duration-150 text-white py-1 sm:py-2 sm:px-3 px-2 rounded-md text-md font-semibold"
            >
              Sign In
            </Link>
            <Link
              onClick={() => setNavbarOpen(!navbarOpen)}
              className="text-white font-Roboto sm:hidden text-lg mx-3 order-3 z-50"
            >
              {navbarOpen ? <FaTimes size={25} /> : <FaBars size={25} />}
            </Link>
          </>
        )}
      </div>

      {user && sidebarOpen ? (
        <div
          className={`${
            sidebarOpen ? "animate-fadein" : "hidden"
          } rounded-xl origin-top-right overflow-hidden absolute right-12 top-16 mt-[4px] bg-body-bg z-50   w-[250px]`}
        >
          <nav className="pt-2 [&_a]:transition-all [&_a]:duration-100">
            {/* <Link
              to="/admin/dashboard"
              className="block no-underline text-white font-Roboto text-lg py-2 px-7 hover:bg-theme-bg-light"
              onClick={() => setSidebarOpen(false)}
            >
              Profile
            </Link>
            <Link
              to={
                user.userType === "seller"
                  ? "/admin/dashboard"
                  : "/admin/dashboard"
              }
              className="block no-underline text-white font-Roboto text-lg py-2 px-7 hover:bg-theme-bg-light"
              onClick={() => setSidebarOpen(false)}
            >
              {user.userType === "seller" ? "Manage Items" : "Bids Items"}
            </Link>

            <Link
              to="/admin/dashboard"
              className="block no-underline text-white font-Roboto text-lg py-2 px-7 hover:bg-theme-bg-light"
              onClick={() => setSidebarOpen(false)}
            >
              Account Setting
            </Link> */}
            <Link
              onClick={() => {
                logoutHandle();
                setSidebarOpen(false);
              }}
              className="block no-underline text-white font-Roboto text-lg py-2 px-7 hover:bg-theme-bg-light"
            >
              Logout
            </Link>
          </nav>
        </div>
      ) : null}
      {navbarOpen && (
        <div 
        className="flex sm:hidden flex-col justify-center items-center absolute top-16 left-0 w-full h-screen bg-gradient-to-b from-theme-bg2 to-theme-bg text-body-text-color z-10 [&_li]:flex [&_li]:w-full link:w-full link:px-4  hover:link:bg-theme-bg2 text-center"
        >
        <NavSidebar closeNavbar={closeNavbar} />

        </div>
        // <ul className=" flex sm:hidden flex-col justify-center items-center absolute top-16 left-0 w-full h-screen bg-gradient-to-b from-theme-bg2 to-theme-bg text-body-text-color z-10 [&_li]:flex [&_li]:w-full link:w-full link:px-4 link:py-6 hover:link:bg-theme-bg2 text-center ">
        //   <li className="cursor-pointer capitalize text-4xl">
        //     <Link to="/" onClick={() => setNavbarOpen(!navbarOpen)}>
        //       Home
        //     </Link>
        //   </li>

        //   <li className="cursor-pointer capitalize text-4xl">
        //     <Link to="/contact-us" onClick={() => setNavbarOpen(!navbarOpen)}>
        //       Contact
        //     </Link>
        //   </li>
        //   <li className="cursor-pointer capitalize text-4xl">
        //     <Link to="/about-us" onClick={() => setNavbarOpen(!navbarOpen)}>
        //       About
        //     </Link>
        //   </li>
        //   <li className="cursor-pointer capitalize text-4xl">
        //     {user && (
        //       <Link
        //         to="/user-profile/cart"
        //         className="text-white font-Roboto text-lg mx-3"
        //       >
        //         Cart
        //       </Link>
        //     )}
        //   </li>
        // </ul>
      )} 
    </div>
  );
};

export default Header;
