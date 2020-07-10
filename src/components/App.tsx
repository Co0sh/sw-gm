import React, { FC } from 'react';
import { CssBaseline, Box } from '@material-ui/core';
import DiceRoller from './DiceRoller';

const App: FC = () => {
  return (
    <Box minHeight="100vh" display="flex" justifyContent="center">
      <CssBaseline />
      <Box
        display="flex"
        flexDirection="column"
        maxWidth={400}
        width="100%"
        p={2}
        justifyContent="flex-end"
      >
        <DiceRoller />
      </Box>
    </Box>
  );
};

export default App;
