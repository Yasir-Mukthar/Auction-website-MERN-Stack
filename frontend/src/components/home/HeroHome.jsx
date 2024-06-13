import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import herovector from "../../assets/heroimg.png";
import { RiFindReplaceLine } from "react-icons/ri";
const HeroHome = () => {
  const logInUser = JSON.parse(localStorage.getItem("user"));
  return (
    <>
      <div className="lg:h-[85vh] py-20 p-5 lg:px-12 flex items-center justify-center flex-wrap lg:flex-nowrap gap-5 text-white">
        <div className="block overflow-hidden">
          <div className="w-[300px] h-[300px] bg-[#5161F9] rounded-full blur-[150px] absolute left-[-50px] top-[-80px]"></div>
          <div className="w-[200px] h-[200px] bg-[#09a4f1] rounded-full blur-[150px] absolute left-[45%] top-[100px]"></div>
          <div className="w-[250px] h-[250px] bg-[#ca1dca] rounded-full blur-[150px] absolute  right-[50px] bottom-[80%] lg:bottom-[70%]"></div>
        </div>

        <div className="w-full flex flex-col gap-4 z-[1]  ">
          <h3 className="tracking-wider">DISCOVER, COLLECT AND SELL</h3>
          <h1 className="text-5xl font-bold">
            Discover Rare Products And Bid in Real-Time
          </h1>
          <p>
            Our real-time auctions let you join the thrill of selling, hunting
            and bidding live on rare Products. Explore our listings to start
            bidding or sell your own products!
          </p>
          <div className="flex gap-4">
            <Link
              className="hover:scale-105 flex border border-border-info-color px-5 py-3 mt-2 rounded-xl text-white cursor-pointer font-bold tracking-wide hover:bg-hover transition-all duration-200  w-fit"
              to="/dashboard"
            >
              <div className="flex items-center gap-2">
                <RiFindReplaceLine />
                <span>Explore More </span>
              </div>
            </Link>
            <Link
              className="hover:scale-105 flex bg-theme-color px-5 py-3 mt-2 rounded-xl text-white cursor-pointer font-bold tracking-wide hover:bg-hover transition-all duration-200  w-fit"
              to={logInUser ? "/create-auction" : "/login"}
            >
              <div className="flex items-center gap-2">
                <span>Create Now </span>
                <FaArrowRightLong />
              </div>
            </Link>
          </div>
        </div>
        <div className="w-full lg:p-20 animate-float ">
          <img src={herovector} alt="Hero-img" />
        </div>
      </div>
    </>
  );
};

export default HeroHome;
