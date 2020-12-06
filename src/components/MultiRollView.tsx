import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core';
import { RollView } from './RollView';
import { Div } from './Div';
import { DieIcon } from './DieIcon';
import { MultiRollResult } from '../model/multiRollResult.model';
import { ThrowType } from '../model/throwType.model';

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
      <Div row align="center" grows spacing>
        <DieIcon
          type={value.die}
          color={type === 'regular' ? 'primary' : 'secondary'}
        />
        <Div row spacing className={classes.results}>
          {value.rolls.map((roll, index) => (
            <RollView
              key={String(roll.key)}
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
}));
