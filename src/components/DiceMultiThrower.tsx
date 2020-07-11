import React, { FC, useState } from 'react';
import { Box, Button } from '@material-ui/core';
import {
  MultiThrowOptions,
  MultiThrowResult,
  defaultDiceOptions,
  throwDice,
} from '../logic/rolls';
import { DiceRollResults } from './DiceRollResults';
import { MultiThrowConfigurator } from './MultiThrowConfigurator';

interface DiceRollerProps {
  initialOptions?: MultiThrowOptions;
  className?: string;
}

const DiceRoller: FC<DiceRollerProps> = ({ initialOptions }) => {
  const [result, setResult] = useState<MultiThrowResult | null>(null);
  const [options, setOptions] = useState(initialOptions ?? defaultDiceOptions);

  const handleRoll = () => {
    setResult(throwDice(options));
  };

  return (
    <Box display="flex" flexDirection="column">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
        flexGrow={1}
        pb={2}
      >
        {result && <DiceRollResults results={result} />}
      </Box>
      <Box display="flex" flexDirection="column" pb={2}>
        <MultiThrowConfigurator value={options} setValue={setOptions} />
      </Box>
      <Button
        color="primary"
        size="large"
        variant="contained"
        onClick={handleRoll}
      >
        Roll
      </Button>
    </Box>
  );
};

export default DiceRoller;
