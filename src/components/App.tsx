import React, { useState, FC } from 'react';
import { Button, CssBaseline, Box } from '@material-ui/core';
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
    <Box minHeight="100vh" display="flex" justifyContent="center">
      <CssBaseline />
      <Box
        display="flex"
        flexDirection="column"
        maxWidth={400}
        width="100%"
        p={2}
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="flex-end"
          flexGrow={1}
        >
          {result && <DiceRollResults results={result} />}
        </Box>
        <Box display="flex" flexDirection="column" pb={2}>
          <RollConfigurator value={options} setValue={setOptions} />
        </Box>
        <Button size="large" variant="contained" onClick={handleRoll}>
          Roll
        </Button>
      </Box>
    </Box>
  );
};

export default App;
