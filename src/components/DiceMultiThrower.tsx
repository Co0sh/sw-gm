import React, {
  Dispatch,
  FC,
  memo,
  MutableRefObject,
  useEffect,
  useReducer,
} from 'react';
import { Button, makeStyles } from '@material-ui/core';
import ResetIcon from '@material-ui/icons/Replay';
import RollIcon from '@material-ui/icons/Check';
import { defaultDiceOptions, throwDice } from '../logic/rolls';
import MultiThrowConfigurator from './MultiThrowConfigurator';
import { Div } from './Div';
import { useDiceHistory } from '../logic/DiceHistoryContext';
import { MultiThrowOptions } from '../model/multiThrowOptions.model';
import { MultiThrowResult } from '../model/multiThrowResult.model';
import {
  MultiThrowAction,
  multiThrowReducer,
} from '../logic/multiThrowReducer';

export interface DiceRollerProps {
  onResult?: (result: MultiThrowResult) => void;
  initialValue?: MultiThrowOptions;
  optionsRef?: MutableRefObject<DiceMultiThrowerRef | undefined>;
  className?: string;
}

export interface DiceMultiThrowerRef {
  options: MultiThrowOptions;
  dispatch: Dispatch<MultiThrowAction>;
}

const DiceMultiThrower: FC<DiceRollerProps> = ({
  onResult,
  initialValue = defaultDiceOptions,
  optionsRef,
  className,
}) => {
  const classes = useStyles();
  const [options, dispatch] = useReducer(multiThrowReducer, initialValue);
  const { recordDiceResult } = useDiceHistory();

  useEffect(() => {
    if (optionsRef) {
      optionsRef.current = { options, dispatch };
    }
  }, [options, optionsRef]);

  const handleRoll = () => {
    const result = recordDiceResult(throwDice(options));
    onResult?.(result);
  };

  const reset = () => {
    dispatch({ type: 'reset', value: initialValue });
  };

  return (
    <Div className={className}>
      <Div className={classes.pb2}>
        <MultiThrowConfigurator value={options} onChange={dispatch} />
      </Div>
      <Div row spacing align="center">
        <Button
          color="secondary"
          size="large"
          variant="contained"
          fullWidth
          onClick={reset}
          startIcon={<ResetIcon />}
        >
          Reset
        </Button>
        <Button
          color="primary"
          size="large"
          variant="contained"
          fullWidth
          onClick={handleRoll}
          startIcon={<RollIcon />}
        >
          Roll
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

export default memo(DiceMultiThrower);
