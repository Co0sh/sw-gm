import React, { FC, useCallback } from 'react';
import { useHistory } from 'react-router';
import {
  DiceManagerContext,
  DiceManagerContextType,
} from '../logic/DiceContext';
import { DicePageState } from '../pages/DicePage';

interface DiceManagerUsingRouteProps {
  diceThrowerPath: string;
}

const DiceManagerUsingRoute: FC<DiceManagerUsingRouteProps> = ({
  children,
  diceThrowerPath,
}) => {
  const { push } = useHistory<DicePageState>();

  const throwDice: DiceManagerContextType['throwDice'] = useCallback(
    (initialConfig) => {
      push(diceThrowerPath, { initialConfig });
    },
    [diceThrowerPath, push],
  );

  return (
    <DiceManagerContext.Provider value={{ throwDice }}>
      {children}
    </DiceManagerContext.Provider>
  );
};

export default DiceManagerUsingRoute;
