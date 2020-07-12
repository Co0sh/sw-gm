import React, { FC } from 'react';
import { Div } from './Div';
import { makeStyles } from '@material-ui/core';
import { Navbar } from './Navbar';
import { BrowserRouter } from 'react-router-dom';

export interface LayoutProps {}

export const Layout: FC<LayoutProps> = ({ children }) => {
  const classes = useStyles();

  return (
    <Div className={classes.root}>
      <BrowserRouter>
        <Div grows>{children}</Div>
        <Navbar />
      </BrowserRouter>
    </Div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
  },
}));
