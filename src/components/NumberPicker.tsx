import React, { FC, useState } from 'react';
import { Box, IconButton, Typography, makeStyles } from '@material-ui/core';
import PlusIcon from '@material-ui/icons/Add';
import MinusIcon from '@material-ui/icons/Remove';

export interface NumberPickerProps {
  title?: string;
  initialNumber?: number;
  number?: number;
  setNumber?: (number: number) => void;
  min?: number;
  max?: number;
  className?: string;
}

export const NumberPicker: FC<NumberPickerProps> = ({
  title,
  initialNumber = 0,
  number: propNumber,
  setNumber = () => {},
  min = -20,
  max = 20,
  className,
}) => {
  const classes = useStyles();
  const [stateNumber, setStateNumber] = useState(propNumber ?? initialNumber);
  const number = propNumber ?? stateNumber;
  const handleNumber = (number: number) => {
    setNumber(number);
    setStateNumber(number);
  };

  const isFirst = number === min;
  const isLast = number === max;

  return (
    <Box
      display="flex"
      flexDirection="column"
      position="relative"
      pt={0.5}
      className={className}
    >
      {title && (
        <Typography variant="caption" className={classes.title}>
          {title}
        </Typography>
      )}
      <Box display="flex" flexGrow={1} alignItems="center">
        <IconButton
          size="small"
          disabled={isFirst}
          onClick={() => handleNumber(number - 1)}
        >
          <MinusIcon />
        </IconButton>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          width={32}
        >
          <Typography variant="h5" component="span">
            {number}
          </Typography>
        </Box>
        <IconButton
          size="small"
          disabled={isLast}
          onClick={() => handleNumber(number + 1)}
        >
          <PlusIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  title: {
    position: 'absolute',
    top: -theme.spacing(0.5),
    opacity: 0.5,
  },
}));
