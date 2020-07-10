import React, { useState, FC } from 'react';
import { Button, Typography, CssBaseline, Box } from '@material-ui/core';
import { throwDice, DiceThrowResult, defaultDiceOptions } from '../logic/rolls';
import { DiceRollResults } from './DiceRollResults';
import { RollConfigurator } from './RollConfigurator';

const App: FC = () => {
  const [result, setResult] = useState<DiceThrowResult | null>(null);
  const [options, setOptions] = useState(defaultDiceOptions);

  const handleRoll = () => {
    setResult(throwDice(options));
  };

  return (
    <Box
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <CssBaseline />
      <Box display="flex" flexDirection="column" maxWidth={400} width="100%">
        {result ? (
          <DiceRollResults results={result} />
        ) : (
          <Typography>Roll first</Typography>
        )}
        <Button variant="contained" onClick={handleRoll}>
          Roll
        </Button>

        <RollConfigurator value={options} setValue={setOptions} />
      </Box>
    </Box>
  );
};

export default App;
