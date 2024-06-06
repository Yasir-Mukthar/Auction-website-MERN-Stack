import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import { ToastContainer } from "react-toastify";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetNewPassword from "./pages/auth/ResetNewPassword";
import UploadItem from "./pages/UploadItem";
import Dashboard from "./pages/Dashboard";
import SingleAuctionDetail from "./pages/SingleAuctionDetail";
import UserProfile from "./pages/UserProfile";
import EditAuction from "./pages/EditAuction";
import ErrorPage from "./pages/ErrorPage";
import Protected, { PublicRoute, SellerRoutes, AdminRoutes } from "./auth/Protected";
import PaymentSuccess from "./pages/PaymentSuccess";
import Admin from "./admin/Admin"
import { useSelector } from "react-redux";
import AdminFooter from "./admin/components/Footer"
import AdminHeader from "./admin/components/Header"
import AdminLogin from "./admin/pages/Login"
import AdminDashboard from "./admin/Admin"
import ManageItems from "./components/ManageItems";


const App = () => {

const { user } = useSelector((state) => state.auth);

console.log(user,"...")
  return (
    <>
      <BrowserRouter>
      {user && user.userType === "admin" ? <AdminHeader /> : <Header />}
 
        <Routes>
          {/* <Route path="/admin/login" element={<AdminLogin />} /> */}
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/single-auction-detail/:id"
            element={<SingleAuctionDetail />}
          />

          <Route path="*" element={<ErrorPage />} />

          <Route element={<PublicRoute />}>
            <Route
              path="/reset-password/:id/:token"
              element={<ResetNewPassword />}
            />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          <Route element={<Protected />}>
            <Route path="/user-profile/*" element={<UserProfile />} />
            <Route path="/edit-auction/:id" element={<EditAuction />} />
            <Route path="/success/:id" element={<PaymentSuccess />} />
            <Route element={<SellerRoutes />}>
              <Route path="/create-auction" element={<UploadItem />} />
              {/* <Route path="/user-profile/manage-items" element={<ManageItems />} /> */}


            </Route>
           
          </Route>
          {/* <Route element={<AdminRoutes />}> */}
              <Route path="/admin/*" element={<AdminDashboard />} />
              
            {/* </Route> */}
        </Routes>

{user && user.userType === "admin" ? <AdminFooter />: <Footer /> }

      </BrowserRouter>
      <ToastContainer />
    </>
  );
};

export default App;
