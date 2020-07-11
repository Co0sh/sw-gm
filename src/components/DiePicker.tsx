import React, { FC, useState } from 'react';
import { Box, IconButton, SvgIcon, makeStyles, Theme } from '@material-ui/core';
import { Die } from '../logic/die';
import { DiceIcons } from '../logic/diceIcons';
import { ThrowType } from '../logic/rolls';

export interface DiePickerProps {
  initialDie?: Die | null;
  die?: Die | null;
  setDie?: (die: Die) => void;
  type?: ThrowType;
  disabled?: boolean;
  className?: string;
}

export const DiePicker: FC<DiePickerProps> = ({
  initialDie,
  die: propDie,
  setDie,
  type = 'regular',
  disabled = false,
  className,
}) => {
  const classes = useStyles({ type });
  const [stateDie, setStateDie] = useState(propDie ?? initialDie ?? null);
  const die = propDie !== undefined ? propDie : stateDie;
  const handleDie = (die: Die) => {
    setDie?.(die);
    setStateDie(die);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      flexGrow={1}
      justifyContent="space-between"
      className={className}
    >
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
            <SvgIcon
              className={classes.icon}
              component={DiceIcons[dieType]}
              viewBox="0 0 100 100"
            />
          </IconButton>
        );
      })}
    </Box>
  );
};

const useStyles = makeStyles<Theme, { type: ThrowType }>((theme) => ({
  icon: {
    width: '1.35em',
    height: '1.35em',
  },
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
