import React, { FC } from 'react';
import { RollResult } from '../logic/rolls';
import { Box, Typography, List, ListItem } from '@material-ui/core';
import { RollView } from './RollView';

export interface RollsProps {
  title: string;
  rolls: RollResult[];
}

export const Rolls: FC<RollsProps> = ({ title, rolls }) => {
  return (
    <Box px={2}>
      <Typography>{title}</Typography>
      <List>
        {rolls.map((roll, index) => (
          <ListItem key={index}>
            <RollView roll={roll} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
