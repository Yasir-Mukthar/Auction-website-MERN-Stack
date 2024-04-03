import { Link } from "react-router-dom";
import aboutimg from "../assets/aboutus.png";

const AboutUs = () => {
  return (
    <>
      <div className="text-white flex items-center justify-center flex-col h-[280px] bg-cover bg-hero-img">
        <h1 id="home" className="text-center font-bold text-3xl">About Us</h1>
        <div className="flex gap-2 font-medium pt-2">
          <Link
            to={"/"}
            className=" no-underline hover:text-theme-color transition-all"
          >
            Home
          </Link>
          <span>/</span>
          <span className="text-theme-color">About Us</span>
        </div>
      </div>
      {/* About US PARENT */}
      <div className="text-white flex flex-col gap-8 py-20 px-11">
        {/* ABOUT US Section */}
        <div className="flex items-center gap-4 flex-wrap lg:flex-nowrap">
          <img
            className="rounded-xl min-w-48 "
            src={aboutimg}
            alt="aboutusimage"
          />
          <div className="flex flex-col gap-4 lg:min-w-[50%] lg:w-1/2">
            <div className="mb-4">
              <span className="text-lg tracking-[5px] uppercase text-theme-color font-semibold">
                About Us
              </span>
              <h2 className="mt-2 text-4xl font-medium">
                Largest Marketplace To Collect, Buy And Sell Creative Digital
                Assets
              </h2>
            </div>
            <p className="text-body-text-color">
              There are many variations of passages available but the majority
              have suffered alteration in some form by injected humour
              randomised words which don't look even slightly believable. If you
              are going to use passage you need sure there anything embarrassing
              first true generator on the Internet. Are many variations of
              passages available but the majority have suffered alteration in
              some form by injected humour randomised words which don't look
              even slightly believable. If you are going to use passage you need
              sure there anything embarrassing first true generator on the
              Internet.
            </p>
          </div>
        </div>
        {/* OUR TEAM SECTION*/}
        <div>
          <div className="flex flex-col items-center text-center">
            <span className="text-lg tracking-[5px] uppercase text-theme-color font-semibold">
              About Us
            </span>
            <h2 className="mt-2 text-4xl font-medium">Meet With Our Experts</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
