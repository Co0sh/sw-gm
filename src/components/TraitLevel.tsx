import React, { FC } from 'react';
import { Die } from '../logic/die';
import { Div } from './Div';
import { DieIcon } from './DieIcon';
import { makeStyles } from '@material-ui/core';
import { RaiseBar } from './RaiseBar';

export interface TraitLevelProps {
  color: 'primary' | 'secondary';
  base: Die;
  bonus?: number;
}

export const TraitLevel: FC<TraitLevelProps> = ({ color, base, bonus }) => {
  const classes = useStyles();

  return (
    <Div row spacing>
      {traitDice.map((die) => (
        <Div key={die} className={classes.die}>
          <DieIcon
            type={die}
            color={color}
            className={
              die < base
                ? classes.inactive
                : die > base
                ? classes.hidden
                : undefined
            }
          />
          {bonus && die === base && (
            <RaiseBar className={classes.bonus} value={bonus} />
          )}
        </Div>
      ))}
    </Div>
  );
};

const traitDice = [4, 6, 8, 10, 12] as const;

const useStyles = makeStyles((theme) => ({
  inactive: {
    opacity: 0.25,
  },
  hidden: {
    opacity: 0,
  },
  die: {
    position: 'relative',
  },
  bonus: {
    position: 'absolute',
    width: '100%',
    bottom: -8,
  },
}));
