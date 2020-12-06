import React, { Dispatch, FC, memo, useCallback, useMemo } from 'react';
import { defaultThrowName, defaultWildThrowName } from '../logic/rolls';
import { makeStyles } from '@material-ui/core';
import ThrowConfigurator from './ThrowConfigurator';
import NumberPicker from './NumberPicker';
import { getKey } from '../logic/key';
import { FlagSwitch } from './FlagSwitch';
import { Div } from './Div';
import { MultiThrowOptions } from '../model/multiThrowOptions.model';
import { ThrowOptions } from '../model/throwOptions.model';
import { MultiThrowAction } from '../logic/multiThrowReducer';

export interface RollConfiguratorProps {
  value: MultiThrowOptions;
  onChange: Dispatch<MultiThrowAction>;
}

const MultiThrowConfigurator: FC<RollConfiguratorProps> = ({
  value,
  onChange,
}) => {
  const classes = useStyles();
  const { throws, acing, canFail, globalModifier, globalTarget } = value;

  const regularThrows = throws.filter((t) => t.type === 'regular');
  const emptyRegularThrow: ThrowOptions = useMemo(
    () => ({
      key: getKey(),
      name: defaultThrowName,
      dice: [],
      modifier: globalModifier,
      target: globalTarget,
      type: 'regular',
    }),
    [globalModifier, globalTarget],
  );

  const wildThrow = throws.find((t) => t.type !== 'regular');
  const emptyWildThrow: ThrowOptions = useMemo(
    () => ({
      key: getKey(),
      name: defaultWildThrowName,
      dice: [],
      modifier: globalModifier,
      target: globalTarget,
      type: 'wild',
    }),
    [globalModifier, globalTarget],
  );

  const isGlobalTargetUsed = throws.every((t) => t.target === globalTarget);
  const isGlobalModifierUsed = throws.every(
    (t) => t.modifier === globalModifier,
  );

  const handleGlobalTarget = useCallback(
    (globalTarget: number) => {
      onChange({ type: 'setGlobalTarget', globalTarget });
    },
    [onChange],
  );
  const handleGlobalModifier = useCallback(
    (globalModifier: number) => {
      onChange({ type: 'setGlobalModifier', globalModifier });
    },
    [onChange],
  );
  const handleAcing = useCallback(
    (acing: boolean) => {
      onChange({ type: 'setAcing', acing });
    },
    [onChange],
  );
  const handleCanFail = useCallback(
    (canFail: boolean) => {
      onChange({ type: 'setCanFail', canFail });
    },
    [onChange],
  );

  return (
    <Div>
      <Div spacing className={classes.spacing}>
        <ThrowConfigurator
          value={emptyRegularThrow}
          onChange={onChange}
          hasModifier={false}
          hasTarget={false}
        />

        {regularThrows.map((aThrow) => {
          return (
            <ThrowConfigurator
              key={String(aThrow.key)}
              value={aThrow}
              onChange={onChange}
            />
          );
        })}

        <ThrowConfigurator
          value={wildThrow ?? emptyWildThrow}
          onChange={onChange}
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
        <FlagSwitch title="Acing" value={acing} onChange={handleAcing} />
        <FlagSwitch title="Can Fail" value={canFail} onChange={handleCanFail} />
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

export default memo(MultiThrowConfigurator);
