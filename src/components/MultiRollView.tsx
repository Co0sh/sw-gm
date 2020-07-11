import React, { FC } from 'react';
import { MultiRollResult, ThrowType } from '../logic/rolls';
import { Typography, Box, makeStyles, SvgIcon } from '@material-ui/core';
import { RollView } from './RollView';
import { DiceIcons } from '../logic/diceIcons';

export interface MultiRollViewProps {
  value: MultiRollResult;
  type?: ThrowType;
  className?: string;
}

export const MultiRollView: FC<MultiRollViewProps> = ({
  value,
  type = 'regular',
  className,
}) => {
  const classes = useStyles();

  return (
    <Box display="flex" alignItems="center" className={className}>
      <Box display="flex" alignItems="center" flexGrow={1}>
        <SvgIcon
          component={DiceIcons[value.die]}
          viewBox="0 0 100 100"
          className={classes.dice}
          color={type === 'regular' ? 'primary' : 'secondary'}
        />
        <Box className={classes.results}>
          {value.rolls.map((roll, index) => (
            <RollView
              key={roll.key}
              type={type}
              ace={roll.result === value.die && index < value.rolls.length - 1}
              value={roll.result}
            />
          ))}
        </Box>
      </Box>
      <Typography variant="h4" component="span">
        {value.sum}
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
    width: '2.rem',
    height: '2.5rem',
    marginRight: theme.spacing(1),
  },
}));
