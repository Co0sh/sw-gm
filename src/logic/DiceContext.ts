import { createContext, useContext } from 'react';
import { MultiThrowOptions } from '../model/multiThrowOptions.model';

export interface DiceManagerContextType {
  throwDice: (options: MultiThrowOptions) => void;
}

export const DiceManagerContext = createContext<DiceManagerContextType>({
  throwDice: () => {
    throw new Error('useDice used outside of DiceManager context');
  },
});

export const useDice = () => useContext(DiceManagerContext).throwDice;
