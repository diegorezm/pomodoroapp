import { zeroLeft } from "./zeroLeft";

export default function secondsToTime(seconds: number) {
  const hr = zeroLeft(seconds / 3600);
  const min = zeroLeft((seconds / 60) % 60);
  const sec = zeroLeft((seconds % 60) % 60);
  return `${hr}:${min}:${sec}`;
}
