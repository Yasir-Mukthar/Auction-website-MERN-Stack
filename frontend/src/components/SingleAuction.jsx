import { Link } from "react-router-dom";
import CountDownTimer from "../components/CountDownTimer";

const SingleAuction = ({ name, startingPrice, image, endTime, startTime }) => {
  return (
    <div className=" bg-theme-bg rounded-lg flex flex-col p-3  text-white  ">
      <div className="w-80 h-80  rounded-md relative bg-white ">
        <img
          className="w-full h-full rounded-md object-contain  "
          src={image}
          alt="item image"
        />
        <div className="absolute bottom-3 right-3 border-[0.5px] border-color-primary border-solid rounded-full py-1 px-3 text-sm bg-gray-950 bg-opacity-[0.8] ">
          <CountDownTimer startTime={startTime} endTime={endTime} />
        </div>
      </div>
      <h3 className="my-3">{name}</h3>
      <div className="flex justify-start items-center">
        <div>
          <img
            src={image}
            className="w-9 h-9 rounded-full"
            alt="seller image"
          />
        </div>
        <div className="ml-3">
          <h3 className="text-sm">Yasir Mukhtar</h3>
        </div>
      </div>
      <div className="flex justify-between item-center my-2">
        <div className="flex flex-col ">
          <p className="text-[12px]">Current Bid</p>
          <p className="mt-2">$ {startingPrice}</p>
        </div>
        <Link
          to=""
          className=" bg-theme-color hover:bg-color-danger text-white text-sm font-bold  rounded-md my-auto px-3 py-2  text-center no-underline"
        >
          Place Bid
        </Link>
      </div>
    </div>
  );
};

export default SingleAuction;
