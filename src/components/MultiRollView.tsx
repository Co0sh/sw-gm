import React, { FC } from 'react';
import { MultiRollResult, ThrowType } from '../logic/rolls';
import { makeStyles, SvgIcon } from '@material-ui/core';
import { RollView } from './RollView';
import { DiceIcons } from '../logic/diceIcons';
import { Div } from './Div';

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
    <Div row align="center" className={className}>
      <Div row align="center" grows>
        <SvgIcon
          component={DiceIcons[value.die]}
          viewBox="0 0 100 100"
          className={classes.dice}
          color={type === 'regular' ? 'primary' : 'secondary'}
        />
        <Div row spacing className={classes.results}>
          {value.rolls.map((roll, index) => (
            <RollView
              key={roll.key}
              type={type}
              ace={roll.result === value.die && index < value.rolls.length - 1}
              value={roll.result}
            />
          ))}
        </Div>
      </Div>
    </Div>
  );
};

const useStyles = makeStyles((theme) => ({
  results: {
    marginRight: theme.spacing(2),
  },
  dice: {
    width: '2.rem',
    height: '2.5rem',
    marginRight: theme.spacing(1),
  },
}));
