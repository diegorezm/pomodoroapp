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
  const [interval, setInterval] = useState<number | null>(null);
  const [totalWorkingTime, setTotalWorkingTime] = useState(0);
  const [timeBlocks, setTimeBlocks] = useState(0);
  const [restingTime, setRestingTime] = useState(props.defaultShortRestingTime);
  const [cycles, setCycles] = useState(0);
  const [working, setWorking] = useState(false);

  useEffect(() => {
    if (working) {
      document.body.classList.add('working');
    }
    else {
      document.body.classList.remove('working');
    }
  }, [working]);

  const stopTimer = () => {
    setMainTime(0);
    setInterval(null);
    setTimeBlocks(0);
    setCycles(0);
    setTotalWorkingTime(0);
    setWorking(false);
  };

  const startTimer = () => {
    setMainTime(props.defaultPomodoroTime);
    setInterval(1000);
    setWorking(true);
  };

  const pauseResumeTimer = () => {
    if (interval) {
      setInterval(null);
    } else {
      setInterval(1000);
    }
  };

  useInterval(() => {
    if (working) {
      setMainTime(mainTime - 1);
      setTotalWorkingTime(totalWorkingTime + 1);
      if (mainTime === 0) {
        setTimeBlocks(timeBlocks + 1);
        if (cycles === props.numberOfcycles) {
          setRestingTime(props.defaultLongRestingTime);
        }
        setMainTime(props.defaultPomodoroTime);
        setWorking(false);
      }
    }
    else {
      setRestingTime(restingTime - 1);
      if (restingTime === 0) {
        setMainTime(props.defaultPomodoroTime);
        setRestingTime(props.defaultShortRestingTime);
        setCycles(cycles + 1);
        setWorking(true);
      }
    }
  }, interval);

  return (
    <div className="pomodoro">
      <h2>
        You are: {working ? "working" : "resting"}
      </h2>
      <Timer time={working ? mainTime : restingTime} />

      <div className="buttons">
        <Button text="start" onClick={startTimer} className="default" />
        <Button text="stop" onClick={stopTimer} className="danger" />
        <Button text={interval ? "pause" : "resume"} onClick={pauseResumeTimer} className="default" />
      </div>
      <div className="info__panel">
        <p>
          cycles: {cycles}
        </p>

        <p>
          Total working time: {secondsToTime(totalWorkingTime)}
        </p>

        <p>
          Time blocks: {timeBlocks}
        </p>
      </div>

    </div>
  );
}
