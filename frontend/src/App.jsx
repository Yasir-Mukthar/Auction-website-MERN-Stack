
import {BrowserRouter , Route, Routes} from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import ContactUs from './pages/ContactUs'
import PrivacyPolicy from './pages/PrivacyPolicy'

const App = () => {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about-us" element={<AboutUs  />} />
        <Route path="/contact-us" element={<ContactUs  />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy  />} />


      </Routes>
    
    <Footer />
    </BrowserRouter>
  )
}

export default App