import React, { FC, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { Button, makeStyles, IconButton } from '@material-ui/core';
import ResetIcon from '@material-ui/icons/Replay';
import HistoryIcon from '@material-ui/icons/History';
import RollIcon from '@material-ui/icons/Check';
import RerollIcon from '@material-ui/icons/Cached';
import BackIcon from '@material-ui/icons/ArrowBack';
import { defaultDiceOptions, throwDice } from '../logic/rolls';
import { MultiThrowView } from './MultiThrowView';
import { MultiThrowConfigurator } from './MultiThrowConfigurator';
import { Div } from './Div';
import { useDiceHistory } from '../logic/DiceHistoryContext';
import { MultiThrowOptions } from '../model/multiThrowOptions.model';
import { MultiThrowResult } from '../model/multiThrowResult.model';

export interface DiceRollerProps {
  initialValue?: MultiThrowOptions;
  className?: string;
}

export const DiceMultiThrower: FC<DiceRollerProps> = ({
  initialValue,
  className,
}) => {
  const classes = useStyles();
  const [rerollCounter, setRerollCounter] = useState(0);
  const [result, setResult] = useState<MultiThrowResult | null>(null);
  const [options, setOptions] = useState(initialValue ?? defaultDiceOptions);
  const { recordDiceResult } = useDiceHistory();
  const { url: rawUrl } = useRouteMatch();
  const url = rawUrl === '/' ? '' : rawUrl;

  const handleRoll = () => {
    const newName =
      rerollCounter === 0
        ? options.name
        : `${options.name} Reroll ${rerollCounter}`;
    const result = throwDice({ ...options, name: newName });
    const modifiedResult = recordDiceResult(result);
    setResult(modifiedResult);
    setRerollCounter((previousCounter) => previousCounter + 1);
  };

  const clear = () => {
    setResult(null);
    setRerollCounter(0);
  };

  const reset = () => {
    setOptions(initialValue ?? defaultDiceOptions);
    setRerollCounter(0);
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
      <Div row spacing align="center">
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
        <IconButton
          component={Link}
          to={`${url}/history`}
          size="small"
          aria-label="History"
        >
          <HistoryIcon />
        </IconButton>
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
