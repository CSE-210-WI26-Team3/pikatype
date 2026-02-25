import { ReactNode, useMemo, useReducer } from "react";
import {
  OpponentHealthContext,
  opponentHealthReducer,
  OpponentHealthState,
} from "./OpponentHealthContext";

type Props = {
  maxHp: number;
  children: ReactNode;
};

export default function OpponentHealthProvider({ maxHp, children }: Props) {
  const initialState: OpponentHealthState = useMemo(
    () => ({ currentHp: maxHp, maxHp }),
    [maxHp],
  );

  const [healthState, dispatch] = useReducer(opponentHealthReducer, initialState);

  return (
    <OpponentHealthContext.Provider value={{ healthState, dispatch }}>
      {children}
    </OpponentHealthContext.Provider>
  );
}