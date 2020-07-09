import React, { FC } from 'react';
import { DiceThrowResult, suggestRolls } from '../logic/rolls';
import { Box, Typography } from '@material-ui/core';
import { Rolls } from './Rolls';

interface DiceRollResultsProps {
  results: DiceThrowResult;
}

const DiceRollResults: FC<DiceRollResultsProps> = ({ results }) => {
  return (
    <Box>
      <Box display="flex">
        <Rolls title="Rolls" rolls={results.mainRolls} />
        {results.wildRoll && (
          <>
            <Rolls title="Wild Roll" rolls={[results.wildRoll]} />
            <Rolls
              title="Suggested Final Rolls"
              rolls={suggestRolls(results.mainRolls, results.wildRoll)}
            />
          </>
        )}
      </Box>
      {results.isCriticalFail && (
        <Typography variant="h5">Critical fail!</Typography>
      )}
    </Box>
  );
};

export default DiceRollResults;
