import React, { FC } from 'react';
import { Box, makeStyles, Theme, Typography } from '@material-ui/core';
import { ThrowType } from '../logic/rolls';

export interface SingleRollResultProps {
  value: number;
  ace?: boolean;
  type?: ThrowType;
}

export const SingleRollResult: FC<SingleRollResultProps> = ({
  value,
  ace = false,
  type = 'regular',
}) => {
  const classes = useStyles({ ace, type });

  return (
    <Box component="span" className={classes.root}>
      <Typography variant="h5" component="span" className={classes.number}>
        {value}
      </Typography>
    </Box>
  );
};

const useStyles = makeStyles<Theme, { ace: boolean; type: ThrowType }>(
  (theme) => ({
    root: {
      backgroundColor: (props) =>
        props.type === 'regular'
          ? theme.palette.primary.main
          : theme.palette.secondary.main,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
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
