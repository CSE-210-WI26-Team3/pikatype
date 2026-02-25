import { createContext, Dispatch } from "react";

export type OpponentHealthState = {
  currentHp: number;
  maxHp: number;
};

export enum OpponentHealthActionType {
  Damage,
  Reset,
}

export type OpponentHealthAction =
  | { type: OpponentHealthActionType.Damage; amount: number }
  | { type: OpponentHealthActionType.Reset };

export type OpponentHealthModel = {
  healthState: OpponentHealthState;
  dispatch: Dispatch<OpponentHealthAction>;
};

const DEFAULT_OPPONENT_HEALTH_MODEL: OpponentHealthModel = {
  healthState: { currentHp: 100, maxHp: 100 },
  dispatch: () => {},
};

export const OpponentHealthContext = createContext<OpponentHealthModel>(
  DEFAULT_OPPONENT_HEALTH_MODEL,
);

export function opponentHealthReducer(
  state: OpponentHealthState,
  action: OpponentHealthAction,
): OpponentHealthState {
  switch (action.type) {
    case OpponentHealthActionType.Damage: {
      const next = Math.max(0, state.currentHp - action.amount);
      return { ...state, currentHp: next };
    }
    case OpponentHealthActionType.Reset:
      return { ...state, currentHp: state.maxHp };
    default:
      return state;
  }
}