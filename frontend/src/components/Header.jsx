import { Link } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);





  return (
    <div className="flex justify-between items-center px-5 sm:px-14 bg-body-bg py-4 border-2 border-solid border-b-theme-bg">
      <div className="flex items-center px-1 vsm:px-8 ">
        <Link to="/" className=" no-underline">
          <h1 className="text-3xl font-bold text-white font-Roboto">
            <span className="uppercase text-theme-color">A</span>uction
            <span className="uppercase text-theme-color">z</span>
          </h1>
        </Link>
      </div>
      <div className="flex items-center">
      <Link to="/login" className="bg-blue-500 no-underline font-Roboto text-base   hover:bg-color-danger transition-all duration-150 text-white py-2 px-3 rounded-md text-md font-semibold">
        Login
      </Link>  

      <div className="hidden">
        <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="user image" 
        className="w-10 h-10 rounded-full"
        onClick={() => setSidebarOpen(!sidebarOpen)}
         />
      </div>
      </div>


      <div className={`${sidebarOpen ? 'block' : 'hidden'} rounded-sm  absolute right-12 top-16 mt-[4px] bg-body-bg   w-[200px]`}>
        <nav className="pt-5">
          <Link to="/profile" className="block no-underline text-white font-Roboto text-lg py-2 px-4 hover:bg-theme-bg-light">Profile</Link>
          <Link to="" className="block no-underline text-white font-Roboto text-lg py-2 px-4 hover:bg-theme-bg-light">Features</Link>
          <Link to="" className="block no-underline text-white font-Roboto text-lg py-2 px-4 hover:bg-theme-bg-light">Contact</Link>
          <Link to="" className="block no-underline text-white font-Roboto text-lg py-2 px-4 hover:bg-theme-bg-light">Login</Link>
          <Link to="/logout" className="block no-underline text-white font-Roboto text-lg py-2 px-4 hover:bg-theme-bg-light">Logout</Link>  
          

        </nav>
        </div>
    </div>

    );
};
  

export default Header;
