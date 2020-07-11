import React, { FC, useState } from 'react';
import { Box, Button, makeStyles } from '@material-ui/core';
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
import { DiceRollResults } from './DiceRollResults';
import { MultiThrowConfigurator } from './MultiThrowConfigurator';

export interface DiceRollerProps {
  initialOptions?: MultiThrowOptions;
  className?: string;
}

export const DiceMultiThrower: FC<DiceRollerProps> = ({ initialOptions }) => {
  const classes = useStyles();
  const [result, setResult] = useState<MultiThrowResult | null>(null);
  const [options, setOptions] = useState(initialOptions ?? defaultDiceOptions);

  const handleRoll = () => {
    setResult(throwDice(options));
  };

  const clear = () => {
    setResult(null);
  };

  const reset = () => {
    setOptions(initialOptions ?? defaultDiceOptions);
  };

  return (
    <Box display="flex" flexDirection="column">
      {result && (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="flex-start"
          flexGrow={1}
          pb={2}
        >
          {result && <DiceRollResults results={result} />}
        </Box>
      )}
      {!result && (
        <Box display="flex" flexDirection="column" pb={2}>
          <MultiThrowConfigurator value={options} setValue={setOptions} />
        </Box>
      )}
      <Box className={classes.buttonBar}>
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
      </Box>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  buttonBar: {
    display: 'flex',
    flexDirection: 'row',
    '& > :not(:last-child)': {
      marginRight: theme.spacing(2),
    },
  },
}));
