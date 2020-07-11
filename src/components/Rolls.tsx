import React, { FC } from 'react';
import { MultiRollResult, ThrowType } from '../logic/rolls';
import { List, ListItem, makeStyles } from '@material-ui/core';
import { RollView } from './RollView';

export interface RollsProps {
  rolls: MultiRollResult[];
  type?: ThrowType;
  className?: string;
}

export const Rolls: FC<RollsProps> = ({ rolls, type, className }) => {
  const classes = useStyles();

  return (
    <List className={className}>
      {rolls.map((roll, index) => (
        <ListItem key={index}>
          <RollView result={roll} type={type} className={classes.grows} />
        </ListItem>
      ))}
    </List>
  );
};

const useStyles = makeStyles({
  grows: {
    flexGrow: 1,
  },
});
