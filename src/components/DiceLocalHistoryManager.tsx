import React, {
  FC,
  useState,
  useEffect,
  useCallback,
  useMemo,
  memo,
} from 'react';
import { MultiThrowResult } from '../logic/rolls';
import { DiceHistoryContext } from '../logic/DiceHistoryContext';

export interface DiceLocalHistoryManagerProps {}

export const DiceLocalHistoryManager: FC<DiceLocalHistoryManagerProps> = memo(
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
