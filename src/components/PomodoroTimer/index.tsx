import { useEffect, useState, useCallback } from "react";
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
  const [cycles, setCycles] = useState(0);
  const [cyclesQTD, setCyclesQTD] = useState(new Array(props.numberOfcycles - 1).fill(true));
  const [numberOfPomodoros, setNumberOfPomodoros] = useState(0);
  const [workingTime, setWorkingTime] = useState(0);

  const configureWork = useCallback(() => {
    setWorking(true);
    setResting(false);
    setCountingTime(true);
    setMainTime(props.defaultPomodoroTime);
  }, [props.defaultPomodoroTime]);

  const configureResting = useCallback((long: boolean) => {
    setResting(true);
    setWorking(false);
    setCountingTime(true);
    if (long) {
      setMainTime(props.defaultLongRestingTime);
    } else {
      setMainTime(props.defaultShortRestingTime);
    }
  }, [props.defaultLongRestingTime, props.defaultShortRestingTime]);

  const playPause = () => {
    setCountingTime(!countingTime);
  };

  useEffect(() => {
    if (working) document.body.classList.add("working");
    if (resting) document.body.classList.remove("working");

    if (mainTime > 0) return;

    if (working && cyclesQTD.length > 0) {
      configureResting(false);
      cyclesQTD.pop();
    } else if (working && cyclesQTD.length <= 0) {
      setCyclesQTD(new Array(props.numberOfcycles - 1).fill(true));
      configureResting(true);
      setCycles(cycles + 1);
    }
    if (working) setNumberOfPomodoros(numberOfPomodoros + 1);
    if (resting) configureWork();
  }, [working, resting, mainTime, cyclesQTD, numberOfPomodoros, configureWork, configureResting, props.numberOfcycles, cycles]);

  useInterval(() => {
    setMainTime(mainTime - 1);
    if (working) {
      setWorkingTime(workingTime + 1);
    }
  }, countingTime ? 1000 : null);

  return (
    <div className="pomodoro">
      <h2>You are: {working ? "working" : "resting"}</h2>

      <Timer time={mainTime} />
      <div className="buttons">
        <Button text="work" onClick={configureWork} className="default" />
        <Button text="rest" onClick={() => configureResting(false)} className="default" />
        <Button text={countingTime ? "pause" : "resume"} onClick={playPause} className={!working && !resting ? "hidden" : "default"} />
      </div>
      <div className="info__panel">
        <p>
          cycles: {cycles}
        </p>

        <p>
          Total working time: {secondsToTime(workingTime)}
        </p>

        <p>
          Time blocks: {numberOfPomodoros}
        </p>
      </div>
    </div>
  );
}
