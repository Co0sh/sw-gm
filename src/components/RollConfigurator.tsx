import React, { FC, useState } from 'react';
import { DiceOptions, defaultDiceOptions } from '../logic/rolls';
import { Die } from '../logic/die';
import {
  FormGroup,
  FormControlLabel,
  Switch,
  Box,
  IconButton,
  makeStyles,
} from '@material-ui/core';
import Close from '@material-ui/icons/Close';
import { DiePicker } from './DiePicker';

export interface RollConfiguratorProps {
  initialValue?: DiceOptions;
  value?: DiceOptions;
  setValue?: (options: DiceOptions) => void;
}

export const RollConfigurator: FC<RollConfiguratorProps> = ({
  initialValue = defaultDiceOptions,
  value,
  setValue,
}) => {
  const classes = useStyles();
  const [stateValue, setStateValue] = useState(value ?? initialValue);
  const options = value ?? stateValue;
  const { dice, acing, canFail, wildDie } = options;

  const handleChange = (partialOptions: Partial<DiceOptions>) => {
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
    <Box display="flex" flexDirection="column">
      <DiePicker
        key={dice.length}
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
          />
          <IconButton
            disabled={dice.length < 2}
            onClick={() => removeDie(index)}
          >
            <Close />
          </IconButton>
        </Box>
      ))}
      <Box display="flex" alignItems="center">
        <Box flexGrow={1}>
          <DiePicker
            die={wildDie}
            type="wild"
            setDie={(newDie) => handleChange({ wildDie: newDie })}
            className={wildDie === null ? classes.translucent : undefined}
          />
        </Box>
        <IconButton
          disabled={wildDie === null}
          onClick={() => handleChange({ wildDie: null })}
        >
          <Close />
        </IconButton>
      </Box>

      <FormGroup row>
        <FormControlLabel
          control={
            <Switch
              checked={acing}
              onChange={(e) => handleChange({ acing: e.target.checked })}
            />
          }
          label="Ace"
        />
        <FormControlLabel
          control={
            <Switch
              checked={canFail}
              onChange={(e) => handleChange({ canFail: e.target.checked })}
            />
          }
          label="Can Fail"
        />
      </FormGroup>
    </Box>
  );
};

const useStyles = makeStyles({
  translucent: {
    opacity: 1 / 3,
  },
});
