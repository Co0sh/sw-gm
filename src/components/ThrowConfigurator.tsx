import React, { FC, useState } from 'react';
import { Paper, makeStyles, Box, IconButton, Theme } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  ThrowOptions,
  defaultRegularThrow,
  ThrowType,
  defaultRegularDie,
} from '../logic/rolls';
import { Die } from '../logic/die';
import { DiePicker } from './DiePicker';
import { NumberPicker } from './NumberPicker';
import { getKey } from '../logic/key';

export interface ThrowConfiguratorProps {
  initialValue?: ThrowOptions;
  value?: ThrowOptions;
  onChange?: (value: ThrowOptions) => void;
  maxRolls?: number;
  hasTarget?: boolean;
  hasModifier?: boolean;
}

export const ThrowConfigurator: FC<ThrowConfiguratorProps> = ({
  value: propValue,
  onChange,
  initialValue = defaultRegularThrow,
  maxRolls,
  hasTarget = true,
  hasModifier = true,
}) => {
  const [stateValue, setStateValue] = useState(propValue ?? initialValue);
  const value = propValue ?? stateValue;
  const { dice, type, modifier, target } = value;
  const classes = useStyles({ type });

  const handleChange = (partialOptions: Partial<ThrowOptions>) => {
    const updatedOptions = { ...value, ...partialOptions };
    onChange?.(updatedOptions);
    setStateValue(updatedOptions);
  };

  const addDie = (die?: Die) => {
    const dieToAdd = die ?? defaultRegularDie;
    handleChange({ dice: [{ key: getKey(), sides: dieToAdd }, ...dice] });
  };

  const removeDie = (key: string) => {
    const diceCopy = [...dice];
    const index = diceCopy.findIndex((d) => d.key === key);
    diceCopy.splice(index, 1);
    handleChange({ dice: diceCopy });
  };

  const changeDie = (key: string, die: Die) => {
    const diceCopy = [...dice];
    const index = diceCopy.findIndex((d) => d.key === key);
    diceCopy.splice(index, 1, { key, sides: die });
    handleChange({ dice: diceCopy });
  };

  const clearAll = () => {
    handleChange({ dice: [] });
  };

  return (
    <Box
      component={Paper}
      p={1}
      pb={0}
      display="flex"
      flexDirection="column"
      className={[classes.border, classes.spaced].join(' ')}
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="flex-end"
        className={classes.spaced}
      >
        {(maxRolls === undefined || dice.length < maxRolls) && (
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            pr={0.5}
          >
            <DiePicker
              value={null}
              onChange={(newDie) => addDie(newDie)}
              className={classes.newDie}
            />
            <IconButton size="small" disabled className={classes.invisible}>
              <CloseIcon />
            </IconButton>
          </Box>
        )}
        {dice.map((die) => (
          <Box
            key={die.key}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            pr={0.5}
          >
            <DiePicker
              value={die.sides}
              onChange={(newDie) => changeDie(die.key, newDie)}
              type={type}
            />
            <IconButton size="small" onClick={() => removeDie(die.key)}>
              <CloseIcon />
            </IconButton>
          </Box>
        ))}
      </Box>
      <Box display="flex" alignItems="center">
        <Box display="flex" justifyContent="space-evenly" flexGrow={1}>
          {hasTarget && (
            <NumberPicker
              title="Target"
              value={target}
              onChange={(target) => handleChange({ target })}
              min={0}
              max={99}
            />
          )}
          {hasModifier && (
            <NumberPicker
              title="Modifier"
              value={modifier}
              onChange={(modifier) => handleChange({ modifier })}
              min={-99}
              max={99}
            />
          )}
        </Box>
        {dice.length > 0 && (
          <IconButton size="small" onClick={clearAll}>
            <DeleteIcon />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

const useStyles = makeStyles<Theme, { type: ThrowType }>((theme) => ({
  invisible: {
    opacity: 0,
  },
  newDie: {
    opacity: 1 / 3,
  },
  border: {
    borderLeftWidth: 4,
    borderLeftStyle: 'solid',
    borderLeftColor: ({ type }) =>
      type === 'regular'
        ? theme.palette.primary.main
        : theme.palette.secondary.main,
    borderRightWidth: 4,
    borderRightStyle: 'solid',
    borderRightColor: ({ type }) =>
      type === 'regular'
        ? theme.palette.primary.main
        : theme.palette.secondary.main,
  },
  spaced: {
    '& > :not(:last-child)': {
      marginBottom: theme.spacing(1),
    },
  },
}));
