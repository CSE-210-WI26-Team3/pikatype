import { createContext, Dispatch } from "react";

export type OpponentHealthState = {
  currentHp: number;
  maxHp: number;
};

export type OpponentHealthAction =
  | { type: "damage"; amount: number }
  | { type: "reset" };

export type OpponentHealthModel = {
  healthState: OpponentHealthState;
  dispatch: Dispatch<OpponentHealthAction>;
};

export const OpponentHealthContext = createContext<OpponentHealthModel>(
  {} as OpponentHealthModel,
);

export function opponentHealthReducer(
  state: OpponentHealthState,
  action: OpponentHealthAction,
): OpponentHealthState {
  switch (action.type) {
    case "damage": {
      const next = Math.max(0, state.currentHp - action.amount);
      return { ...state, currentHp: next };
    }
    case "reset":
      return { ...state, currentHp: state.maxHp };
    default:
      return state;
  }
}
