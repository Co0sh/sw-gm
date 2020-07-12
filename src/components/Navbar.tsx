import React, { FC } from 'react';
import {
  BottomNavigation,
  BottomNavigationAction,
  SvgIcon,
  makeStyles,
} from '@material-ui/core';
import { useHistory, useLocation } from 'react-router';
import { DiceIcons } from '../logic/diceIcons';
import { ReactComponent as CardsIcon } from '../assets/cards.svg';

export interface NavbarProps {}

export const Navbar: FC<NavbarProps> = () => {
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
      <BottomNavigationAction
        label="Dice"
        value="/"
        icon={<SvgIcon component={DiceIcons[12]} viewBox="0 0 100 100" />}
      />
      <BottomNavigationAction
        label="Cards"
        value="/cards"
        icon={<SvgIcon component={CardsIcon} viewBox="0 0 100 100" />}
      />
    </BottomNavigation>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'sticky',
    bottom: 0,
  },
}));
