import React, {
  FC,
  useState,
  useEffect,
  useCallback,
  useMemo,
  memo,
} from 'react';
import Axios from 'axios';
import { DiceHistoryContext } from '../logic/DiceHistoryContext';
import { useSubscribe } from './SocketManager';
import { TableData } from '../logic/tableData';
import { MultiThrowResult } from '../model/multiThrowResult.model';

export interface DiceRemoteHistoryManagerProps {
  url?: string;
  room: TableData;
}

interface IncommingResult {
  name: string;
  result: MultiThrowResult;
}

export const DiceRemoteHistoryManager: FC<DiceRemoteHistoryManagerProps> = memo(
  ({ children, room, url }) => {
    const subscribe = useSubscribe();
    const [diceHistory, setDiceHistory] = useState<MultiThrowResult[]>([]);

    useEffect(() => {
      const handleIncomingResult = ({ result }: IncommingResult) => {
        setDiceHistory((previousHistory) => {
          if (previousHistory.find(({ uuid }) => uuid === result.uuid)) {
            return previousHistory;
          }
          return [...previousHistory, result];
        });
      };
      return subscribe('dice', handleIncomingResult);
    }, [subscribe]);

    const recordDiceResult = useCallback(
      (result: MultiThrowResult) => {
        const namedResult: MultiThrowResult = {
          ...result,
          name: renameThrow(result.name, room.user),
        };
        setDiceHistory((previousHistory) => [...previousHistory, namedResult]);
        if (url) {
          Axios.post(`${url}/dice/${room.table}`, {
            name: room.user,
            result: namedResult,
          });
        }
        return namedResult;
      },
      [room.user, room.table, url],
    );

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

const renameThrow = (throwName: string, userName: string): string =>
  `${userName}: ${throwName}`;
