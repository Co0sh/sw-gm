import React, { FC, useState } from 'react';
import { ThrowResult } from '../logic/rolls';
import { List, ListItem, makeStyles, Typography } from '@material-ui/core';
import { MultiRollView } from './MultiRollView';
import { cn } from '../logic/cn';
import { NumberPicker } from './NumberPicker';
import { RaiseBar } from './RaiseBar';
import { Div } from './Div';

export interface ThrowViewProps {
  value: ThrowResult;
  className?: string;
}

export const ThrowView: FC<ThrowViewProps> = ({ value, className }) => {
  const classes = useStyles();
  const {
    name,
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
    <Div>
      <Div className={classes.padding}>
        <Typography variant="body2">{name}</Typography>
      </Div>
      <Div row>
        <List
          dense
          className={cn(
            isAdditional && classes.translucent,
            classes.grows,
            className,
          )}
        >
          {multiRolls.map((multiRoll) => (
            <ListItem dense key={String(multiRoll.key)}>
              <MultiRollView
                value={multiRoll}
                type={type}
                className={classes.grows}
              />
            </ListItem>
          ))}
        </List>
        <Div className={classes.totalBox}>
          <Div
            row
            justify="center"
            align="center"
            className={cn(classes.total, passed && classes.passed)}
          >
            <Typography variant="h5">{total}</Typography>
          </Div>
          <RaiseBar className={classes.bar} value={raises} />
        </Div>
      </Div>
      <Div row justify="space-evenly">
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
      </Div>
    </Div>
  );
};

const useStyles = makeStyles((theme) => ({
  totalBox: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  total: {
    width: 40,
    height: 40,
  },
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
  padding: {
    padding: theme.spacing(1),
    paddingBottom: 0,
  },
}));
