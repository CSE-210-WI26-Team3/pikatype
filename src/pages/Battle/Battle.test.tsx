import { render, screen } from "@testing-library/react";

import {
  TypingTrackerContext,
  TypingTrackerProgress,
} from "../../components/TypingTracker/TypingTrackerProvider";
import { TimerContext, TimerStatus } from "./Timer/TimerProvider";
import { BattleContent } from "./BattleContent";

function getProgressValue(el: HTMLElement) {
  const raw = el.getAttribute("aria-valuenow");
  if (raw == null) {
    throw new Error("Progress element missing aria-valuenow");
  }
  return Number(raw);
}

function renderBattleWithCompletedWords(completedWords: number, enemyMaxHp = 20) {
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
        <BattleContent starterPokemon="bulbasaur" enemyMaxHp={enemyMaxHp} />
      </TimerContext.Provider>
    </TypingTrackerContext.Provider>,
  );
}

function getAllProgressValues() {
  return screen.getAllByRole("progressbar").map(getProgressValue);
}

/**
 * Tests that BattleContent correctly derives opponent HP
 * from TypingTracker completedWords.
 */
describe("battle opponent hp derivation", () => {
  test("opponent health decreases when completedWords increases", () => {
    const { rerender } = renderBattleWithCompletedWords(0, 20);

    const before = getAllProgressValues();

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
          <BattleContent starterPokemon="bulbasaur" enemyMaxHp={20} />
        </TimerContext.Provider>
      </TypingTrackerContext.Provider>,
    );

    const after = getAllProgressValues();

    // Opponent bar is the one that decreased when completedWords increased
    const deltas = before.map((v, i) => after[i] - v);
    expect(deltas.some((d) => d < 0)).toBe(true);
  });

  test("opponent health is correct percent for maxHp - completedWords", () => {
    renderBattleWithCompletedWords(3, 20);

    // currentHp = 17, maxHp = 20 => 85%
    const values = getAllProgressValues();
    expect(values).toContain(85);
  });

  test("opponent health clamps at 0 when completedWords exceeds maxHp", () => {
    renderBattleWithCompletedWords(999, 20);

    const values = getAllProgressValues();
    expect(values).toContain(0);
  });
});