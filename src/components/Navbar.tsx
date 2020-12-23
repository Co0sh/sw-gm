import React, { FC, unstable_useTransition as useTransition } from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  Fade,
  LinearProgress,
  makeStyles,
} from "@material-ui/core";
import { useHistory, useLocation } from "react-router";
import { useLinks } from "./NavigationManager";

export const Navbar: FC = () => {
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();
  const links = useLinks();
  const [startTransition, isPending] = useTransition();

  return (
    <BottomNavigation
      showLabels
      className={classes.root}
      value={location.pathname}
      onChange={(_, newValue) => startTransition(() => history.push(newValue))}
    >
      <Fade
        in={isPending}
        style={{ transitionDelay: isPending ? "100ms" : "0ms" }}
        unmountOnExit
      >
        <LinearProgress className={classes.floating} />
      </Fade>
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
    position: "sticky",
    bottom: 0,
  },
  selected: {
    color: theme.palette.primary.light,
  },
  container: {
    position: "relative",
  },
  floating: {
    position: "absolute",
    width: "100%",
    top: -4,
  },
}));
