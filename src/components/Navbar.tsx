import React, { FC, ReactNode } from 'react';
import {
  BottomNavigation,
  BottomNavigationAction,
  makeStyles,
} from '@material-ui/core';
import { useHistory, useLocation } from 'react-router';

export interface NavbarProps {
  links?: NavLinkData[];
}

export const Navbar: FC<NavbarProps> = ({ links = [] }) => {
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();

  return (
    <BottomNavigation
      showLabels
      className={classes.root}
      value={location.pathname}
      onChange={(_, newValue) => history.push(newValue)}
    >
      {links.map(({ label, url, icon }) => (
        <BottomNavigationAction
          key={url}
          label={label}
          value={url}
          icon={icon}
          classes={{ selected: classes.selected }}
        />
      ))}
    </BottomNavigation>
  );
};

export interface NavLinkData {
  label: string;
  url: string;
  icon: ReactNode;
}

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'sticky',
    bottom: 0,
  },
  selected: {
    color: theme.palette.primary.light,
  },
}));
