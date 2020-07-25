import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core';
import { RouteProps } from 'react-router';
import { Div } from '../components/Div';
import { DiceHistory } from '../components/DiceHistory';

export const DiceHistoryPage: FC<RouteProps> = () => {
  const classes = useStyles();

  return (
    <Div justify="flex-end" align="center" grows>
      <DiceHistory className={classes.content} />
    </Div>
  );
};

const useStyles = makeStyles((theme) => ({
  content: {
    maxWidth: 400,
    width: '100%',
    padding: theme.spacing(2),
  },
}));
