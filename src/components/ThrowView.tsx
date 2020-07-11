import React, { FC, useState } from 'react';
import { ThrowResult } from '../logic/rolls';
import { List, ListItem, makeStyles, Box, Typography } from '@material-ui/core';
import { MultiRollView } from './MultiRollView';
import { cn } from '../logic/cn';
import { NumberPicker } from './NumberPicker';
import { RaiseBar } from './RaiseBar';

export interface ThrowViewProps {
  value: ThrowResult;
  className?: string;
}

export const ThrowView: FC<ThrowViewProps> = ({ value, className }) => {
  const classes = useStyles();
  const {
    isAdditional,
    modifier: propModifier,
    target: propTarget,
    type,
    multiRolls,
  } = value;
  const [target, setTarget] = useState(propTarget);
  const [modifier, setModifier] = useState(propModifier);
  const total = multiRolls.reduce((acc, next) => acc + next.sum, modifier);
  const passed = total >= target;
  const raises = passed ? Math.floor((total - target) / 4) : 0;

  return (
    <Box display="flex" flexDirection="column">
      <Box display="flex">
        <List
          dense
          className={cn(
            isAdditional && classes.translucent,
            classes.grows,
            className,
          )}
        >
          {multiRolls.map((multiRoll) => (
            <ListItem dense key={multiRoll.key}>
              <MultiRollView
                value={multiRoll}
                type={type}
                className={classes.grows}
              />
            </ListItem>
          ))}
        </List>
        <Box display="flex" flexDirection="column" m={1} position="relative">
          <Box
            width={40}
            height={40}
            display="flex"
            justifyContent="center"
            alignItems="center"
            className={passed ? classes.passed : undefined}
          >
            <Typography variant="h5">{total}</Typography>
          </Box>
          <RaiseBar className={classes.bar} value={raises} />
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-evenly">
        <NumberPicker
          title="target"
          value={target}
          onChange={setTarget}
          min={0}
          max={99}
        />
        <NumberPicker
          title="modifier"
          value={modifier}
          onChange={setModifier}
          min={-99}
          max={99}
        />
      </Box>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  grows: {
    flexGrow: 1,
  },
  translucent: {
    opacity: 1 / 3,
  },
  bar: {
    position: 'absolute',
    top: 44,
    width: '100%',
  },
  passed: {
    backgroundColor: theme.palette.success.main,
    borderRadius: '50%',
  },
}));
