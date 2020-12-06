import React, { FC } from 'react';
import { makeStyles, Theme, Typography } from '@material-ui/core';
import { Div } from './Div';
import { ThrowType } from '../model/throwType.model';

export interface RollViewProps {
  value: number;
  ace?: boolean;
  type?: ThrowType;
}

export const RollView: FC<RollViewProps> = ({
  value,
  ace = false,
  type = 'regular',
}) => {
  const classes = useStyles({ ace, type });

  return (
    <Div row align="center" justify="center" className={classes.root}>
      <Typography variant="h5" component="span" className={classes.number}>
        {value}
      </Typography>
    </Div>
  );
};

const useStyles = makeStyles<Theme, { ace: boolean; type: ThrowType }>(
  (theme) => ({
    root: {
      backgroundColor: (props) =>
        props.type === 'regular'
          ? theme.palette.primary.main
          : theme.palette.secondary.main,
      width: '2.5rem',
      height: '2.5rem',
      borderRadius: '50%',
      borderStyle: 'solid',
      borderWidth: `${1 / 8}em`,
      borderColor: (props) =>
        props.ace ? theme.palette.success.main : 'transparent',
    },
  }),
);
