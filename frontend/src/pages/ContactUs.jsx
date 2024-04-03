import { Link } from "react-router-dom";

const ContactUs = () => {
  return (
    <>
      <div className="text-white flex items-center justify-center flex-col h-[280px] bg-hero-img bg-cover">
        <h1 className="text-center font-bold text-3xl">Contact Us</h1>
        <div className="flex gap-2 font-medium pt-2">
          <Link
            to={"/"}
            className=" no-underline hover:text-theme-color transition-all"
          >
            Home
          </Link>
          <span>/</span>
          <span className="text-theme-color">Contact Us</span>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
