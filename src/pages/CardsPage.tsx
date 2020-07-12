import React, { FC } from 'react';
import { RouteProps } from 'react-router';
import { makeStyles } from '@material-ui/core';
import { Encounter } from '../components/Encounter';
import { Div } from '../components/Div';

export const CardsPage: FC<RouteProps> = () => {
  const classes = useStyles();

  return (
    <Div align="center" justify="flex-end" grows>
      <Encounter className={classes.root} />
    </Div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400,
    width: '100%',
    padding: theme.spacing(2),
  },
}));
