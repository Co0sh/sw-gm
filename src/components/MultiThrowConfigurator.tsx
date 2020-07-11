import React, { FC, useState } from 'react';
import {
  MultiThrowOptions,
  defaultDiceOptions,
  ThrowOptions,
  defaultModifier,
  defaultTarget,
} from '../logic/rolls';
import { Box, makeStyles } from '@material-ui/core';
import { ThrowConfigurator } from './ThrowConfigurator';
import { NumberPicker } from './NumberPicker';
import { getKey } from '../logic/key';
import { FlagSwitch } from './FlagSwitch';

export interface RollConfiguratorProps {
  initialValue?: MultiThrowOptions;
  value?: MultiThrowOptions;
  onChange?: (value: MultiThrowOptions) => void;
}

export const MultiThrowConfigurator: FC<RollConfiguratorProps> = ({
  initialValue = defaultDiceOptions,
  value: propValue,
  onChange,
}) => {
  const classes = useStyles();
  const [stateValue, setStateValue] = useState(propValue ?? initialValue);
  const value = propValue ?? stateValue;
  const { throws, acing, canFail, globalModifier, globalTarget } = value;

  const handleChange = (partialOptions: Partial<MultiThrowOptions>) => {
    const updatedOptions = { ...value, ...partialOptions };
    onChange?.(updatedOptions);
    setStateValue(updatedOptions);
  };

  const addThrow = (throwOptions: ThrowOptions) => {
    handleChange({ throws: [{ ...throwOptions, key: getKey() }, ...throws] });
  };

  const modifyThrow = (index: number) => (throwOptions: ThrowOptions) => {
    const throwsCopy = [...throws];
    if (throwOptions.dice.length) {
      throwsCopy.splice(index, 1, throwOptions);
    } else {
      throwsCopy.splice(index, 1);
    }
    handleChange({ throws: throwsCopy });
  };

  const modifyWildThrow = (throwOptions: ThrowOptions) => {
    const currentIndex = throws.findIndex((t) => t.type !== 'regular');
    const shouldAdd = throwOptions.dice.length > 0;
    const exists = currentIndex >= 0;

    if (exists) {
      modifyThrow(currentIndex)(throwOptions);
    } else if (shouldAdd) {
      addThrow(throwOptions);
    }
  };

  const regularThrows = throws.filter((t) => t.type === 'regular');
  const emptyRegularThrow: ThrowOptions = {
    key: getKey(),
    dice: [],
    modifier: defaultModifier,
    target: defaultTarget,
    type: 'regular',
  };

  const wildThrow = throws.find((t) => t.type !== 'regular');
  const emptyWildThrow: ThrowOptions = {
    key: getKey(),
    dice: [],
    modifier: defaultModifier,
    target: defaultTarget,
    type: 'wild',
  };

  const isGlobalTargetUsed = throws.every((t) => t.target === globalTarget);
  const isGlobalModifierUsed = throws.every(
    (t) => t.modifier === globalModifier,
  );

  const handleGlobalTarget = (target: number) => {
    handleChange({
      throws: throws.map((t) => ({ ...t, target })),
      globalTarget: target,
    });
  };

  const handleGlobalModifier = (modifier: number) => {
    handleChange({
      throws: throws.map((t) => ({ ...t, modifier })),
      globalModifier: modifier,
    });
  };

  return (
    <Box display="flex" flexDirection="column">
      <Box pb={2} className={classes.spacing}>
        <ThrowConfigurator
          value={emptyRegularThrow}
          onChange={addThrow}
          hasModifier={false}
          hasTarget={false}
        />

        {regularThrows.map((aThrow, index) => {
          return (
            <ThrowConfigurator
              key={aThrow.key}
              value={aThrow}
              onChange={modifyThrow(index)}
            />
          );
        })}

        <ThrowConfigurator
          value={wildThrow ?? emptyWildThrow}
          onChange={modifyWildThrow}
          maxRolls={1}
          hasTarget={Boolean(wildThrow)}
          hasModifier={Boolean(wildThrow)}
        />
      </Box>

      <Box display="flex" justifyContent="space-evenly">
        <NumberPicker
          title="Target"
          value={globalTarget}
          onChange={handleGlobalTarget}
          className={isGlobalTargetUsed ? undefined : classes.translucent}
        />
        <NumberPicker
          title="Modifier"
          value={globalModifier}
          onChange={handleGlobalModifier}
          className={isGlobalModifierUsed ? undefined : classes.translucent}
        />
        <FlagSwitch
          title="Acing"
          value={acing}
          onChange={(acing) => handleChange({ acing })}
        />
        <FlagSwitch
          title="Can Fail"
          value={canFail}
          onChange={(canFail) => handleChange({ canFail })}
        />
      </Box>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  spacing: {
    '& > :not(:last-child)': {
      marginBottom: theme.spacing(1),
    },
  },
  translucent: {
    opacity: 0.5,
  },
}));
