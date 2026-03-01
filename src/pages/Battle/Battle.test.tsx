import { render, screen } from "@testing-library/react";
import React from "react";

import { TypingTrackerContext, TypingTrackerProgress } from "../../components/TypingTracker/TypingTrackerProvider";
import { TimerContext, TimerStatus } from "./Timer/TimerProvider";
import { BattleContent } from "./Battle";

function getProgressValue(el: HTMLElement) {
  const raw = el.getAttribute("aria-valuenow");
  if (raw == null) {
    throw new Error("Progress element missing aria-valuenow");
  }
  return Number(raw);
}

function renderBattleWithCompletedWords(completedWords: number) {
  return render(
    <TypingTrackerContext.Provider
      value={{
        content: "hello",
        cursor: 0,
        state: TypingTrackerProgress.Valid,
        completedWords,
        getNewContent: () => {},
      }}
    >
      <TimerContext.Provider
        value={{
          timerState: {
            currentTime: 60,
            maxTime: 60,
            status: TimerStatus.Ongoing,
          },
          dispatch: () => {},
        } as any}
      >
        <BattleContent />
      </TimerContext.Provider>
    </TypingTrackerContext.Provider>
  );
}

/**
 * Tests that Battle correctly derives opponent HP
 * from TypingTracker completedWords.
 */
describe("battle opponent hp derivation", () => {
  test("opponent health decreases when completedWords increases", () => {
    const { rerender } = renderBattleWithCompletedWords(0);

    let progressBars = screen.getAllByRole("progressbar");

    // Player bar is first, opponent bar is second
    const opponentInitial = getProgressValue(progressBars[1]);

    rerender(
      <TypingTrackerContext.Provider
        value={{
          content: "hello",
          cursor: 0,
          state: TypingTrackerProgress.Valid,
          completedWords: 1,
          getNewContent: () => {},
        }}
      >
        <TimerContext.Provider
          value={{
            timerState: {
              currentTime: 60,
              maxTime: 60,
              status: TimerStatus.Ongoing,
            },
            dispatch: () => {},
          } as any}
        >
          <BattleContent />
        </TimerContext.Provider>
      </TypingTrackerContext.Provider>,
    );

    progressBars = screen.getAllByRole("progressbar");
    const opponentNext = getProgressValue(progressBars[1]);

    expect(opponentNext).toBeLessThan(opponentInitial);
  });
});