import React, { FC, useState } from 'react';
import { Paper, makeStyles, IconButton, Theme } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  ThrowOptions,
  defaultRegularThrow,
  ThrowType,
  defaultRegularDie,
  UniqueDieKey,
} from '../logic/rolls';
import { Die } from '../logic/die';
import { DiePicker } from './DiePicker';
import { NumberPicker } from './NumberPicker';
import { getKey } from '../logic/key';
import { Div } from './Div';
import { cn } from '../logic/cn';

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

  const removeDie = (key: UniqueDieKey) => {
    const diceCopy = [...dice];
    const index = diceCopy.findIndex((d) => d.key === key);
    diceCopy.splice(index, 1);
    handleChange({ dice: diceCopy });
  };

  const changeDie = (key: UniqueDieKey, die: Die) => {
    const diceCopy = [...dice];
    const index = diceCopy.findIndex((d) => d.key === key);
    diceCopy.splice(index, 1, { key, sides: die });
    handleChange({ dice: diceCopy });
  };

  const clearAll = () => {
    handleChange({ dice: [] });
  };

  return (
    <Div
      component={Paper}
      spacing
      className={[classes.root, classes.border].join(' ')}
    >
      <Div justify="flex-end" spacing>
        {(maxRolls === undefined || dice.length < maxRolls) && (
          <Div row justify="space-between" align="center">
            <DiePicker
              value={null}
              onChange={(newDie) => addDie(newDie)}
              className={cn(classes.newDie, classes.paddingRight)}
            />
            <IconButton
              size="small"
              disabled
              className={classes.invisible}
              aria-label="Close"
            >
              <CloseIcon />
            </IconButton>
          </Div>
        )}
        {dice.map((die) => (
          <Div key={String(die.key)} row justify="space-between" align="center">
            <DiePicker
              value={die.sides}
              onChange={(newDie) => changeDie(die.key, newDie)}
              type={type}
              className={classes.paddingRight}
            />
            <IconButton
              size="small"
              onClick={() => removeDie(die.key)}
              aria-label="Close"
            >
              <CloseIcon />
            </IconButton>
          </Div>
        ))}
      </Div>
      <Div row align="center">
        <Div row justify="space-evenly" grows>
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
        </Div>
        {dice.length > 0 && (
          <IconButton size="small" onClick={clearAll} aria-label="Clear">
            <DeleteIcon />
          </IconButton>
        )}
      </Div>
    </Div>
  );
};

const useStyles = makeStyles<Theme, { type: ThrowType }>((theme) => ({
  invisible: {
    opacity: 0,
  },
  newDie: {
    opacity: 1 / 3,
  },
  root: {
    padding: theme.spacing(1),
    paddingBottom: 0,
  },
  paddingRight: {
    paddingRight: theme.spacing(3),
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
}));
