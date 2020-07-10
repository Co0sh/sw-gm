import React, { FC } from 'react';
import { DiceThrowResult, RollResult } from '../logic/rolls';
import { Box, Typography } from '@material-ui/core';
import { Rolls } from './Rolls';

export interface DiceRollResultsProps {
  results: DiceThrowResult;
}

export const DiceRollResults: FC<DiceRollResultsProps> = ({ results }) => {
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
