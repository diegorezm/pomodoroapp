import secondsToMinutes from '../../utils/secondsToMinutes';
import './style.css';

export default function Timer({time} : { time: number}) {
  return (
    <div className="timer">
      {secondsToMinutes(time)}
    </div>
  );
}
