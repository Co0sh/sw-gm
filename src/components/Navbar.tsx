import React, { FC } from 'react';
import {
  BottomNavigation,
  BottomNavigationAction,
  makeStyles,
} from '@material-ui/core';
import { useHistory, useLocation } from 'react-router';
import { useLinks } from './NavigationManager';

export const Navbar: FC = () => {
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();
  const links = useLinks();

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

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'sticky',
    bottom: 0,
  },
  selected: {
    color: theme.palette.primary.light,
  },
}));
