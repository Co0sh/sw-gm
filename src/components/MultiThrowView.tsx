import React, { FC } from 'react';
import { MultiThrowResult } from '../logic/rolls';
import { Typography, Paper, makeStyles } from '@material-ui/core';
import { ThrowView } from './ThrowView';
import { Div } from './Div';

export interface MultiThrowViewProps {
  value: MultiThrowResult;
}

export const MultiThrowView: FC<MultiThrowViewProps> = ({ value }) => {
  const classes = useStyles();
  return (
    <Div className={classes.root}>
      {value.isCriticalFail && (
        <Typography variant="h4" color="error" align="center">
          CRITICAL FAILURE
        </Typography>
      )}
      {value.throwResults.map((throwResult, index) => (
        <Paper key={throwResult.key}>
          <ThrowView value={throwResult} />
        </Paper>
      ))}
    </Div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    '& > :not(:last-child)': {
      marginBottom: theme.spacing(1),
    },
  },
}));
