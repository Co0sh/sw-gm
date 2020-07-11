import React, { FC, useState } from 'react';
import { Paper, makeStyles, Box, IconButton } from '@material-ui/core';
import Close from '@material-ui/icons/Close';
import { ThrowOptions, defaultRegularThrow } from '../logic/rolls';
import { Die } from '../logic/die';
import { DiePicker } from './DiePicker';

export interface ThrowConfiguratorProps {
  initialValue?: ThrowOptions;
  value?: ThrowOptions;
  setValue?: (value: ThrowOptions) => void;
}

export const ThrowConfigurator: FC<ThrowConfiguratorProps> = ({
  value,
  setValue,
  initialValue = defaultRegularThrow,
}) => {
  const classes = useStyles();
  const [stateValue, setStateValue] = useState(value ?? initialValue);
  const options = value ?? stateValue;
  const { dice, type } = options;

  const handleChange = (partialOptions: Partial<ThrowOptions>) => {
    const updatedOptions = { ...options, ...partialOptions };
    setValue?.(updatedOptions);
    setStateValue(updatedOptions);
  };

  const addDie = (die?: Die) => {
    const lastDie = dice[dice.length - 1];
    const dieToAdd = die ?? lastDie ?? 4;
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
    <Paper>
      <DiePicker
        key={dice.length}
        die={null}
        setDie={(newDie) => addDie(newDie)}
        className={classes.translucent}
      />
      {dice.map((die, index) => (
        <Box
          key={index}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <DiePicker
            key={index}
            die={die}
            setDie={(newDie) => changeDie(index, newDie)}
            type={type}
          />
          <IconButton onClick={() => removeDie(index)}>
            <Close />
          </IconButton>
        </Box>
      ))}
    </Paper>
  );
};

const useStyles = makeStyles({
  translucent: {
    opacity: 1 / 3,
  },
});
