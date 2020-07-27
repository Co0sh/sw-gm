import React, { FC, useState, memo } from 'react';
import { makeStyles } from '@material-ui/core';
import { Die } from '../logic/die';
import { DiceIcons } from '../logic/diceIcons';
import { ThrowType } from '../logic/rolls';
import { Div } from './Div';
import { DieIcon } from './DieIcon';
import { cn } from '../logic/cn';

export interface DiePickerProps {
  initialValue?: Die | null;
  value?: Die | null;
  onChange?: (value: Die) => void;
  type?: ThrowType;
  disabled?: boolean;
  className?: string;
}

const DiePicker: FC<DiePickerProps> = ({
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
          <button
            key={dieType}
            onClick={() => handleDie(dieType)}
            disabled={disabled}
            className={cn(
              classes.iconButton,
              selected &&
                (type === 'regular'
                  ? classes.selectedRegular
                  : classes.selectedWild),
            )}
          >
            <DieIcon type={dieType} size="small" />
          </button>
        );
      })}
    </Div>
  );
};

const MemoDiePicker = memo(DiePicker) as typeof DiePicker;
export { MemoDiePicker as DiePicker };

const useStyles = makeStyles((theme) => ({
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: '50%',
    border: 'none',
    backgroundColor: 'transparent',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    outline: 'none',
    cursor: 'pointer',
    userSelect: 'none',
    WebkitTapHighlightColor: 'transparent',
    transition: theme.transitions.create('background-color'),
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
  selectedRegular: {
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  selectedWild: {
    backgroundColor: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: theme.palette.secondary.dark,
    },
  },
}));
