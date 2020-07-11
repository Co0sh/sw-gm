import React, { FC, useState } from 'react';
import { Paper, makeStyles, Box, IconButton, Theme } from '@material-ui/core';
import Close from '@material-ui/icons/Close';
import {
  ThrowOptions,
  defaultRegularThrow,
  ThrowType,
  defaultRegularDie,
} from '../logic/rolls';
import { Die } from '../logic/die';
import { DiePicker } from './DiePicker';
import { NumberPicker } from './NumberPicker';

export interface ThrowConfiguratorProps {
  initialValue?: ThrowOptions;
  value?: ThrowOptions;
  setValue?: (value: ThrowOptions) => void;
  maxRolls?: number;
  hasTarget?: boolean;
  hasModifier?: boolean;
}

export const ThrowConfigurator: FC<ThrowConfiguratorProps> = ({
  value,
  setValue,
  initialValue = defaultRegularThrow,
  maxRolls,
  hasTarget = true,
  hasModifier = true,
}) => {
  const [stateValue, setStateValue] = useState(value ?? initialValue);
  const options = value ?? stateValue;
  const { dice, type, modifier, target } = options;
  const classes = useStyles({ type });

  const handleChange = (partialOptions: Partial<ThrowOptions>) => {
    const updatedOptions = { ...options, ...partialOptions };
    setValue?.(updatedOptions);
    setStateValue(updatedOptions);
  };

  const addDie = (die?: Die) => {
    const lastDie = dice[dice.length - 1];
    const dieToAdd = die ?? lastDie ?? defaultRegularDie;
    handleChange({ dice: [dieToAdd, ...dice] });
  };

  const removeDie = (index: number) => {
    const diceCopy = [...dice];
    diceCopy.splice(index, 1);
    handleChange({ dice: diceCopy });
  };

  const changeDie = (index: number, die: Die) => {
    const diceCopy = [...dice];
    diceCopy.splice(index, 1, die);
    handleChange({ dice: diceCopy });
  };

  return (
    <Box
      component={Paper}
      p={1}
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
              key={dice.length}
              die={null}
              setDie={(newDie) => addDie(newDie)}
              className={classes.newDie}
            />
            <IconButton size="small" disabled>
              <Close />
            </IconButton>
          </Box>
        )}
        {dice.map((die, index) => (
          <Box
            key={index}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            pr={0.5}
          >
            <DiePicker
              key={index}
              die={die}
              setDie={(newDie) => changeDie(index, newDie)}
              type={type}
            />
            <IconButton size="small" onClick={() => removeDie(index)}>
              <Close />
            </IconButton>
          </Box>
        ))}
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-evenly"
        flexGrow={1}
      >
        {hasTarget && (
          <NumberPicker
            title="Target"
            number={target}
            setNumber={(target) => handleChange({ target })}
            min={0}
            max={99}
          />
        )}
        {hasModifier && (
          <NumberPicker
            title="Modifier"
            number={modifier}
            setNumber={(modifier) => handleChange({ modifier })}
            min={-99}
            max={99}
          />
        )}
      </Box>
    </Box>
  );
};

const useStyles = makeStyles<Theme, { type: ThrowType }>((theme) => ({
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
  },
  spaced: {
    '& > :not(:last-child)': {
      marginBottom: theme.spacing(1),
    },
  },
}));
