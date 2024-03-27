import { Route, Routes } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import ChangePassword from "./auth/ChangePassword";
import ProfileComponent from "../components/ProfileComponent";
import ManageItems from "../components/ManageItems";
import BidsItem from "../components/BidsItem";
import Notifications from "../components/Notifications";
import AccountSetting from "../components/AccountSetting";

const UserProfile = () => {
  return (
    <div className="">
      <div className="flex gap-4 p-5 flex-wrap lg:flex-nowrap ">
        <Sidebar />
        <Routes>
          <Route path="/profile" element={<ProfileComponent />} />
          <Route path="/manage-items" element={<ManageItems />} />
          <Route path="/bids-items" element={<BidsItem />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/account-settings" element={<AccountSetting />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/logout" element={<ChangePassword />} />
        </Routes>
      </div>
    </div>
  );
};

export default UserProfile;
