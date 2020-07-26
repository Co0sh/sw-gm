import React, { FC } from 'react';
import { SvgIcon, makeStyles, Theme } from '@material-ui/core';
import { DiceIcons } from '../logic/diceIcons';
import { Die } from '../logic/die';
import { cn } from '../logic/cn';

export interface DieIconProps {
  type: Die;
  color?: 'primary' | 'secondary';
  size?: number;
  className?: string;
}

export const DieIcon: FC<DieIconProps> = ({
  type,
  color,
  size = 2,
  className,
}) => {
  const classes = useStyles({ size });

  return (
    <SvgIcon
      className={cn(classes.root, className)}
      component={DiceIcons[type]}
      viewBox="0 0 100 100"
      color={color}
    />
  );
};

const useStyles = makeStyles<Theme, Pick<DieIconProps, 'size'>>((theme) => ({
  root: {
    width: ({ size }) => `${size}rem`,
    height: ({ size }) => `${size}rem`,
    opacity: 0.9,
  },
}));
