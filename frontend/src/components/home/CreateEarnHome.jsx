import { Link } from "react-router-dom"
import { FaArrowRightLong } from "react-icons/fa6";


const CreateEarnHome = () => {
    const logInUser = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="flex flex-col gap-4 mb-10 px-11 py-20 mt-20 justify-center bg-theme-bg rounded-[20px]  bg-cover bg-hero-img">
    <div>
      <h2 className="mb-2 text-4xl font-medium">
        Create, Sell & Earn at <span className="uppercase text-theme-color">B</span>id
              <span className="uppercase text-theme-color">F</span>air
      </h2>
      <span>Start Selling your Amazing Products now!</span>
    </div>
    <Link
      className="hover:scale-105 bg-theme-color px-5 py-3 rounded-xl text-white cursor-pointer font-bold tracking-wide hover:bg-hover transition-all duration-200  w-fit"
      to={logInUser ? "/create-auction" : "/login"}
    >
      <div className="flex items-center gap-2">
        <span>Get Started </span>
        <FaArrowRightLong />
      </div>
    </Link>
  </div>
  )
}

export default CreateEarnHome