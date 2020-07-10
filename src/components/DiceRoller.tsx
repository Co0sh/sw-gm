import React, { FC, useState } from 'react';
import { Box, Button } from '@material-ui/core';
import {
  DiceOptions,
  DiceThrowResult,
  defaultDiceOptions,
  throwDice,
} from '../logic/rolls';
import { DiceRollResults } from './DiceRollResults';
import { RollConfigurator } from './RollConfigurator';

interface DiceRollerProps {
  initialOptions?: DiceOptions;
  className?: string;
}

const DiceRoller: FC<DiceRollerProps> = ({ initialOptions }) => {
  const [result, setResult] = useState<DiceThrowResult | null>(null);
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
      >
        {result && <DiceRollResults results={result} />}
      </Box>
      <Box display="flex" flexDirection="column" pb={2}>
        <RollConfigurator value={options} setValue={setOptions} />
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
