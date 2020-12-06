import React, { FC, memo } from 'react';
import { IconButton, Typography, makeStyles } from '@material-ui/core';
import PlusIcon from '@material-ui/icons/Add';
import MinusIcon from '@material-ui/icons/Remove';
import { Div } from './Div';
import { cn } from '../logic/cn';

export interface NumberPickerProps {
  title?: string;
  value?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  className?: string;
}

const NumberPicker: FC<NumberPickerProps> = ({
  title,
  value: number = 0,
  onChange = () => {},
  min = -20,
  max = 20,
  className,
}) => {
  const classes = useStyles();
  const handleNumber = (number: number) => {
    onChange(number);
  };

  const isFirst = number === min;
  const isLast = number === max;

  return (
    <Div align="center" pt={0.5} className={cn(classes.root, className)}>
      {title && (
        <Typography variant="caption" className={classes.title}>
          {title}
        </Typography>
      )}
      <Div row grows align="center">
        <IconButton
          size="small"
          disabled={isFirst}
          onClick={() => handleNumber(number - 1)}
          aria-label="Decrease"
        >
          <MinusIcon />
        </IconButton>
        <Div justify="center" align="center" className={classes.width32}>
          <Typography variant="h5" component="span">
            {number}
          </Typography>
        </Div>
        <IconButton
          size="small"
          disabled={isLast}
          onClick={() => handleNumber(number + 1)}
          aria-label="Increase"
        >
          <PlusIcon />
        </IconButton>
      </Div>
    </Div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(0.5),
    position: 'relative',
  },
  title: {
    position: 'absolute',
    top: -theme.spacing(1),
    opacity: 0.8,
  },
  width32: {
    width: 32,
  },
}));

export default memo(NumberPicker);
