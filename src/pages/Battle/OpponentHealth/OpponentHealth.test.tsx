import {
  OpponentHealthActionType,
  opponentHealthReducer,
} from "./OpponentHealthContext";

describe("Opponent health reducer unit tests", () => {
  test("damage action reduces currentHp", () => {
    const state = { currentHp: 100, maxHp: 100 };

    const next = opponentHealthReducer(state, {
      type: OpponentHealthActionType.Damage,
      amount: 10,
    });

    expect(next.currentHp).toBe(90);
    expect(next.maxHp).toBe(100);
  });

  test("damage clamps currentHp at 0", () => {
    const state = { currentHp: 15, maxHp: 100 };

    const next = opponentHealthReducer(state, {
      type: OpponentHealthActionType.Damage,
      amount: 999,
    });

    expect(next.currentHp).toBe(0);
    expect(next.maxHp).toBe(100);
  });

  test("reset restores currentHp to maxHp", () => {
    const state = { currentHp: 40, maxHp: 100 };

    const next = opponentHealthReducer(state, {
      type: OpponentHealthActionType.Reset,
    });

    expect(next.currentHp).toBe(100);
    expect(next.maxHp).toBe(100);
  });

  test("unknown action returns unchanged state", () => {
    const state = { currentHp: 55, maxHp: 100 };

    const next = opponentHealthReducer(state, { type: "UNKNOWN" as any });

    expect(next).toEqual(state);
  });
});