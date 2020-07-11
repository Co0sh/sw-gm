import React, { FC } from 'react';
import { CssBaseline, Box } from '@material-ui/core';
import { DiceMultiThrower } from './DiceMultiThrower';

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
        <DiceMultiThrower />
      </Box>
    </Box>
  );
};

export default App;
