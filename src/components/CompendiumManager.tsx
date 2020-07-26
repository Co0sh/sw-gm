import React, { FC, createContext, useContext } from 'react';
import { Compendium } from '../logic/character';
import { exampleCompendium } from '../exampleData';

export interface CompendiumManagerProps {}

export const CompendiumManager: FC<CompendiumManagerProps> = ({ children }) => {
  return (
    <CompendiumContext.Provider value={defaultCompendium}>
      {children}
    </CompendiumContext.Provider>
  );
};

interface CompendiumContextType {
  compendium: Compendium;
}

const defaultCompendium: CompendiumContextType = {
  compendium: exampleCompendium,
};

const CompendiumContext = createContext<CompendiumContextType>(
  defaultCompendium,
);

export const useCompendium = () => useContext(CompendiumContext);
