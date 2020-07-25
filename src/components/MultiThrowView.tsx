import React, { FC } from 'react';
import { MultiThrowResult } from '../logic/rolls';
import { Typography, Paper } from '@material-ui/core';
import { ThrowView } from './ThrowView';
import { Div } from './Div';

export interface MultiThrowViewProps {
  value: MultiThrowResult;
  className?: string;
}

export const MultiThrowView: FC<MultiThrowViewProps> = ({
  value,
  className,
}) => {
  return (
    <Div spacing className={className}>
      {value.isCriticalFail && (
        <Typography variant="h4" color="error" align="center">
          CRITICAL FAILURE
        </Typography>
      )}
      <Typography>{value.name}</Typography>
      {value.throwResults.map((throwResult) => (
        <Paper key={throwResult.key}>
          <ThrowView value={throwResult} />
        </Paper>
      ))}
    </Div>
  );
};
