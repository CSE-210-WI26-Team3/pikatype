import TypingTrackerProvider from "../../components/TypingTracker/TypingTrackerProvider";
import TypingTrackerView from "../../components/TypingTracker/TypingTrackerView";

function Battle() {
  return (
    <div>
      <h1>Battle</h1>

      <TypingTrackerProvider>
        <TypingTrackerView />
        {/* Enemy Health Bar View */}
      </TypingTrackerProvider>
    </div>
  );
}

export default Battle;
