import React, { Dispatch, FC, memo, useCallback } from 'react';
import { Paper, makeStyles, IconButton, Theme } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import { Die, DIE_TYPES } from '../model/die.model';
import DiePicker from './DiePicker';
import NumberPicker from './NumberPicker';
import { Div } from './Div';
import { cn } from '../logic/cn';
import { ThrowOptions, ThrowOptionsKey } from '../model/throwOptions.model';
import { UniqueDie } from '../model/uniqueDie.model';
import { ThrowType } from '../model/throwType.model';
import { MultiThrowAction } from '../logic/multiThrowReducer';

export interface ThrowConfiguratorProps {
  value: ThrowOptions;
  onChange: Dispatch<MultiThrowAction>;
  maxRolls?: number;
  hasTarget?: boolean;
  hasModifier?: boolean;
}

const ThrowConfigurator: FC<ThrowConfiguratorProps> = ({
  value,
  onChange,
  maxRolls,
  hasTarget = true,
  hasModifier = true,
}) => {
  const { dice, type: throwType, modifier, target, key: throwKey } = value;
  const classes = useStyles({ throwType });

  const addThrow = useCallback(
    (die: Die) => {
      onChange({ type: 'addThrow', die, throwType });
    },
    [onChange, throwType],
  );
  const addDie = useCallback(
    (die: Die) => {
      onChange({ type: 'addDie', die, throwKey });
    },
    [onChange, throwKey],
  );
  const clearAll = useCallback(() => {
    onChange({ type: 'removeThrow', key: throwKey });
  }, [onChange, throwKey]);
  const setTarget = useCallback(
    (target: number) => {
      onChange({ type: 'setThrowTarget', target, throwKey });
    },
    [onChange, throwKey],
  );
  const setModifier = useCallback(
    (modifier: number) => {
      onChange({ type: 'setThrowModifier', modifier, throwKey });
    },
    [onChange, throwKey],
  );

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
              onChange={dice.length ? addDie : addThrow}
              type={throwType}
              className={cn(classes.newDie, classes.paddingRight)}
              enabledDice={throwType === 'wild' ? [6, 10] : DIE_TYPES}
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
          <RollConfigurator
            key={String(die.key)}
            die={die}
            onChange={onChange}
            throwKey={throwKey}
            throwType={throwType}
          />
        ))}
      </Div>
      <Div row align="center">
        <Div row justify="space-evenly" grows>
          {hasTarget && (
            <NumberPicker
              title="Target"
              value={target}
              onChange={setTarget}
              min={0}
              max={99}
            />
          )}
          {hasModifier && (
            <NumberPicker
              title="Modifier"
              value={modifier}
              onChange={setModifier}
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

interface RollConfiguratorProps {
  die: UniqueDie;
  throwKey: ThrowOptionsKey;
  throwType: ThrowType;
  onChange: Dispatch<MultiThrowAction>;
}

const RollConfigurator: FC<RollConfiguratorProps> = memo(
  ({ die, throwKey, throwType, onChange }) => {
    const classes = useStyles({ throwType });
    const { sides, key: dieKey } = die;

    const changeDie = useCallback(
      (die: Die) => {
        onChange({ type: 'changeDie', die, dieKey, throwKey });
      },
      [dieKey, onChange, throwKey],
    );
    const removeDie = useCallback(() => {
      onChange({ type: 'removeDie', dieKey, throwKey });
    }, [dieKey, onChange, throwKey]);

    return (
      <Div row justify="space-between" align="center">
        <DiePicker
          value={sides}
          onChange={changeDie}
          type={throwType}
          className={classes.paddingRight}
          enabledDice={throwType === 'wild' ? [6, 10] : DIE_TYPES}
        />
        <IconButton size="small" onClick={removeDie} aria-label="Close">
          <CloseIcon />
        </IconButton>
      </Div>
    );
  },
);

const useStyles = makeStyles<Theme, { throwType: ThrowType }>((theme) => ({
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
    borderLeftColor: ({ throwType }) =>
      throwType === 'regular'
        ? theme.palette.primary.main
        : theme.palette.secondary.main,
    borderRightWidth: 4,
    borderRightStyle: 'solid',
    borderRightColor: ({ throwType }) =>
      throwType === 'regular'
        ? theme.palette.primary.main
        : theme.palette.secondary.main,
  },
}));

export default memo(ThrowConfigurator);
