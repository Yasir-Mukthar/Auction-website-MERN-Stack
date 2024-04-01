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
  console.log("startTime", startTime, "endTime", endTime, "currentTime", currentTime);
  const [auctionStarted, setAuctionStarted] = useState(false);
  const [auctionEnded, setAuctionEnded] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date().getTime();
      if (!auctionStarted && currentTime >= startTime && currentTime < endTime) {
        console.log("auction started.......");
        setAuctionStarted(true);
        dispatch(updateAuctionStatus({ id: props?.id, status: "active" }));
        dispatch(reset())
      }
      if (auctionStarted && currentTime >= endTime && !auctionEnded) {
        setAuctionEnded(true);
        console.log("auction ended.......");
        dispatch(updateAuctionStatus({ id: props?.id, status: "completed" }));
        dispatch(selectAuctionWinner({ id: props?.id }));
        dispatch(reset())
        setAuctionStarted(false)
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [auctionStarted, startTime, endTime, dispatch, props?.id]);

  const handleAuctionWinner = () => {
    dispatch(updateAuctionStatus({ id: props?.id, status: "completed" }));
    dispatch(selectAuctionWinner({ id: props?.id }));
  };

  const handleChangeAuctionStatus = () => {
    console.log("auction handle status .............");
    if (auctionStarted) {
      // dispatch(updateAuctionStatus({ id: props?.id, status: "active" }));
      // setAuctionStarted(false);
    }
  };

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <span>Auction Ended!</span>;
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
      <Countdown date={endTime} renderer={renderer} 
      />
    </div>
  );
};

export default CountDownTimer;
