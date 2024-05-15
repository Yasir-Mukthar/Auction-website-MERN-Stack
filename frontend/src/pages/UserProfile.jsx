import { Link, Route, Routes } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import ChangePassword from "./auth/ChangePassword";
import ProfileComponent from "../components/ProfileComponent";
import ManageItems from "../components/ManageItems";
import BidsItem from "../components/BidsItem";
import Notifications from "../components/Notifications";
import AccountSetting from "../components/AccountSetting";
import {SellerRoutes} from '../auth/Protected'
import PaymentMethod from "../components/PaymentMethod";
import Cart from "../components/Cart";
import ErrorPage from "./ErrorPage";




const UserProfile = () => {
  return (
    <div className="">
      <div className="text-white flex items-center justify-center flex-col h-[280px] bg-hero-img bg-cover">
        <h1 className="text-center font-bold text-3xl">Profile</h1>
        <div className="flex gap-2 font-medium pt-2">
          <Link
            to="/"
            className=" no-underline hover:text-theme-color transition-all"
          >
            Home
          </Link>
          <span>/</span>
          <span className="text-theme-color">Profile</span>
        </div>
      </div>
      <div className="flex gap-4 px-5 py-10 flex-wrap lg:flex-nowrap ">
        <Sidebar />
        <Routes>
          <Route path="/profile" element={<ProfileComponent />} />

          <Route element={<SellerRoutes />}>
            <Route path="/manage-items" element={<ManageItems />} />

          </Route>
          <Route path="/bids-items" element={<BidsItem />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/account-settings" element={<AccountSetting />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/payment-method" element={<PaymentMethod />} />
          <Route path="/cart" element={<Cart />} />

          <Route path="/logout" element={<ChangePassword />} />
          <Route path="*" element={<ErrorPage />} />


        </Routes>
      </div>
    </div>
  );
};

export default UserProfile;
