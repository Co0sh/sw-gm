import React, { FC } from 'react';
import { Die } from '../logic/die';
import { Div } from './Div';
import { DieIcon } from './DieIcon';
import { makeStyles } from '@material-ui/core';
import { RaiseBar } from './RaiseBar';
import { TraitLevel } from '../logic/character';

export interface TraitLevelViewProps {
  color: 'primary' | 'secondary';
  base: Die | undefined;
  bonus?: number;
  onChange?: (level?: TraitLevel) => void;
}

export const TraitLevelView: FC<TraitLevelViewProps> = ({
  color,
  base,
  bonus,
  onChange,
}) => {
  const classes = useStyles();

  return (
    <Div row spacing>
      {traitDice.map((die) => (
        <button
          key={die}
          className={classes.die}
          onClick={() => onChange?.(die !== base ? { base: die } : undefined)}
        >
          <DieIcon
            type={die}
            color={color}
            className={
              die === base
                ? undefined
                : !base || die < base || onChange
                ? classes.inactive
                : classes.hidden
            }
          />
          {bonus && die === base && (
            <RaiseBar className={classes.bonus} value={bonus} />
          )}
        </button>
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
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: 'transparent',
    },
    outline: 'none',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
    userSelect: 'none',
    WebkitTapHighlightColor: 'transparent',
    borderRadius: '50%',
  },
  bonus: {
    position: 'absolute',
    width: '100%',
    bottom: -8,
  },
}));
