
import { useEffect, useState } from 'react';
import Countdown from 'react-countdown';

const CountDownTimer = (props) => {
  const currentTime = new Date().getTime();
  const startTime = new Date(props.startTime).getTime();
  const endTime = new Date(props.endTime).getTime();

  const [auctionStarted, setAuctionStarted] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date().getTime();
      const auctionStartTime = new Date(startTime).getTime();

      if (currentTime >= auctionStartTime) {
        setAuctionStarted(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);


  const selectAuctionWinner = () => {
    console.log("Auction Ended!");

  }

  const changeAuctionStatus = () => {
    console.log("Auction Started!");
  }



  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <span>Auction Ended!</span>;
    } else if (currentTime < startTime) {
      // Render a countdown to start time
      return <span>Auction starts at  
        {"" + new Date(startTime).toLocaleString()}
      </span>;
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
      <Countdown date={endTime} renderer={renderer} onComplete={selectAuctionWinner} onStart={changeAuctionStatus} />
    </div>
  );
};

export default CountDownTimer;