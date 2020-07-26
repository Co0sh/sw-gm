import React, { FC, useState } from 'react';
import { IconButton, makeStyles, Theme } from '@material-ui/core';
import { Die } from '../logic/die';
import { DiceIcons } from '../logic/diceIcons';
import { ThrowType } from '../logic/rolls';
import { Div } from './Div';
import { DieIcon } from './DieIcon';

export interface DiePickerProps {
  initialValue?: Die | null;
  value?: Die | null;
  onChange?: (value: Die) => void;
  type?: ThrowType;
  disabled?: boolean;
  className?: string;
}

export const DiePicker: FC<DiePickerProps> = ({
  initialValue,
  value: propValue,
  onChange,
  type = 'regular',
  disabled = false,
  className,
}) => {
  const classes = useStyles({ type });
  const [stateDie, setStateDie] = useState(propValue ?? initialValue ?? null);
  const die = propValue !== undefined ? propValue : stateDie;
  const handleDie = (die: Die) => {
    onChange?.(die);
    setStateDie(die);
  };

  return (
    <Div row align="center" justify="space-between" grows className={className}>
      {Object.keys(DiceIcons).map((key) => {
        const dieType = Number(key) as Die;
        const selected = dieType === die;
        return (
          <IconButton
            key={dieType}
            onClick={() => handleDie(dieType)}
            size="small"
            disabled={disabled}
            className={selected ? classes.selected : undefined}
          >
            <DieIcon type={dieType} />
          </IconButton>
        );
      })}
    </Div>
  );
};

const useStyles = makeStyles<Theme, { type: ThrowType }>((theme) => ({
  selected: {
    backgroundColor: ({ type }) =>
      type === 'regular'
        ? theme.palette.primary.main
        : theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: ({ type }) =>
        type === 'regular'
          ? theme.palette.primary.dark
          : theme.palette.secondary.dark,
    },
  },
}));
