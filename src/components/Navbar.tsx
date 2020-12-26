import React, {
  FC,
  unstable_useTransition as useTransition,
  useState,
} from 'react';
import {
  Fade,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  SwipeableDrawer,
} from '@material-ui/core';
import Menu from '@material-ui/icons/Menu';
import { useHistory, useLocation } from 'react-router';
import { useLinks } from './NavigationManager';
import { FastIconButton } from './FastIconButton';

export const Navbar: FC = () => {
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();
  const links = useLinks();
  const [open, setOpen] = useState(false);
  const [startTransition, isPending] = useTransition();

  return (
    <>
      <SwipeableDrawer
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        anchor="bottom"
      >
        <List>
          {links.map(({ label, url, icon }) => (
            <ListItem
              key={url}
              button
              onClick={() => {
                setOpen(false);
                startTransition(() => history.push(url));
              }}
              selected={location.pathname === url}
            >
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={label} />
            </ListItem>
          ))}
        </List>
      </SwipeableDrawer>
      <FastIconButton
        onClick={() => setOpen(true)}
        className={classes.menuButton}
      >
        <Menu />
      </FastIconButton>
      <Fade
        in={isPending}
        style={{ transitionDelay: isPending ? '100ms' : '0ms' }}
        unmountOnExit
      >
        <LinearProgress className={classes.floating} />
      </Fade>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  floating: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
  },
  menuButton: {
    position: 'fixed',
    top: theme.spacing(1),
    right: theme.spacing(1),
  },
}));
