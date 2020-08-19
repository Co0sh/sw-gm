import React, { FC } from 'react';
import { Div } from './Div';
import { makeStyles } from '@material-ui/core';
import { Navbar, NavLinkData } from './Navbar';

export interface LayoutProps {
  links?: NavLinkData[];
}

export const Layout: FC<LayoutProps> = ({ children, links }) => {
  const classes = useStyles();

  return (
    <Div className={classes.root}>
      <Div grows>{children}</Div>
      <Navbar links={links} />
    </Div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
  },
}));
