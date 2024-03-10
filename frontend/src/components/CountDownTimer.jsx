
import Countdown from 'react-countdown';


const CountDownTimer = (props) => {
    return (
      <div>
        <Countdown
          date={new Date(props.endTime)}
          renderer={({ days, hours, minutes, seconds, completed }) => {
            if (completed) {
              // Render a completed state
              return <span>Auction Ended!</span>;
            } else {
              // Render a countdown
              return (
                <span>
                  {days}d {hours}h {minutes}m {seconds}s
                </span>
              );
            }
          }}
          //i want to run fun in dashboard on complete 
          /*onComplete={()=>{console.log("completed")}}*/
          
        />
       
      </div>
    );
  };
  
  export default CountDownTimer;