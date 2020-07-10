import React, { FC } from 'react';
import { RollResult } from '../logic/rolls';
import { Typography, Box, makeStyles, SvgIcon } from '@material-ui/core';
import { SingleRollResult } from './SingleRollResult';
import { ReactComponent as D4 } from '../assets/d4.svg';
import { ReactComponent as D6 } from '../assets/d6.svg';
import { ReactComponent as D8 } from '../assets/d8.svg';
import { ReactComponent as D10 } from '../assets/d10.svg';
import { ReactComponent as D12 } from '../assets/d12.svg';
import { ReactComponent as D20 } from '../assets/d20.svg';

export interface RollViewProps {
  result: RollResult;
  className?: string;
}

const DiceIcons = {
  4: D4,
  6: D6,
  8: D8,
  10: D10,
  12: D12,
  20: D20,
} as const;

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
