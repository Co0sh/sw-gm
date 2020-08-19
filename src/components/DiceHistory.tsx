import React, { FC } from 'react';
import { IconButton, Button, makeStyles } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import BackIcon from '@material-ui/icons/ArrowBack';
import { useRouteMatch, Link } from 'react-router-dom';
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
  const { url } = useRouteMatch();

  return (
    <Div className={cn(classes.root, className)}>
      <Div spacing className={classes.paddingBottom}>
        {diceHistory.map((throwResult) => (
          <MultiThrowView
            key={throwResult.uuid}
            className={classes.wide}
            value={throwResult}
          />
        ))}
      </Div>
      <Div row spacing className={classes.buttons}>
        <IconButton onClick={clearDiceHistory}>
          <ClearIcon />
        </IconButton>
        <Button
          component={Link}
          to={url.slice(0, url.lastIndexOf('/'))}
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
  paddingBottom: {
    paddingBottom: theme.spacing(2),
    flexDirection: 'column-reverse',
  },
}));
