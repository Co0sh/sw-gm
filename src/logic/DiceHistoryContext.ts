import { createContext, useContext } from 'react';
import { MultiThrowResult } from './rolls';

export interface DiceHistoryContextType {
  diceHistory: MultiThrowResult[];
  recordDiceResult: (result: MultiThrowResult) => MultiThrowResult;
  clearDiceHistory: () => void;
}

const defaultContext: DiceHistoryContextType = {
  diceHistory: [],
  recordDiceResult: (res) => res,
  clearDiceHistory: () => {},
};

export const DiceHistoryContext = createContext<DiceHistoryContextType>(
  defaultContext,
);

export const useDiceHistory = () => {
  return useContext(DiceHistoryContext);
};
