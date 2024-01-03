import secondsToTime from "../../utils/secondsToTime";
import './style.css';

export default function Timer({time} : { time: number}) {
  return (
    <div className="timer">
      {secondsToTime(time)}
    </div>
  );
}
