import React, { FC } from 'react';
import { RollResult } from '../logic/rolls';
import { Typography, Box, makeStyles } from '@material-ui/core';
import { SingleRollResult } from './SingleRollResult';
import D4 from '../assets/d4.svg';
import D6 from '../assets/d6.svg';
import D8 from '../assets/d8.svg';
import D10 from '../assets/d10.svg';
import D12 from '../assets/d12.svg';
import D20 from '../assets/d20.svg';

export interface RollViewProps {
  result: RollResult;
}

const DiceIcons = {
  4: D4,
  6: D6,
  8: D8,
  10: D10,
  12: D12,
  20: D20,
} as const;

export const RollView: FC<RollViewProps> = ({ result }) => {
  const classes = useStyles();

  return (
    <Box display="flex" alignItems="center">
      <Box width={40} height={40} marginRight={1}>
        <img
          className={classes.dice}
          src={DiceIcons[result.die]}
          alt={`D${result.die}`}
        />
      </Box>
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
    width: '100%',
  },
}));
