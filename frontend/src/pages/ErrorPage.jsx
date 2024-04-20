import React from "react";
import { Link, useNavigate } from "react-router-dom";
import errorimg from "../assets/error.png";
const ErrorPage = () => {
  return (
    <>
      <div className="flex flex-col items-center px-10 justify-center gap-10 text-white text-center  h-screen">
        <img className="md:w-[60%] md:max-w-[600px]" src={errorimg} alt="" />

        <div className="flex flex-col">
          <h1 className="text-3xl font-bold ">OOps... Page Not Found</h1>
          <p className="text-body-text-color">
            The page you looking for is not found or is removed.
          </p>
        </div>
        <Link
          to="/"
          className="font-Roboto text-lg mx-3 rounded-xl px-4 py-3 cursor-pointer font-bold tracking-wide  bg-theme-color hover:bg-color-danger transition-all"
        >
          Go To Home
        </Link>
      </div>
    </>
  );
};

export default ErrorPage;
