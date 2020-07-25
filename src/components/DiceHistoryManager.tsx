import React, {
  FC,
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  memo,
  useContext,
} from 'react';
import { MultiThrowResult } from '../logic/rolls';

export interface DiceHistoryManagerProps {}

export const DiceHistoryManager: FC<DiceHistoryManagerProps> = memo(
  ({ children }) => {
    const initialHistory = JSON.parse(
      localStorage.getItem('diceHistory') ?? '[]',
    );

    const [diceHistory, setDiceHistory] = useState<MultiThrowResult[]>(
      initialHistory,
    );

    useEffect(() => {
      localStorage.setItem('diceHistory', JSON.stringify(diceHistory));
    }, [diceHistory]);

    const recordDiceResult = useCallback((result: MultiThrowResult) => {
      setDiceHistory((previousHistory) => [...previousHistory, result]);
    }, []);

    const clearDiceHistory = useCallback(() => {
      setDiceHistory([]);
    }, []);

    const value = useMemo(
      () => ({ diceHistory, recordDiceResult, clearDiceHistory }),
      [diceHistory, recordDiceResult, clearDiceHistory],
    );

    return (
      <DiceHistoryContext.Provider value={value}>
        {children}
      </DiceHistoryContext.Provider>
    );
  },
);

interface DiceHistoryContextType {
  diceHistory: MultiThrowResult[];
  recordDiceResult: (result: MultiThrowResult) => void;
  clearDiceHistory: () => void;
}

const defaultContext: DiceHistoryContextType = {
  diceHistory: [],
  recordDiceResult: () => {},
  clearDiceHistory: () => {},
};

const DiceHistoryContext = createContext<DiceHistoryContextType>(
  defaultContext,
);

export const useDiceHistory = () => {
  return useContext(DiceHistoryContext);
};
