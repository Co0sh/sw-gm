import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core';
import { RouteProps, useLocation } from 'react-router';
import { Div } from '../components/Div';
import DiceMultiThrower from '../components/DiceMultiThrower';
import { MultiThrowOptions } from '../model/multiThrowOptions.model';

export interface DicePageState {
  initialConfig?: MultiThrowOptions;
}

const DicePage: FC<RouteProps> = () => {
  const classes = useStyles();
  const { state } = useLocation<DicePageState | undefined>();
  const { initialConfig } = state ?? {};

  console.log(initialConfig);

  return (
    <Div justify="flex-end" align="center" grows>
      <DiceMultiThrower
        initialValue={initialConfig}
        className={classes.content}
      />
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

export default DicePage;
