import React, { FC } from 'react';
import { DiceThrowResult, RollResult } from '../logic/rolls';
import { Box, Typography } from '@material-ui/core';
import { Rolls } from './Rolls';

interface DiceRollResultsProps {
  results: DiceThrowResult;
}

const DiceRollResults: FC<DiceRollResultsProps> = ({ results }) => {
  return (
    <Box display="flex" flexDirection="column">
      <Rolls
        title="Rolls"
        rolls={
          [...results.mainRolls, results.wildRoll].filter(
            Boolean,
          ) as RollResult[]
        }
        key={results.uuid}
      />
      {results.isCriticalFail && (
        <Typography variant="h5">Critical fail!</Typography>
      )}
    </Box>
  );
};

export default DiceRollResults;
