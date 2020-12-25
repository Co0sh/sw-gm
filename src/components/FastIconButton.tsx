import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core';
import { cn } from '../logic/cn';

export interface FastIconButtonProps {
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'secondary' | 'default';
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  label?: string;
}

export const FastIconButton: FC<FastIconButtonProps> = ({
  children,
  size = 'medium',
  color = 'default',
  disabled = false,
  onClick,
  className,
  label,
}) => {
  const classes = useStyles();
  return (
    <button
      className={cn(
        classes.iconButton,
        classes[color],
        classes[size],
        className
      )}
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
    >
      {children}
    </button>
  );
};

const useStyles = makeStyles((theme) => ({
  iconButton: {
    borderRadius: '50%',
    border: 'none',
    padding: 0,
    color: theme.palette.text.primary,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    outline: 'none',
    userSelect: 'none',
    WebkitTapHighlightColor: 'transparent',
    '&:not(:disabled)': {
      cursor: 'pointer',
    },
    '&:disabled': {
      opacity: 0.3,
    },
  },
  primary: {
    backgroundColor: theme.palette.primary.main,
    '&:hover:not(:disabled)': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  secondary: {
    backgroundColor: theme.palette.secondary.main,
    '&:hover:not(:disabled)': {
      backgroundColor: theme.palette.secondary.dark,
    },
  },
  default: {
    backgroundColor: 'transparent',
    '&:hover:not(:disabled)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
  small: {
    width: 30,
    height: 30,
  },
  medium: {
    width: 40,
    height: 40,
  },
  large: {
    width: 50,
    height: 50,
  },
}));
