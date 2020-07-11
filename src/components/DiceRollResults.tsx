import React, { FC } from 'react';
import { MultiThrowResult } from '../logic/rolls';
import { Box, Typography, Paper, makeStyles } from '@material-ui/core';
import { Rolls } from './Rolls';

export interface DiceRollResultsProps {
  results: MultiThrowResult;
}

export const DiceRollResults: FC<DiceRollResultsProps> = ({ results }) => {
  const classes = useStyles();
  return (
    <Box display="flex" flexDirection="column" className={classes.root}>
      {results.isCriticalFail && (
        <Typography variant="h4" color="error" align="center">
          CRITICAL FAILURE
        </Typography>
      )}
      {results.throwResults.map((throwResult, index) => (
        <Paper key={throwResult.key}>
          <Rolls
            rolls={throwResult.multiRolls}
            type={throwResult.type}
            className={
              throwResult.isAdditional ? classes.translucent : undefined
            }
          />
        </Paper>
      ))}
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    '& > :not(:last-child)': {
      marginBottom: theme.spacing(1),
    },
  },
  translucent: {
    opacity: 1 / 3,
  },
}));
