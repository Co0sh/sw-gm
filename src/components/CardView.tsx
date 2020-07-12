import React, { FC } from 'react';
import { Card, CardRank, CardSuit } from '../logic/useDeck';
import { Typography, makeStyles, SvgIcon, Paper } from '@material-ui/core';
import { Div } from './Div';
import { CardIcons } from '../logic/cardIcons';
import { cn } from '../logic/cn';

export interface CardViewProps {
  card: Card;
}

export const CardView: FC<CardViewProps> = ({ card }) => {
  const classes = useStyles();

  if (card.type === 'joker') {
    const { color } = card;
    return (
      <Div
        component={Paper}
        align="center"
        justify="center"
        className={cn(classes.root, classes[color])}
      >
        <SvgIcon
          className={classes.joker}
          component={CardIcons.joker}
          viewBox="0 0 100 100"
        />
      </Div>
    );
  }
  const { rank, suit } = card;
  return (
    <Div
      component={Paper}
      row
      align="center"
      justify="center"
      className={cn(classes.root, classes[colors[suit]])}
    >
      <SvgIcon component={CardIcons[suit]} viewBox="0 0 100 100" />
      <Typography className={classes.rank}>{rankSymbols[rank]}</Typography>
    </Div>
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
    height: 40,
    width: 64,
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
