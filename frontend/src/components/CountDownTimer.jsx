import { useEffect, useState } from "react";
import Countdown from "react-countdown";
import { useDispatch, useSelector } from "react-redux";
import {
  updateAuctionStatus,
  selectAuctionWinner,
  reset,
} from "../store/auction/auctionSlice";

const CountDownTimer = (props) => {
  const currentTime = new Date().getTime();
  const startTime = new Date(props.startTime).getTime();
  const endTime = new Date(props.endTime).getTime();
  const dispatch = useDispatch();
  
  const [auctionStarted, setAuctionStarted] = useState(false);
  const [auctionEnded, setAuctionEnded] = useState(false);

  ////console.log("props", props);
  ////console.log(auctionEnded, auctionStarted, "auctionEnded, auctionStarted");

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date().getTime();
      if (
        !auctionStarted &&
        currentTime >= startTime &&
        currentTime < endTime
      ) {
        ////console.log("auction started.......");
        setAuctionStarted(true);
        //dispatch(updateAuctionStatus({ id: props?.id, status: "active" }));
        //dispatch(reset())
      }
      if (auctionStarted && currentTime >= endTime && !auctionEnded) {
        setAuctionEnded(true);
        ////console.log("auction ended.......");

        // dispatch(updateAuctionStatus({ id: props?.id, status: "completed" }));
        dispatch(selectAuctionWinner({ id: props?.id }));
        dispatch(reset());
        props?.Winner();
        setAuctionStarted(false);
        ////console.log("auction ended.............,,,,,,,,,");
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [auctionStarted, auctionEnded, dispatch, startTime, endTime, props?.id]);

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return (
        <span className="text-red-400 animate-fadeinout">Auction Ended!</span>
      );
    } else if (currentTime < startTime) {
      // Render a countdown to start time
      return (
        <span>
          Auction start at
          {" " + new Date(startTime).toLocaleString()}
        </span>
      );
    } else {
      // Render a countdown to end time
      return (
        <span>
          {days}d {hours}h {minutes}m {seconds}s
        </span>
      );
    }
  };

  return (
    <div>
      <Countdown date={endTime} renderer={renderer} />
    </div>
  );
};

export default CountDownTimer;
