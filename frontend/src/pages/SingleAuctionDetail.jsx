import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getSingleAuctionById } from "../store/auction/auctionSlice";
import CountDownTimer from "../components/CountDownTimer";
import BidCard from "../components/BidCard";
import { placeABid } from "../store/bid/bidSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { sendNewBidNotification } from "../store/notification/notificationSlice";
import socket from "../socket";
import { getAllBidsForAuction } from "../store/bid/bidSlice";

const SingleAuctionDetail = () => {
  const [newBidAmount, setNewBidAmount] = useState("");
  const logInUser = JSON.parse(localStorage.getItem("user"));
  const [activeTab, setActiveTab] = useState("description");
  const params = useParams();
  const dispatch = useDispatch();
  const { singleAuction, isLoading } = useSelector((state) => state.auction);
  const { bids } = useSelector((state) => state.bid);
  const [auctionStarted, setAuctionStarted] = useState(false);
  const [singleAuctionData, setSingleAuctionData] = useState(
    singleAuction?.startingPrice
  );
  const [auctionWinnerDetailData, setAuctionWinnerDetailData] = useState();
  const [bidsData, setBidsData] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date().getTime();
      const auctionStartTime = new Date(singleAuction?.startTime).getTime();
      const auctionEndTime = new Date(singleAuction?.endTime).getTime();

      if (
        currentTime >= auctionStartTime &&
        currentTime <= auctionEndTime &&
        !auctionStarted
      ) {
        setAuctionStarted(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [singleAuction?.startTime]);

  socket.on("winnerSelected", async (data) => {
    setAuctionStarted(false);

    setAuctionWinnerDetailData(data);
    console.log(
      auctionWinnerDetailData,
      "winner sellected auctionWinnerDetailData.....................,,,,,,,,,,,"
    );
  });

  useEffect(() => {
    console.log(
      "useeffect to check auctiondatadata,,,,,,,llll,,,,",
      auctionWinnerDetailData
    );
  }, [auctionWinnerDetailData]);

  const handleWinner = () => {
    socket.emit("selectWinner", params?.id);
  };
  console.log(params.id);
  console.log(singleAuction);
  console.log(isLoading);

  useEffect(() => {
    console.log("useEffect is running.....");
    dispatch(getSingleAuctionById(params?.id));
    dispatch(getAllBidsForAuction(params?.id));
  }, []);

  useEffect(() => {
    function setData() {
      //setSingleAuctionData(singleAuction);
      setBidsData(bids);
    }
    setData();
  }, [singleAuction, bids]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log(`Client connected with the id: ${socket.id}`);
    });
    socket.emit("joinAuction", logInUser?._id);
    socket.on("newUserJoined", (data) => {
      console.log(
        data,
        "newUserJoined,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,"
      );
    });
  }, []);

  socket.on("newBidData", (data) => {
    console.log(data, "newBidData,,,,,,,,,,,,,,,,,io,,,,,,io");
    setSingleAuctionData(data.bidAmount);
    dispatch(getAllBidsForAuction(params?.id));
  });
  if (isLoading) {
    return <h1 className="text-center mt-10 text-lg text-white">Loading...</h1>;
  }

  if (!singleAuction) {
    return null;
  }

  const placeBidHandle = async (e) => {
    e.preventDefault();

    let bidData = {
      id: params.id,
      amount: newBidAmount,
    };
    if (newBidAmount <= (singleAuction?.startingPrice || singleAuctionData)) {
      toast.info("Bid amount should be greater than the currnt bid");
      console.log(new Date().getTime() / 1000 + " seconds");
    } else if (singleAuction?.endTime < new Date().getTime() / 1000) {
      toast.info("Auction time is over");
    } else {
      await dispatch(placeABid(bidData));
      setNewBidAmount("");
      setSingleAuctionData(newBidAmount);

      socket.emit("newBid", {
        profilePicture: logInUser?.profilePicture,
        fullName: logInUser?.fullName,
        bidAmount: newBidAmount,
        bidTime: new Date().getTime(),
        auctionId: params.id,
      });

      socket.emit("sendNewBidNotification", {
        auctionId: params.id,
        type: "BID_PLACED",
        newBidAmount: newBidAmount,
        fullName: logInUser?.fullName,
        id: logInUser?._id,
      });
      setActiveTab("bids");
      await dispatch(
        sendNewBidNotification({
          auctionId: params.id,
          type: "BID_PLACED",
          newBidAmount: newBidAmount,
        })
      );
    }
  };

  // Rest of your code

  return (
    <>
      <div
        className="flex place-content-between  py-10 px-5 lg:py-20  lg:px-10  items-start gap-7 flex-wrap md:flex-nowrap "
        id="item01"
      >
        <img
          className=" rounded-xl  md:max-w-[45%]  w-full "
          src={singleAuction?.image}
          alt="product image"
        />
        <div className="w-full flex gap-4 flex-col ">
          <div>
            <h2 className="text-3xl font-extrabold text-white">
              {singleAuction?.name}
            </h2>

            <div className="pt-4 flex flex-row gap-4 flex-wrap text-body-text-color capitalize">
              <a
                href="#"
                className="px-4 py-1 border rounded-full hover:bg-color-primary border-border-info-color hover:text-white transition-all"
              >
                {singleAuction?.category?.name}
              </a>
              <a
                href="#"
                className="px-4 py-1 border rounded-full hover:bg-color-primary border-border-info-color hover:text-white transition-all"
              >
                {singleAuction?.location?.name}
              </a>
            </div>

            {/* border */}
          </div>

          <div className="pt-4 border-t border-border-info-color">
            {/* Creator */}
            <div className="flex gap-8">
              <div id="author-item" className="text-heading-color">
                <span className="font-medium capitalize  ">Seller</span>
                <div id="author-info" className="flex items-center gap-2 pt-2">
                  <img
                    src={singleAuction?.seller?.profilePicture}
                    alt="avatar"
                    className="w-[45px] rounded-full"
                  />
                  <a href="#" className="font-medium ">
                    {singleAuction?.seller?.fullName}
                  </a>
                </div>
              </div>
            </div>
            {/* TABS buttons */}
            <div className="flex gap-4 pt-4 font-bold text-white ">
              <button
                className={`px-5 py-2 rounded-xl   ${
                  activeTab === "description"
                    ? "bg-color-primary"
                    : "bg-theme-bg2 text-body-text-color"
                }`}
                onClick={() => setActiveTab("description")}
              >
                Details
              </button>
              <button
                className={`px-5 py-2 rounded-xl   ${
                  activeTab === "bids"
                    ? "bg-color-primary"
                    : "bg-theme-bg2 text-body-text-color"
                }`}
                onClick={() => setActiveTab("bids")}
              >
                Bids
              </button>
            </div>
          </div>
          <div>
            {/* Description */}
            <div
              id="description"
              className={`pt-4 border-t border-border-info-color ${
                activeTab === "description" ? "block" : "hidden"
              }`}
            >
              <h3 className="text-heading-color font-medium">Description</h3>
              <p className="text-body-text-color">
                {singleAuction?.description}
              </p>
            </div>
            {/* Bids */}
            <div
              id="bids"
              className={`pt-4 border-t border-border-info-color max-h-[250px] overflow-y-auto  ${
                activeTab === "bids" ? "block" : "hidden"
              } no-scrollbar`}
            >
              {/* map over bids array */}
              {singleAuction?.bids?.length > 0 ? (
                bidsData?.map((bid) => <BidCard key={bid._id} bid={bid} />)
              ) : (
                <h1 className="text-white">No bids yet</h1>
              )}
            </div>
          </div>

          <div className="text-heading-color capitalize"></div>

          {/* countdown timer */}

          <div className="flex flex-col gap-4 pt-4 border-t border-border-info-color">
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-2">
                <h3 className="text-heading-color font-medium">
                  {" "}
                  {singleAuction?.bids?.length > 0
                    ? "Current Bid"
                    : "Starting Price"}
                </h3>
                <p className="text-body-text-color">
                  ${singleAuctionData || singleAuction?.startingPrice}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-heading-color font-medium">Time </h3>
                <p className="text-body-text-color">
                  <CountDownTimer
                    startTime={singleAuction?.startTime}
                    endTime={singleAuction?.endTime}
                    id={singleAuction?._id}
                    Winner={handleWinner}
                  />
                </p>
              </div>
            </div>
          </div>

          {/* // detail about current bid and timer  */}
          <div className=" flex flex-col gap-4 pt-4 border-t border-border-info-color ">
            {singleAuction?.status === "over" || auctionWinnerDetailData ? (
              bidsData.length > 0 ? (
                <div>
                  <h1 className="font-bold text-white">Winner</h1>
                  <div className="flex sm:gap-10 items-center border mt-2 justify-between md:w-[80%] py-1 px-2 md:px-5 border-theme-bg-light rounded-full">
                    <div className="flex gap-4 items-center text-white">
                      <img
                        src={
                          auctionWinnerDetailData?.bidder?.profilePicture ||
                          singleAuction?.winner?.bidder?.profilePicture
                        }
                        alt="bidder profilePicture"
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="flex flex-col">
                        <span className="font-semibold">
                          {auctionWinnerDetailData?.bidder?.fullName ||
                            singleAuction?.winner?.bidder?.fullName}
                        </span>
                        <span className="text-xs text-body-text-color">
                          {new Date(
                            auctionWinnerDetailData?.bidTime ||
                              singleAuction?.winner?.bidTime
                          ).toLocaleDateString()}{" "}
                          {""}
                          {`${new Date(
                            auctionWinnerDetailData?.bidTime ||
                              singleAuction?.winner?.bidTime
                          ).toLocaleTimeString()}`}
                        </span>
                      </div>
                    </div>
                    <div className="text-white">
                      Bid Amount : $
                      {auctionWinnerDetailData?.bidAmount ||
                        singleAuction?.winner?.bidAmount}
                    </div>
                  </div>{" "}
                </div>
              ) : (
                <h1 className="text-white">No bids</h1>
              )
            ) : (
              auctionStarted && (
                <form
                  className="flex justify-between flex-wrap gap-4 items-center"
                  onSubmit={placeBidHandle}
                >
                  {/* input button for bid */}
                  <input
                    type="number"
                    className="outline-none text-slate-300 px-3 py-4 rounded-xl bg-theme-bg2 border border-border-info-color focus:border-theme-color transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    placeholder="Enter your bid"
                    value={newBidAmount}
                    onChange={(e) => setNewBidAmount(e.target.value)}
                    required
                  />
                  {logInUser ? (
                    <button
                      type="submit"
                      disabled={
                        singleAuction?.seller?._id === logInUser?._id
                          ? true
                          : false || !auctionStarted
                      }
                      className={`bg-color-primary py-2 px-4 rounded-lg  text-white ${
                        singleAuction?.seller?._id === logInUser?._id
                          ? "bg-theme-bg2 text-body-text-color cursor-not-allowed border border-border-info-color hover:border-color-danger"
                          : "bg-color-primary border cursor-pointer border-border-info-color hover:bg-color-danger"
                      } ${
                        !auctionStarted
                          ? "bg-theme-bg2 text-body-text-color "
                          : "bg-color-primary "
                      } `}
                    >
                      Place Bid
                    </button>
                  ) : (
                    <Link
                      to="/login"
                      className="bg-color-primary py-2 px-4 rounded-lg cursor-pointer text-white"
                    >
                      Place Bid
                    </Link>
                  )}
                </form>
              )
            )}
          </div>
        </div>
      </div>
      <div className="mx-8">


      </div>
    </>
  );
};

export default SingleAuctionDetail;
