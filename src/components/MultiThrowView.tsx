import React, { FC } from 'react';
import { MultiThrowResult } from '../logic/rolls';
import { Box, Typography, Paper, makeStyles } from '@material-ui/core';
import { ThrowView } from './ThrowView';

export interface MultiThrowViewProps {
  value: MultiThrowResult;
}

export const MultiThrowView: FC<MultiThrowViewProps> = ({ value }) => {
  const classes = useStyles();
  return (
    <Box display="flex" flexDirection="column" className={classes.root}>
      {value.isCriticalFail && (
        <Typography variant="h4" color="error" align="center">
          CRITICAL FAILURE
        </Typography>
      )}
      {value.throwResults.map((throwResult, index) => (
        <Paper key={throwResult.key}>
          <ThrowView
            value={throwResult}
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
