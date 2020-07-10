import React, { FC } from 'react';
import { RollResult } from '../logic/rolls';
import { Typography, Box, makeStyles, SvgIcon } from '@material-ui/core';
import { SingleRollResult } from './SingleRollResult';
import { DiceIcons } from '../logic/diceIcons';

export interface RollViewProps {
  result: RollResult;
  className?: string;
}

export const RollView: FC<RollViewProps> = ({ result, className }) => {
  const classes = useStyles();

  return (
    <Box display="flex" alignItems="center" className={className}>
      <Box display="flex" alignItems="center" flexGrow={1}>
        <SvgIcon
          component={DiceIcons[result.die]}
          viewBox="0 0 100 100"
          className={classes.dice}
          color={result.type === 'regular' ? 'primary' : 'secondary'}
        />
        <Box className={classes.results}>
          {result.rolls.map((roll, index) => (
            <SingleRollResult
              key={index}
              type={result.type}
              ace={roll === result.die && index < result.rolls.length - 1}
              value={roll}
            />
          ))}
        </Box>
      </Box>
      <Typography variant="h4" component="span">
        {result.sum}
      </Typography>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  results: {
    display: 'flex',
    marginRight: theme.spacing(2),
    '& > :not(:last-child)': {
      marginRight: theme.spacing(1),
    },
  },
  dice: {
    width: 40,
    height: 40,
    marginRight: theme.spacing(1),
  },
}));
