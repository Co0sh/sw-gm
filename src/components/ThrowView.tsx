import React, { FC } from 'react';
import { ThrowResult } from '../logic/rolls';
import { List, ListItem, makeStyles } from '@material-ui/core';
import { MultiRollView } from './MultiRollView';

export interface ThrowViewProps {
  value: ThrowResult;
  className?: string;
}

export const ThrowView: FC<ThrowViewProps> = ({ value, className }) => {
  const classes = useStyles();

  return (
    <List className={className}>
      {value.multiRolls.map((roll) => (
        <ListItem key={roll.key}>
          <MultiRollView
            value={roll}
            type={value.type}
            className={classes.grows}
          />
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
