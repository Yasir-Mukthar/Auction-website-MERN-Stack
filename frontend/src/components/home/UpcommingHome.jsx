import { useDispatch, useSelector } from "react-redux";
import SingleAuction from "../SingleAuction";
import { getUpcomingAuctions } from "../../store/auction/auctionSlice";
import { useEffect, useState } from "react";


const UpcommingHome = () => {

  const dispatch=useDispatch();
  const {upComingAuctions} = useSelector((state) => state.auction);
  const [upComingAuctionsData, setUpComingAuctionsData] = useState([]);

  useEffect(() => {
    dispatch(getUpcomingAuctions())
  } , []);

  useEffect(() => {

    setUpComingAuctionsData(upComingAuctions);
    
  }, [upComingAuctions]);

  return (
    <>
      <div className="">
        <h2 className="text-2xl font-bold text-white mb-5">Upcoming </h2>

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
          {upComingAuctionsData.map((item) => (
            <swiper-slide key={item._id}>
              <SingleAuction
                name={item?.name}
                startingPrice={item?.startingPrice}
                image={item?.image}
                endTime={item?.endTime}
                startTime={item?.startTime}
                id={item?._id}
                status={item.status}
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

export default UpcommingHome;
