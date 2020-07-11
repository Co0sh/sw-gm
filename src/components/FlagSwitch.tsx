import React, { FC, useState } from 'react';
import { Box, Switch, Typography, makeStyles } from '@material-ui/core';

export interface FlagSwitchProps {
  title?: string;
  initialValue?: boolean;
  value?: boolean;
  setValue?: (value: boolean) => void;
}

export const FlagSwitch: FC<FlagSwitchProps> = ({
  title,
  initialValue,
  value: propValue,
  setValue = () => {},
}) => {
  const classes = useStyles();
  const [stateValue, setStateValue] = useState(propValue ?? initialValue);
  const value = propValue ?? stateValue;
  const handleChange = (newValue: boolean) => {
    setValue(newValue);
    setStateValue(newValue);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      position="relative"
    >
      <Typography variant="caption" className={classes.title}>
        {title}
      </Typography>
      <Switch
        checked={value}
        onChange={(e) => handleChange(e.target.checked)}
      />
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  title: {
    position: 'absolute',
    top: -theme.spacing(1),
    opacity: 0.5,
  },
}));
