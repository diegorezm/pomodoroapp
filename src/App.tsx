import './App.css';
import PomodoroTimer from './components/PomodoroTimer';

export default function App() {
  return (
    <main className="container">
      <PomodoroTimer
        defaultPomodoroTime={10}
        defaultShortRestingTime={10}
        defaultLongRestingTime={15}
        numberOfcycles={2}
      />
    </main>
  );
}

