import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className=" bg-theme-bg shadow   w-full">
      <div className="lg:w-[80%] mx-auto p-4 md:py-8">
        <div className="sm:flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center mb-4 sm:mb-0 space-x-3 no-underline"
          >
            <h1 className="text-3xl font-bold text-white font-Roboto">
              <span className="uppercase text-theme-color">A</span>uction
              <span className="uppercase text-theme-color">z</span>
            </h1>
          </Link>
          <ul className="flex flex-wrap items-center text-sm font-medium text-white list-none">
            <li>
              <Link
                to="/about-us"
                className=" me-4 md:me-6 text-white no-underline hover:text-theme-color"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/privacy-policy"
                className=" me-4 md:me-6 text-white no-underline  hover:text-theme-color"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                to=""
                className=" me-4 md:me-6 text-white no-underline  hover:text-theme-color"
              >
                Licensing
              </Link>
            </li>
            <li>
              <Link
                to="/contact-us"
                className=" text-white no-underline  hover:text-theme-color"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
        <div className=" font-Roboto flex justify-center text-white items-center text-sm sm:text-center">
          © {new Date().getFullYear()}
          <Link to="/" className=" ml-1 no-underline">
            <p className="text-sm font-bold text-theme-color font-Roboto">
              <span className="uppercase text-theme-color"> A</span>uction
              <span className="uppercase text-theme-color">z</span>
            </p>
          </Link>
          . All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
