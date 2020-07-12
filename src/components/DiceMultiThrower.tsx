import React, { FC, useState } from 'react';
import { Button, makeStyles } from '@material-ui/core';
import ResetIcon from '@material-ui/icons/Restore';
import RollIcon from '@material-ui/icons/Check';
import RerollIcon from '@material-ui/icons/Cached';
import BackIcon from '@material-ui/icons/ArrowBack';
import {
  MultiThrowOptions,
  MultiThrowResult,
  defaultDiceOptions,
  throwDice,
} from '../logic/rolls';
import { MultiThrowView } from './MultiThrowView';
import { MultiThrowConfigurator } from './MultiThrowConfigurator';
import { Div } from './Div';

export interface DiceRollerProps {
  initialValue?: MultiThrowOptions;
  className?: string;
}

export const DiceMultiThrower: FC<DiceRollerProps> = ({
  initialValue,
  className,
}) => {
  const classes = useStyles();
  const [result, setResult] = useState<MultiThrowResult | null>(null);
  const [options, setOptions] = useState(initialValue ?? defaultDiceOptions);

  const handleRoll = () => {
    setResult(throwDice(options));
  };

  const clear = () => {
    setResult(null);
  };

  const reset = () => {
    setOptions(initialValue ?? defaultDiceOptions);
  };

  return (
    <Div className={className}>
      {result && (
        <Div justify="flex-start" grows className={classes.pb2}>
          {result && <MultiThrowView value={result} />}
        </Div>
      )}
      {!result && (
        <Div className={classes.pb2}>
          <MultiThrowConfigurator value={options} onChange={setOptions} />
        </Div>
      )}
      <Div row spacing>
        <Button
          color="secondary"
          size="large"
          variant="contained"
          fullWidth
          onClick={!result ? reset : clear}
          startIcon={!result ? <ResetIcon /> : <BackIcon />}
        >
          {!result ? 'Reset' : 'Back'}
        </Button>
        <Button
          color="primary"
          size="large"
          variant="contained"
          fullWidth
          onClick={handleRoll}
          startIcon={!result ? <RollIcon /> : <RerollIcon />}
        >
          {!result ? 'Roll' : 'Reroll'}
        </Button>
      </Div>
    </Div>
  );
};

const useStyles = makeStyles((theme) => ({
  pb2: {
    paddingBottom: theme.spacing(2),
  },
}));
