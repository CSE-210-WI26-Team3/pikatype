import BattleTimer from "./Timer";
import TimerProvider from "./Timer/TimerProvider";
import HealthBar from "./HealthBar";

function Battle() {
  return (
    <div>
      <h1>Battle</h1>
      <TimerProvider time={60}>
        <BattleTimer />
        <HealthBar />
      </TimerProvider>
    </div>
  );
}

export default Battle;
