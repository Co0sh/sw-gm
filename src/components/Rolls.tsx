import React, { FC } from 'react';
import { RollResult } from '../logic/rolls';
import { List, ListItem, makeStyles } from '@material-ui/core';
import { RollView } from './RollView';

export interface RollsProps {
  rolls: RollResult[];
}

export const Rolls: FC<RollsProps> = ({ rolls }) => {
  const classes = useStyles();

  return (
    <List>
      {rolls.map((roll, index) => (
        <ListItem key={index}>
          <RollView result={roll} className={classes.grows} />
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
