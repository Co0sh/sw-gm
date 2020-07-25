import React, { FC } from 'react';
import { makeStyles, Button, darken } from '@material-ui/core';

export interface CardPlaceholderProps {
  onClick?: () => void;
}

export const CardPlaceholder: FC<CardPlaceholderProps> = ({ onClick }) => {
  const classes = useStyles();

  return (
    <Button className={classes.root} onClick={onClick}>
      ?
    </Button>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    '&:hover': {
      backgroundColor: darken(theme.palette.background.paper, 0.1),
    },
    height: 40,
    width: 64,
    cursor: 'pointer',
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
