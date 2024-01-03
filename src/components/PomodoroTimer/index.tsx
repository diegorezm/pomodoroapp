import { useEffect, useState } from "react";
import { useInterval } from "../../hooks/useInterval";
import Button from "../Button";
import Timer from "../Timer";
import './style.css';
import secondsToTime from "../../utils/secondsToTime";

interface Props {
  defaultPomodoroTime: number;
  defaultShortRestingTime: number;
  defaultLongRestingTime: number;
  numberOfcycles: number;
}
export default function PomodoroTimer(props: Props) {
  const [mainTime, setMainTime] = useState(props.defaultPomodoroTime);
  const [working, setWorking] = useState(false);
  const [resting, setResting] = useState(false);
  const [countingTime, setCountingTime] = useState(false);

  const configureWork = () => {
    setWorking(true);
    setResting(false);
    setCountingTime(true);
    setMainTime(props.defaultPomodoroTime);
  };

  const configureResting = (long: boolean) => {
    setResting(true);
    setWorking(false);
    setCountingTime(true);
    if (long) {
      setMainTime(props.defaultLongRestingTime);
    } else {
      setMainTime(props.defaultShortRestingTime);
    }
  };

  const playPause = () => {
    setCountingTime(!countingTime);
  };

  useEffect(() => {
    if (working) document.body.classList.add("working");
    if (resting) document.body.classList.remove("working");
  }, [working, resting]);

  useInterval(() => {

  }, countingTime ? 1000 : null);

  return (
    <div className="pomodoro">
      <h2>You are: {working ? "working" : "resting"}</h2>
      <div className="buttons">
        
      </div>
    </div>
  );
}
