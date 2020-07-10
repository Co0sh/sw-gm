import React, { FC, useState } from 'react';
import { DiceOptions, defaultDiceOptions } from '../logic/rolls';
import { Die } from '../logic/die';
import {
  FormGroup,
  FormControlLabel,
  Switch,
  Box,
  Button,
} from '@material-ui/core';
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
  const [stateValue, setStateValue] = useState(value ?? initialValue);
  const options = value ?? stateValue;
  const { dice, acing, canFail, wildDie } = options;

  const handleChange = (partialOptions: Partial<DiceOptions>) => {
    const updatedOptions = { ...options, ...partialOptions };
    setValue?.(updatedOptions);
    setStateValue(updatedOptions);
  };

  const addDie = () => {
    const lastDie = dice[dice.length - 1];
    handleChange({ dice: [...dice, lastDie] });
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
        <Box display="flex">
          <DiePicker
            key={index}
            title="Die Type"
            die={die}
            setDie={(newDie) => changeDie(index, newDie)}
          />
          <Button onClick={() => removeDie(index)}>Remove</Button>
        </Box>
      ))}
      <Button onClick={addDie}>Add die</Button>

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
            checked={wildDie !== null}
            onChange={(e) => setWildDie(e.target.checked)}
          />
        }
        label="Wild Die"
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
      {wildDie !== null && (
        <DiePicker
          title="Wild Die Type"
          die={wildDie}
          setDie={(newDie) => handleChange({ wildDie: newDie })}
        />
      )}
    </FormGroup>
  );
};
