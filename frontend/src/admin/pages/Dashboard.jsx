import { Link, Route, Routes } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import ProfileComponent from "../components/ProfileComponent";
import AllUsers from "../components/AllUsers";
import EditUser from "../components/EditUser";
import AllAuctions from "../components/AllAuctions";
import EditAuction from "../components/EditAuction";
// import ChangePassword from "./auth/ChangePassword";
// import ProfileComponent from "../components/ProfileComponent";
// import ManageItems from "../components/ManageItems";
// import BidsItem from "../components/BidsItem";
// import Notifications from "../components/Notifications";
// import AccountSetting from "../components/AccountSetting";
// import {SellerRoutes} from '../auth/Protected'
// import PaymentMethod from "../components/PaymentMethod";
// import Cart from "../components/Cart";
import ErrorPage from "./ErrorPage";
import AllCategories from "../components/AllCategories";
import EditCategory from "../components/EditCategory";
import CreateCategory from "../components/CreateCategory";
import SingleAuctionDetail from "../../pages/SingleAuctionDetail"

const Dashboard = () => {
  return (
    <div className=" ">
      <div className="flex gap-4 px-5 py-10 flex-wrap lg:flex-nowrap">
        <Sidebar />

        <div className=" w-full overflow-hidden">
          <Routes>
            {/* <Route path="/dashboard" element={<ProfileComponent />}></Route> */}
            <Route path="/users/*" element={<AllUsers />} />
            <Route path="/users/profile/:id" element={<ProfileComponent />} />
            <Route path="/users/edit/:id" element={<EditUser />} />
            <Route path="/auctions/*" element={<AllAuctions />} />
            <Route path="/auctions/edit/:id" element={<EditAuction />} />
            <Route path="/auctions/view/:id" element={<SingleAuctionDetail noPadding />} />
            <Route path="/categories/*" element={<AllCategories />} />
            <Route path="/categories/edit/:id" element={<EditCategory />} />
            <Route
              path="/categories/create-category"
              element={<CreateCategory />}
            />
            {/* <Route path="/profile" element={<ProfileComponent />} />

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
          <Route path="*" element={<ErrorPage />} /> */}
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
