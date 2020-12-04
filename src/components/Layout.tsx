import React, { FC } from 'react';
import { Div } from './Div';
import { makeStyles } from '@material-ui/core';
import { Navbar } from './Navbar';

export const Layout: FC = ({ children }) => {
  const classes = useStyles();

  return (
    <Div className={classes.root}>
      <Div component="main" grows>
        {children}
      </Div>
      <Navbar />
    </Div>
  );
};

const useStyles = makeStyles((theme) => ({
  '@global': {
    body: {
      overscrollBehaviorY: 'contain',
    },
  },
  root: {
    minHeight: '100vh',
    width: '100%',
  },
}));
