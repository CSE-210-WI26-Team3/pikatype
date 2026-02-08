import TypingTrackerProvider from "../../components/TypingTracker/TypingTrackerProvider";
import TypingTrackerView from "../../components/TypingTracker/TypingTrackerView";
import BattleTimer from "./Timer";
import TimerProvider from "./Timer/TimerProvider";
import HealthBar from "./HealthBar";

function Battle() {
  return (
    <div>
      <h1>Battle</h1>

      <TypingTrackerProvider>
        <TimerProvider time={60}>
          <TypingTrackerView />
          <BattleTimer />
          <HealthBar />
        </TimerProvider>
      </TypingTrackerProvider>
    </div>
  );
}

export default Battle;
