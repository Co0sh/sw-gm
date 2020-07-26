import React, { FC } from 'react';
import { SvgIcon, makeStyles, Theme } from '@material-ui/core';
import { AttributeName } from '../logic/character';
import { cn } from '../logic/cn';
import { AttributeIcons } from '../logic/attributeIcons';

export interface AttributeIconProps {
  type: AttributeName;
  color?: 'primary' | 'secondary';
  size?: number;
  className?: string;
}

export const AttributeIcon: FC<AttributeIconProps> = ({
  type,
  color,
  size = 2,
  className,
}) => {
  const classes = useStyles({ size });

  return (
    <SvgIcon
      className={cn(classes.root, className)}
      component={AttributeIcons[type]}
      viewBox="0 0 100 100"
      color={color}
    />
  );
};

const useStyles = makeStyles<Theme, Pick<AttributeIconProps, 'size'>>(
  (theme) => ({
    root: {
      width: ({ size }) => `${size}rem`,
      height: ({ size }) => `${size}rem`,
      opacity: 0.9,
    },
  }),
);
