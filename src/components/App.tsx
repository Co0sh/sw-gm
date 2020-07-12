import React, { FC } from 'react';
import { CssBaseline, makeStyles } from '@material-ui/core';
import { DiceMultiThrower } from './DiceMultiThrower';
import { Div } from './Div';

const App: FC = () => {
  const classes = useStyles();

  return (
    <Div row justify="center" className={classes.root}>
      <CssBaseline />
      <Div justify="flex-end" className={classes.content}>
        <DiceMultiThrower />
      </Div>
    </Div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
  },
  content: {
    maxWidth: 400,
    width: '100%',
    padding: theme.spacing(2),
  },
}));

export default App;
