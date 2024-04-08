import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-full lg:w-[25%] min-w-[250px] lg:max-w-[350px] ">
      <div className="text-white bg-theme-bg p-5 rounded-2xl">
        <ul className="flex flex-col gap-1 font-medium">
          <li>
            <Link
              className="flex  py-2 px-4 rounded-lg cursor-pointer hover:pl-[20px] hover:text-theme-color hover:bg-theme transition-all duration-500 "
              to="/user-profile/profile"
            >
              Profile
            </Link>
          </li>
          <li>
            <Link
              className="flex  py-2 px-4 rounded-lg cursor-pointer hover:pl-[20px] hover:text-theme-color hover:bg-theme transition-all duration-500"
              to="/user-profile/manage-items"
            >
              Manage Items
            </Link>
          </li>
          <li>
            <Link
              className="flex  py-2 px-4 rounded-lg cursor-pointer hover:pl-[20px] hover:text-theme-color hover:bg-theme transition-all duration-500"
              to="/create-auction"
            >
              Create Auction
            </Link>
          </li>
          <li>
            <Link
              className="flex  py-2 px-4 rounded-lg cursor-pointer hover:pl-[20px] hover:text-theme-color hover:bg-theme transition-all duration-500"
              to="/user-profile/bids-items"
            >
              Bids Items
            </Link>
          </li>
          <li>
            <Link
              className="flex  py-2 px-4 rounded-lg cursor-pointer hover:pl-[20px] hover:text-theme-color hover:bg-theme transition-all duration-500"
              to="/user-profile/notifications"
            >
              Notifications
            </Link>
          </li>
          <li>
            <Link
              className="flex  py-2 px-4 rounded-lg cursor-pointer hover:pl-[20px] hover:text-theme-color hover:bg-theme transition-all duration-500"
              to="/user-profile/account-settings"
            >
              Account Settings
            </Link>
          </li>
          <li>
            <Link
              className="flex  py-2 px-4 rounded-lg cursor-pointer hover:pl-[20px] hover:text-theme-color hover:bg-theme transition-all duration-500"
              to="/user-profile/change-password"
            >
              Change Password
            </Link>
          </li>
          <li>
            <Link
              className="flex py-2 px-4 rounded-lg cursor-pointer hover:pl-[20px] hover:text-theme-color hover:bg-theme transition-all duration-500"
              to="/user-profile/logout"
            >
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
