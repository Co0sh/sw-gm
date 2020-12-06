import React, { FC, useState } from 'react';
import {
  MultiThrowOptions,
  defaultDiceOptions,
  ThrowOptions,
  defaultThrowName,
  defaultWildThrowName,
  ThrowOptionsKey,
} from '../logic/rolls';
import { makeStyles } from '@material-ui/core';
import { ThrowConfigurator } from './ThrowConfigurator';
import { NumberPicker } from './NumberPicker';
import { getKey } from '../logic/key';
import { FlagSwitch } from './FlagSwitch';
import { Div } from './Div';

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

  const regularThrows = throws.filter((t) => t.type === 'regular');
  const emptyRegularThrow: ThrowOptions = {
    key: getKey(),
    name: defaultThrowName,
    dice: [],
    modifier: globalModifier,
    target: globalTarget,
    type: 'regular',
  };

  const wildThrow = throws.find((t) => t.type !== 'regular');
  const emptyWildThrow: ThrowOptions = {
    key: getKey(),
    name: defaultWildThrowName,
    dice: [],
    modifier: globalModifier,
    target: globalTarget,
    type: 'wild',
  };

  const handleChange = (partialOptions: Partial<MultiThrowOptions>) => {
    const updatedOptions = { ...value, ...partialOptions };
    onChange?.(updatedOptions);
    setStateValue(updatedOptions);
  };

  const addThrow = (throwOptions: ThrowOptions) => {
    handleChange({
      throws: [
        {
          ...throwOptions,
          key: getKey(),
          name:
            throwOptions.type === 'wild'
              ? throwOptions.name
              : `${throwOptions.name} ${regularThrows.length + 1}`,
        },
        ...throws,
      ],
    });
  };

  const modifyThrow = (key: ThrowOptionsKey) => (
    throwOptions: ThrowOptions,
  ) => {
    const throwsCopy = [...throws];
    const index = throwsCopy.findIndex((t) => t.key === key);
    if (throwOptions.dice.length) {
      throwsCopy.splice(index, 1, throwOptions);
    } else {
      throwsCopy.splice(index, 1);
    }
    handleChange({ throws: throwsCopy });
  };

  const modifyWildThrow = (throwOptions: ThrowOptions) => {
    const currentWildThrow = throws.find((t) => t.type !== 'regular');
    const shouldAdd = throwOptions.dice.length > 0;

    if (currentWildThrow) {
      modifyThrow(currentWildThrow.key)(throwOptions);
    } else if (shouldAdd) {
      addThrow(throwOptions);
    }
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
    <Div>
      <Div spacing className={classes.spacing}>
        <ThrowConfigurator
          value={emptyRegularThrow}
          onChange={addThrow}
          hasModifier={false}
          hasTarget={false}
        />

        {regularThrows.map((aThrow, index) => {
          return (
            <ThrowConfigurator
              key={String(aThrow.key)}
              value={aThrow}
              onChange={modifyThrow(aThrow.key)}
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
      </Div>

      <Div row justify="space-evenly">
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
      </Div>
    </Div>
  );
};

const useStyles = makeStyles((theme) => ({
  spacing: {
    marginBottom: theme.spacing(2),
  },
  translucent: {
    opacity: 0.5,
  },
}));
