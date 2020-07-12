import React, { FC } from 'react';
import { Card, CardRank, CardSuit } from '../logic/useDeck';
import {
  Typography,
  makeStyles,
  SvgIcon,
  Button,
  darken,
} from '@material-ui/core';
import { CardIcons } from '../logic/cardIcons';
import { cn } from '../logic/cn';

export interface CardViewProps {
  card: Card;
  onClick?: () => void;
}

export const CardView: FC<CardViewProps> = ({ card, onClick }) => {
  const classes = useStyles();

  if (card.type === 'joker') {
    const { color } = card;
    return (
      <Button className={cn(classes.root, classes[color])} onClick={onClick}>
        <SvgIcon
          className={classes.joker}
          component={CardIcons.joker}
          viewBox="0 0 100 100"
        />
      </Button>
    );
  }
  const { rank, suit } = card;
  return (
    <Button
      className={cn(classes.root, classes[colors[suit]])}
      onClick={onClick}
    >
      <SvgIcon component={CardIcons[suit]} viewBox="0 0 100 100" />
      <Typography className={classes.rank}>{rankSymbols[rank]}</Typography>
    </Button>
  );
};

const rankSymbols: { [key in CardRank]: string } = {
  ace: 'A',
  king: 'K',
  queen: 'Q',
  jack: 'J',
  '10': '10',
  '9': '9',
  '8': '8',
  '7': '7',
  '6': '6',
  '5': '5',
  '4': '4',
  '3': '3',
  '2': '2',
};

const colors: { [key in CardSuit]: 'red' | 'black' } = {
  spades: 'black',
  clubs: 'black',
  hearts: 'red',
  diamonds: 'red',
};

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.common.white,
    '&:hover': {
      backgroundColor: darken(theme.palette.common.white, 0.1),
    },
    height: 40,
    width: 64,
    cursor: 'pointer',
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rank: {
    fontWeight: 'bold',
    fontSize: '1.6rem',
  },
  red: {
    color: 'red',
  },
  black: {
    color: 'black',
  },
  joker: {
    width: '2em',
    height: '2em',
  },
}));
