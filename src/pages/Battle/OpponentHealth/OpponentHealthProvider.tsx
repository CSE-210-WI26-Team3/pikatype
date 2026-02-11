import { PropsWithChildren, useReducer } from "react";
import {
  OpponentHealthContext,
  opponentHealthReducer,
  OpponentHealthState,
} from "./OpponentHealthContext";

type Props = PropsWithChildren<{ maxHp?: number }>;

export default function OpponentHealthProvider({ children, maxHp = 100 }: Props) {
  const initial: OpponentHealthState = { currentHp: maxHp, maxHp };
  const [healthState, dispatch] = useReducer(opponentHealthReducer, initial);

  return (
    <OpponentHealthContext.Provider value={{ healthState, dispatch }}>
      {children}
    </OpponentHealthContext.Provider>
  );
}
