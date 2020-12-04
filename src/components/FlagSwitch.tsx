import React, { FC, useState } from 'react';
import { Switch, Typography, makeStyles } from '@material-ui/core';
import { Div } from './Div';
import { cn } from '../logic/cn';
import { useLabelId } from '../logic/useId';

export interface FlagSwitchProps {
  title?: string;
  initialValue?: boolean;
  value?: boolean;
  onChange?: (value: boolean) => void;
  className?: string;
}

export const FlagSwitch: FC<FlagSwitchProps> = ({
  title,
  initialValue,
  value: propValue,
  onChange = () => {},
  className,
}) => {
  const classes = useStyles();
  const [stateValue, setStateValue] = useState(propValue ?? initialValue);
  const value = propValue ?? stateValue;
  const handleChange = (newValue: boolean) => {
    onChange(newValue);
    setStateValue(newValue);
  };

  const labelId = useLabelId();

  return (
    <Div align="center" className={cn(classes.relative, className)}>
      <Typography
        variant="caption"
        component="label"
        htmlFor={labelId}
        className={classes.title}
      >
        {title}
      </Typography>
      <Switch
        id={labelId}
        checked={value}
        onChange={(e) => handleChange(e.target.checked)}
        size="medium"
      />
    </Div>
  );
};

const useStyles = makeStyles((theme) => ({
  relative: {
    position: 'relative',
  },
  title: {
    position: 'absolute',
    top: -theme.spacing(1),
    opacity: 0.5,
  },
}));
