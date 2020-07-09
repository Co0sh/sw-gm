import React, { FC } from 'react';
import { Box, IconButton, Typography, Chip } from '@material-ui/core';
import PlusIcon from '@material-ui/icons/Add';
import MinusIcon from '@material-ui/icons/Remove';

export interface NumberPickerProps {
  title?: string;
  number: number;
  setNumber: (number: number) => void;
  min?: number;
  max?: number;
}

export const NumberPicker: FC<NumberPickerProps> = ({
  title,
  number,
  setNumber,
  min = -20,
  max = 20,
}) => {
  const isFirst = number === min;
  const isLast = number === max;

  return (
    <Box display="flex" alignItems="center">
      <Box display="flex" flexGrow={1}>
        {title && <Chip label={title} />}
      </Box>
      <IconButton
        size="small"
        disabled={isFirst}
        onClick={() => setNumber(number - 1)}
      >
        <MinusIcon />
      </IconButton>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        width={40}
      >
        <Typography variant="h5" component="span">
          {number}
        </Typography>
      </Box>
      <IconButton
        size="small"
        disabled={isLast}
        onClick={() => setNumber(number + 1)}
      >
        <PlusIcon />
      </IconButton>
    </Box>
  );
};
