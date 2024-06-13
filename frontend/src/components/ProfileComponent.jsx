import { useEffect } from "react";
import { FaUserPlus } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import { BsCurrencyExchange } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../store/auth/authSlice";

const ProfileComponent = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getCurrentUser());
    console.log("useEffect........");
  }, []);
  useEffect(() => {}, [user]);
  console.log(user, "user............");

  return (
    <>
      <div className="flex flex-col gap-4 w-full">
        <div className="px-7 py-4 w-full bg-theme-bg text-white rounded-2xl">
          <h2 className=" font-bold text-xl border-b border-border-info-color pb-3 mb-5 ">
            Profile Summary
          </h2>
          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center justify-between p-4 rounded-lg border border-border-info-color hover:border-theme-color transition-all">
              <div>
                <p className="text-theme-color font-bold text-lg">45.36k</p>
                <p className="text-body-text-color">Followers</p>
              </div>
              <FaUserPlus size={25} />
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg border border-border-info-color hover:border-theme-color transition-all">
              <div>
                <p className="text-theme-color font-bold text-lg">15.36k</p>
                <p className="text-body-text-color">Followed</p>
              </div>
              <FaUserPlus size={25} />
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg border border-border-info-color hover:border-theme-color transition-all">
              <div>
                <p className="text-theme-color font-bold text-lg">5.18k</p>
                <p className="text-body-text-color">Liked</p>
              </div>

              <AiFillLike size={25} />
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg border border-border-info-color hover:border-theme-color transition-all">
              <div>
                <p className="text-theme-color font-bold text-lg">45.25 ETH</p>
                <p className="text-body-text-color">Balance</p>
              </div>
              <BsCurrencyExchange size={25} />
            </div>
          </div> */}
        </div>
        <div className="flex flex-wrap gap-4 lg:flex-nowrap">
          <div className="px-7 py-4 w-full bg-theme-bg text-white rounded-2xl">
            <div className="font-bold flex justify-between items-center border-b border-border-info-color pb-3 mb-5 ">
              <h2 className="text-xl ">Personal Info</h2>
              <Link
                to="/user-profile/account-settings"
                className=" flex items-center gap-1 px-4 py-2 bg-theme-color hover:bg-color-danger rounded-xl"
              >
                <FaRegEdit size={16} /> <span>Edit</span>
              </Link>
            </div>
            <ul className="flex flex-col gap-2 font-medium text-body-text-color">
              <li>
                Name:{" "}
                <span className="float-right font-normal">
                  {user?.fullName ? user?.fullName : "-"}
                </span>
              </li>
              {/* <li>
                Username:{" "}
                <span className="float-right font-normal">@bratten65</span>
              </li> */}
              <li>
                Email:{" "}
                <span className="float-right font-normal">
                  {user?.email ? user.email : "-"}
                </span>
              </li>
              <li>
                Phone:{" "}
                <span className="float-right font-normal">
                  {user?.phone ? user.phone : "---"}
                </span>
              </li>
              <li>
                Gender:{" "}
                <span className="float-right font-normal">
                  {user?.gender ? user.gender : "---"}
                </span>
              </li>
            
              <li>
                Location:{" "}
                <span className="float-right font-normal">
                  {user?.location ? user.location : "---"}
                </span>
              </li>
              <li>
                User Type:{" "}
                <span className="float-right font-normal">
                  {user?.userType ? user?.userType : "---"}
                </span>
              </li>
              <li>
                Join Date:{" "}
                <span className="float-right font-normal">{
                  user?.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "---"
                
}</span>
              </li>
            </ul>
          </div>
          <div className="px-7 py-4 w-full bg-theme-bg text-white rounded-2xl">
            <div className="font-bold flex justify-between items-center border-b border-border-info-color pb-3 mb-5 ">
              <h2 className="text-xl ">Your Bio</h2>
              <Link
                to="/user-profile/account-settings"
                className=" flex items-center gap-1 px-4 py-2 bg-theme-color hover:bg-color-danger rounded-xl"
              >
                <FaRegEdit size={16} /> <span>Edit</span>
              </Link>
            </div>
            <p className="text-body-text-color">
              {user?.description ? user.description : "No bio available"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileComponent;
