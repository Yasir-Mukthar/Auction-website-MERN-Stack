import { useEffect } from "react";
import { FaUserPlus } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import { BsCurrencyExchange } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserById, reset } from "../../store/user/userSlice";

const ProfileComponent = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { singleUser } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUserById(id));
    //console.log("useEffect........");
  }, []);
  useEffect(() => {}, [singleUser]);
  //console.log(singleUser, "user............");

  return (
    <>
      <div className="flex flex-col gap-4 w-full">
        <div className="flex min-h-[400px] flex-wrap gap-4 lg:flex-nowrap">
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
            <ul className="flex flex-col gap-3 font-medium text-body-text-color">
              <li>
                Name:{" "}
                <span className="float-right font-normal">
                  {singleUser?.fullName ? singleUser?.fullName : "-"}
                </span>
              </li>
              {/* <li>
                Username:{" "}
                <span className="float-right font-normal">@bratten65</span>
              </li> */}
              <li>
                Email:{" "}
                <span className="float-right font-normal">
                  {singleUser?.email ? singleUser.email : "-"}
                </span>
              </li>
              <li>
                Phone:{" "}
                <span className="float-right font-normal">
                  {singleUser?.phone ? singleUser.phone : "-"}
                </span>
              </li>
              <li>
                Gender:{" "}
                <span className="float-right font-normal">
                  {singleUser?.gender ? singleUser.gender : "-"}
                </span>
              </li>

              <li>
                Location:{" "}
                <span className="float-right font-normal">
                  {singleUser?.location ? singleUser.location : "-"}
                </span>
              </li>
              <li>
                User Type:{" "}
                <span className="float-right font-normal">
                  {singleUser?.userType ? singleUser?.userType : "-"}
                </span>
              </li>
              <li>
                Join Date:{" "}
                <span className="float-right font-normal">
                  {singleUser?.createdAt
                    ? new Date(singleUser.createdAt).toLocaleDateString()
                    : "--"}
                </span>
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
              {singleUser?.description
                ? singleUser.description
                : "No bio available"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileComponent;
