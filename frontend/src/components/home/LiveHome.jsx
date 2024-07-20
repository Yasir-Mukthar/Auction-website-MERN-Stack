import SingleAuction from "../SingleAuction";
import { useSelector,useDispatch } from "react-redux";
import { getLiveAuctions } from "../../store/auction/auctionSlice";
import { useEffect, useState } from "react";



const LiveHome = (props) => {
  const dispatch=useDispatch();
  const {liveAuctions} = useSelector((state) => state.auction);
  const [liveAuctionsData, setLiveAuctionsData] = useState([]);

  useEffect(() => {
    dispatch(getLiveAuctions())
  } , []);

  useEffect(() => {

      setLiveAuctionsData(liveAuctions);
    
  }, [liveAuctions]);
  return (
    <>
      <div id="livehome">
        <div className="flex gap-2 items-center mb-5">
          <div>
            <span className="absolute animate-ping flex rounded-full h-3 w-3 bg-sky-500"></span>
            <span className="relative flex rounded-full h-3 w-3 bg-sky-500"></span>
          </div>
          <h2 className="text-2xl font-bold text-white">{ props.onlyAuction==="onlyAuction" ?"": "Live Auctions"}</h2>

        </div>
        <swiper-container
          breakpoints={JSON.stringify({
            768: {
              slidesPerView: 3,
            },

            1024: {
              slidesPerView: 4,
            },
          })}
          style={{
            "--swiper-navigation-color": "#00A3FF",
          }}
          navigation="true"
          slides-per-view="1"
          space-between="16"
        >
          {liveAuctionsData?.map((item) => (
            <swiper-slide key={item._id}>
              <SingleAuction
                name={item?.name}
                startingPrice={item?.startingPrice}
                image={item?.image}
                endTime={item?.endTime}
                startTime={item?.startTime}
                id={item?._id}
                status={item?.status}
                sellerImage={item?.seller?.profilePicture}
                sellerName={item?.seller?.fullName}
                sellerId={item?.sellerId}
              />
            </swiper-slide>
          ))}
        </swiper-container>
      </div>
    </>
  );
};

export default LiveHome;
