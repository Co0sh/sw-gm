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
    handleChange({ dice: [...dice, dieToAdd] });
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

  const setWildDie = (wildDieEnabled: boolean) => {
    if (wildDieEnabled) {
      const defaultWildDie: Die = wildDie ?? defaultDiceOptions.wildDie ?? 6;
      handleChange({ wildDie: defaultWildDie });
    } else {
      handleChange({ wildDie: null });
    }
  };

  return (
    <FormGroup>
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
          <IconButton onClick={() => removeDie(index)}>
            <Close />
          </IconButton>
        </Box>
      ))}
      <DiePicker
        key={dice.length}
        setDie={(newDie) => addDie(newDie)}
        className={classes.translucent}
      />

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
      <FormControlLabel
        control={
          <Switch
            checked={wildDie !== null}
            onChange={(e) => setWildDie(e.target.checked)}
          />
        }
        label="Wild Die"
      />
      <DiePicker
        die={wildDie ?? undefined}
        disabled={wildDie === null}
        type="wild"
        setDie={(newDie) => handleChange({ wildDie: newDie })}
      />
    </FormGroup>
  );
};

const useStyles = makeStyles({
  translucent: {
    opacity: 1 / 3,
  },
});
