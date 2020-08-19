import React, {
  FC,
  createContext,
  useEffect,
  useRef,
  useContext,
  memo,
  useMemo,
} from 'react';
import io, { Socket } from 'socket.io-client';
import { TableData } from '../logic/tableData';

export interface SocketManagerProps {
  url?: string;
  room: TableData | null;
}

export const SocketManager: FC<SocketManagerProps> = memo(
  ({ url, room, children }) => {
    const socketRef = useRef<typeof Socket>();
    const subscriptions = useRef<{ [event: string]: (data: any) => void }>({});

    useEffect(() => {
      if (!url) {
        return;
      }

      const s = io.connect(url, {
        reconnection: true,
        reconnectionDelay: 5000,
      });

      socketRef.current = s;

      return () => {
        socketRef.current?.disconnect();
        socketRef.current = undefined;
      };
    }, [url]);

    useEffect(() => {
      if (!room) {
        return;
      }
      const { table: roomName, user: memberName } = room;
      const join = () => {
        socketRef.current?.emit('join', { room: roomName, name: memberName });
        Object.entries(subscriptions.current).forEach(([event, callback]) => {
          socketRef.current?.on(event, callback);
        });
      };

      socketRef.current?.on('reconnect', join);
      join();

      return () => {
        socketRef.current?.off('reconnect', join);
        socketRef.current?.emit('leave', { room: roomName });
      };
    }, [room]);

    const value: SocketContextType = useMemo(
      () => ({
        subscribe: (event, callback) => {
          const existingCallback = subscriptions.current[event];
          if (existingCallback) {
            socketRef.current?.off(event, existingCallback);
          }
          socketRef.current?.on(event, callback);
          subscriptions.current[event] = callback;
          return () => {
            socketRef.current?.off(event, callback);
            delete subscriptions.current[event];
          };
        },
      }),
      [],
    );

    return (
      <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
    );
  },
);

export type SubscribeFn = (
  event: string,
  callback: (data: any) => void,
) => () => void;

export const useSubscribe = () => useContext(SocketContext).subscribe;

interface SocketContextType {
  subscribe: SubscribeFn;
}

const SocketContext = createContext<SocketContextType>({
  subscribe: () => () => {},
});
