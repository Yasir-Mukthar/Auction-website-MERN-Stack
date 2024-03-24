
import {BrowserRouter , Route, Routes} from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import ContactUs from './pages/ContactUs'
import PrivacyPolicy from './pages/PrivacyPolicy'
import { ToastContainer } from 'react-toastify';
import ForgotPassword from './pages/auth/ForgotPassword'
import ResetNewPassword from './pages/auth/ResetNewPassword'
import ChangePassword from './pages/auth/ChangePassword'
import UploadItem from './pages/UploadItem'
import Dashboard from './pages/Dashboard'
import SingleAuctionDetail from './pages/SingleAuctionDetail'
import UserProfile from './pages/UserProfile'


const App = () => {
  return (
    <>
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about-us" element={<AboutUs  />} />
        <Route path="/contact-us" element={<ContactUs  />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy  />} />
        <Route path="/forgot-password" element={<ForgotPassword  />} />
        <Route path="/reset-password/:id/:token" element={<ResetNewPassword  />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/create-auction" element={<UploadItem />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path='/single-auction-detail/:id' element={<SingleAuctionDetail />} />
        <Route path="/user-profile/*" element={<UserProfile />} />        
        <Route path='*' element={<h1>Not Found</h1>} />


      </Routes>
    
    <Footer />
    </BrowserRouter>
    <ToastContainer />
    </>

  )
}

export default App