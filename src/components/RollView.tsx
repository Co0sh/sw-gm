import React, { FC } from 'react';
import { RollResult } from '../logic/rolls';
import { Typography } from '@material-ui/core';

export interface RollViewProps {
  roll: RollResult;
}

export const RollView: FC<RollViewProps> = ({ roll }) => {
  return <Typography>{`${roll.rolls.join(' + ')} = ${roll.sum}`}</Typography>;
};
