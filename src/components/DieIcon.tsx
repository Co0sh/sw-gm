import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core';
import { DiceIcons } from '../logic/diceIcons';
import { Die } from '../logic/die';
import { cn } from '../logic/cn';

export interface DieIconProps {
  type: Die;
  color?: 'primary' | 'secondary' | 'default';
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export const DieIcon: FC<DieIconProps> = ({
  type,
  color = 'default',
  size = 'medium',
  className,
}) => {
  const classes = useStyles();
  const Component = DiceIcons[type];

  return (
    <Component
      className={cn(classes.root, classes[size], classes[color], className)}
    />
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    opacity: 0.9,
  },
  small: {
    width: '2rem',
    height: '2rem',
  },
  medium: {
    width: '2.5rem',
    height: '2.5rem',
  },
  large: {
    width: '3rem',
    height: '3rem',
  },
  primary: {
    fill: theme.palette.primary.main,
  },
  secondary: {
    fill: theme.palette.secondary.main,
  },
  default: {
    fill: theme.palette.text.primary,
  },
}));
