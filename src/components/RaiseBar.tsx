import React, { FC } from 'react';
import { makeStyles, Box } from '@material-ui/core';

export interface RaiseBarProps {
  value?: number;
  className?: string;
}

export const RaiseBar: FC<RaiseBarProps> = ({ value, className }) => {
  const classes = useStyles();

  if (!value) {
    return null;
  }

  return (
    <Box display="flex" justifyContent="center" className={className}>
      {new Array(value).fill(null).map((_, index) => (
        <div key={index} className={classes.dot} />
      ))}
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  dot: {
    width: theme.spacing(0.5),
    height: theme.spacing(0.5),
    borderRadius: '100%',
    backgroundColor: theme.palette.success.light,

    '&:not(:last-child)': {
      marginRight: theme.spacing(0.25),
    },
  },
}));
