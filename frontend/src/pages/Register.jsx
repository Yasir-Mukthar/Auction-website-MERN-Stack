import { Link } from "react-router-dom";

const Register = () => {






  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#061224] text-[#7386a8]">
      <div className="flex w-[90%]  flex-col items-center justify-center rounded-xl bg-[#071B36] py-8 sm:w-2/5 sm:px-6">
        <h1 className="text-3xl font-bold text-white">
          <span className="uppercase text-[#00A3FF]">A</span>uction
          <span className="uppercase text-[#00A3FF]">z</span>
        </h1>
        <p className="m-2 text-xl">Create your new account</p>
        <p className="my-3 h-[1px] w-[80%] bg-[#747d9340]"></p>
        <form className="flex w-[90%] flex-col sm:w-[90%]">
          <label  className="my-1 text-lg">
            Full Name
          </label>
          <input
            type="email"
            placeholder="Your Name"
            className="focus:border-1 rounded border-[1px] text-white  bg-[#0E294D] px-5 py-3 mb-2 outline-none focus:border-[#00A3FF]  border-none focus:border-1 focus:border-solid placeholder-body-text-color "
          />
          <label className="my-1 text-lg">
            Email Address
          </label>
          <input
            type="email"
            placeholder="Your Email"
            className="focus:border-1 rounded text-white border-[1px] focus:border-[#00A3FF]  border-none focus:border-1 focus:border-solid bg-[#0E294D] px-5 py-3 outline-none  mb-2 placeholder-body-text-color"
          />
          <label  className="my-1 mt-2 text-lg">
            Password
          </label>
          <input
            type="password"
            placeholder="Your Password"
            className="focus:border-1 text-white rounded border-[1px] bg-[#0E294D] px-5 py-3 outline-none focus:border-[#00A3FF]  border-none focus:border-1 focus:border-solid mb-4 placeholder-body-text-color"
          />
          <button
            type="submit"
            className="my-4 font-Roboto outline-none border-none w-full rounded bg-[#00A3FF] px-4 py-3 font-bold hover:bg-color-danger  text-[#ffffff]"
          >
            Sign Up
          </button>
        </form>

        <p>
          Already have an account?{" "}
          <Link to="/login" className="font-bold text-[#29B6F6] hover:text-color-danger">
            Sign In.
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
