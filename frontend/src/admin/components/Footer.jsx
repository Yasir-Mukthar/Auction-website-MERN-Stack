import  { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <footer className="absolute bottom-0 bg-theme-bg shadow w-full">
      <div className="lg:w-[80%] mx-auto p-4 md:py-8">
        <div className="sm:flex items-center justify-between">
          <Link
            to="/dashboard"
            className="flex items-center mb-4 sm:mb-0 space-x-3 no-underline"
          >
            <h1 className="text-3xl font-bold text-white font-Roboto">
              <span className="uppercase text-theme-color">B</span>id
              <span className="uppercase text-theme-color">F</span>air
            </h1>
          </Link>
          <ul className="flex flex-wrap items-center text-sm font-medium text-white list-none">
            <li>
              <Link
                to="/about-us"
                className=" me-4 md:me-6 text-white no-underline hover:text-theme-color"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/privacy-policy"
                className=" me-4 md:me-6 text-white no-underline hover:text-theme-color"
              >
                Privacy Policy
              </Link>
            </li>
            {/* <li>
              <Link
                to=""
                className=" me-4 md:me-6 text-white no-underline hover:text-theme-color"
              >
                Licensing
              </Link>
            </li> */}
            <li>
              <Link
                to="/contact-us"
                className=" text-white no-underline hover:text-theme-color"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-border-info-color sm:mx-auto lg:my-8" />
        <div className=" font-Roboto flex justify-center text-white items-center text-sm sm:text-center">
          © {new Date().getFullYear()}
          <Link to="/admin/dashboard" className=" ml-1 no-underline">
            <p className="text-sm font-bold text-theme-color font-Roboto">
              <span className="uppercase text-theme-color"> B</span>id
              <span className="uppercase text-theme-color">F</span>air
            </p>
          </Link>
          . All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
