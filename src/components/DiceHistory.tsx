import React, { FC } from 'react';
import { IconButton, Button, makeStyles } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import BackIcon from '@material-ui/icons/ArrowBack';
import { useHistory } from 'react-router-dom';
import { Div } from './Div';
import { MultiThrowView } from './MultiThrowView';
import { useDiceHistory } from '../logic/DiceHistoryContext';
import { cn } from '../logic/cn';

export interface DiceHistoryProps {
  className?: string;
}

export const DiceHistory: FC<DiceHistoryProps> = ({ className }) => {
  const classes = useStyles();
  const { diceHistory, clearDiceHistory } = useDiceHistory();
  const { goBack } = useHistory();

  return (
    <Div className={cn(classes.root, className)}>
      <Div className={classes.reversed}>
        {diceHistory.map((throwResult) => (
          <MultiThrowView
            key={String(throwResult.uuid)}
            className={cn(classes.wide, classes.spaced)}
            value={throwResult}
          />
        ))}
      </Div>
      <Div row spacing className={classes.buttons}>
        <IconButton onClick={clearDiceHistory} aria-label="Clear">
          <ClearIcon />
        </IconButton>
        <Button
          onClick={goBack}
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
  root: {
    position: 'relative',
  },
  buttons: {
    position: 'sticky',
    paddingBottom: theme.spacing(2),
    paddingTop: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
    bottom: 56,
  },
  wide: {
    width: '100%',
  },
  reversed: {
    flexDirection: 'column-reverse',
  },
  spaced: {
    marginBottom: theme.spacing(4),
  },
}));
