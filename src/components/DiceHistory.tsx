import React, { FC } from 'react';
import { IconButton, Button, makeStyles } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import BackIcon from '@material-ui/icons/ArrowBack';
import { Link } from 'react-router-dom';
import { useDiceHistory } from './DiceHistoryManager';
import { Div } from './Div';
import { MultiThrowView } from './MultiThrowView';

export interface DiceHistoryProps {
  className?: string;
}

export const DiceHistory: FC<DiceHistoryProps> = ({ className }) => {
  const classes = useStyles();
  const { diceHistory, clearDiceHistory } = useDiceHistory();

  return (
    <Div className={className}>
      <Div spacing className={classes.paddingBottom}>
        {diceHistory.map((throwResult) => (
          <MultiThrowView
            key={throwResult.uuid}
            className={classes.wide}
            value={throwResult}
          />
        ))}
      </Div>
      <Div row spacing>
        <IconButton onClick={clearDiceHistory}>
          <ClearIcon />
        </IconButton>
        <Button
          component={Link}
          to="/"
          variant="contained"
          color="secondary"
          fullWidth
          startIcon={<BackIcon />}
        >
          Back
        </Button>
      </Div>
    </Div>
  );
};

const useStyles = makeStyles((theme) => ({
  wide: {
    width: '100%',
  },
  paddingBottom: {
    paddingBottom: theme.spacing(2),
  },
}));
