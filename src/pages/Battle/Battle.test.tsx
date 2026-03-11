import { act, render, screen } from "@testing-library/react";

import {
  TypingTrackerContext,
  TypingTrackerProgress,
} from "../../components/TypingTracker/TypingTrackerProvider";
import { TimerContext, TimerStatus } from "./Timer/TimerProvider";
import { BattleContent } from "./BattleContent";

const HEALTH_UPDATE_DELAY_MS = 300;

function getProgressValue(el: HTMLElement) {
  const raw = el.getAttribute("aria-valuenow");
  if (raw == null) {
    throw new Error("Progress element missing aria-valuenow");
  }
  return Number(raw);
}

function renderBattleWithCompletedWords(
  completedWords: number,
  enemyMaxHp = 20,
) {
  return render(
    <TypingTrackerContext.Provider
      value={{
        content: "hello",
        cursor: 0,
        state: TypingTrackerProgress.Valid,
        completedWords,
        totalCharsTyped: 0,
        getNewContent: () => {},
        isAllPromptsComplete: false,
        numPromptsToComplete: enemyMaxHp,
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
        <BattleContent starterPokemon="bulbasaur" enemyPokemon="bidoof" enemyMaxHp={enemyMaxHp} />
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
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers();
    });
    jest.useRealTimers();
  });

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
          totalCharsTyped: 0,
          getNewContent: () => {},
          isAllPromptsComplete: false,
          numPromptsToComplete: 20,
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
          <BattleContent starterPokemon="bulbasaur" enemyPokemon="bidoof" enemyMaxHp={20} />
        </TimerContext.Provider>
      </TypingTrackerContext.Provider>,
    );

    act(() => {
      jest.advanceTimersByTime(HEALTH_UPDATE_DELAY_MS);
    });

    const after = getAllProgressValues();

    const deltas = before.map((v, i) => after[i] - v);
    expect(deltas.some((d) => d < 0)).toBe(true);
  });

  test("opponent health is correct percent for maxHp - completedWords", () => {
    renderBattleWithCompletedWords(3, 20);

    act(() => {
      jest.advanceTimersByTime(HEALTH_UPDATE_DELAY_MS);
    });

    const values = getAllProgressValues();
    expect(values).toContain(85);
  });

  test("opponent health clamps at 0 when completedWords exceeds maxHp", () => {
    renderBattleWithCompletedWords(999, 20);

    act(() => {
      jest.advanceTimersByTime(HEALTH_UPDATE_DELAY_MS);
    });

    const values = getAllProgressValues();
    expect(values).toContain(0);
  });
});