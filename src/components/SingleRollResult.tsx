import React, { FC } from 'react';
import { Box, makeStyles, Theme, Typography } from '@material-ui/core';
import { RollType } from '../logic/rolls';

export interface SingleRollResultProps {
  value: number;
  ace?: boolean;
  type?: RollType;
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

const useStyles = makeStyles<Theme, { ace: boolean; type: RollType }>(
  (theme) => ({
    root: {
      backgroundColor: (props) =>
        props.type === 'regular'
          ? theme.palette.primary.main
          : theme.palette.secondary.main,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 40,
      height: 40,
      borderRadius: '50%',
      borderStyle: 'solid',
      borderWidth: 2,
      borderColor: (props) =>
        props.ace ? theme.palette.success.main : 'transparent',
    },
  }),
);
