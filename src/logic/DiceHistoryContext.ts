import { createContext, useContext } from 'react';
import { MultiThrowResult } from './rolls';

export interface DiceHistoryContextType {
  diceHistory: MultiThrowResult[];
  recordDiceResult: (result: MultiThrowResult) => void;
  clearDiceHistory: () => void;
}

const defaultContext: DiceHistoryContextType = {
  diceHistory: [],
  recordDiceResult: () => {},
  clearDiceHistory: () => {},
};

export const DiceHistoryContext = createContext<DiceHistoryContextType>(
  defaultContext,
);

export const useDiceHistory = () => {
  return useContext(DiceHistoryContext);
};
