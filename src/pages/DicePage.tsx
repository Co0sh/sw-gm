import React, { FC, useRef, useState } from 'react';
import { Button, makeStyles } from '@material-ui/core';
import RerollIcon from '@material-ui/icons/Cached';
import BackIcon from '@material-ui/icons/ArrowBack';
import { RouteProps, useLocation } from 'react-router';
import { Div } from '../components/Div';
import DiceMultiThrower, {
  DiceMultiThrowerRef,
} from '../components/DiceMultiThrower';
import { MultiThrowOptions } from '../model/multiThrowOptions.model';
import { MultiThrowResult } from '../model/multiThrowResult.model';
import { MultiThrowView } from '../components/MultiThrowView';
import { defaultDiceOptions, throwDice } from '../logic/rolls';
import { useDiceHistory } from '../logic/DiceHistoryContext';

export interface DicePageState {
  initialConfig?: MultiThrowOptions;
}

const DicePage: FC<RouteProps> = () => {
  const classes = useStyles();
  const { state } = useLocation<DicePageState | undefined>();
  const { initialConfig = defaultDiceOptions } = state ?? {};

  const { recordDiceResult } = useDiceHistory();
  const [rerollCounter, setRerollCounter] = useState(0);
  const [result, setResult] = useState<MultiThrowResult | null>(null);
  const diceRef = useRef<DiceMultiThrowerRef>();

  const handleResult = (result: MultiThrowResult) => {
    setResult(result);
    setRerollCounter((r) => r + 1);
  };

  const reroll = () => {
    setResult(
      recordDiceResult(
        throwDice({
          ...initialConfig,
          ...diceRef.current?.options,
          name: `${initialConfig.name} Reroll ${rerollCounter}`,
        }),
      ),
    );
    setRerollCounter((r) => r + 1);
  };

  const clear = () => {
    setResult(null);
    setRerollCounter(0);
  };

  return (
    <Div justify="flex-end" align="center" grows>
      {result ? (
        <Div spacing className={classes.content}>
          <MultiThrowView value={result} />
          <Div spacing row>
            <Button
              fullWidth
              color="secondary"
              variant="contained"
              onClick={clear}
              startIcon={<BackIcon />}
            >
              Back
            </Button>
            <Button
              fullWidth
              color="primary"
              variant="contained"
              onClick={reroll}
              startIcon={<RerollIcon />}
            >
              Reroll
            </Button>
          </Div>
        </Div>
      ) : (
        <DiceMultiThrower
          initialValue={initialConfig}
          onResult={handleResult}
          optionsRef={diceRef}
          className={classes.content}
        />
      )}
    </Div>
  );
};

const useStyles = makeStyles((theme) => ({
  content: {
    maxWidth: 400,
    width: '100%',
    padding: theme.spacing(2),
  },
}));

export default DicePage;
