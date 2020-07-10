import React, { FC } from 'react';
import { RollResult } from '../logic/rolls';
import { Box, Typography, List, ListItem, makeStyles } from '@material-ui/core';
import { RollView } from './RollView';

export interface RollsProps {
  title: string;
  rolls: RollResult[];
}

export const Rolls: FC<RollsProps> = ({ title, rolls }) => {
  const classes = useStyles();

  return (
    <Box display="flex" flexDirection="column">
      <Typography>{title}</Typography>
      <List>
        {rolls.map((roll, index) => (
          <ListItem key={index}>
            <RollView result={roll} className={classes.grows} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

const useStyles = makeStyles({
  grows: {
    flexGrow: 1,
  },
});
