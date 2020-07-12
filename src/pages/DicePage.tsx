import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core';
import { RouteProps } from 'react-router';
import { Div } from '../components/Div';
import { DiceMultiThrower } from '../components/DiceMultiThrower';

export const DicePage: FC<RouteProps> = () => {
  const classes = useStyles();

  return (
    <Div justify="flex-end" align="center" grows>
      <DiceMultiThrower className={classes.content} />
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
