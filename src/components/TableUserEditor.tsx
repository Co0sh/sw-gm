import React, { FC, useState } from 'react';
import { Div } from './Div';
import { makeStyles, Typography, TextField, Button } from '@material-ui/core';
import { cn } from '../logic/cn';

export interface TableUserEditorProps {
  onChange: (username: string) => void;
  className?: string;
}

export const TableUserEditor: FC<TableUserEditorProps> = ({
  onChange,
  className,
}) => {
  const classes = useStyles();
  const [name, setName] = useState('');

  return (
    <Div spacing className={cn(className, classes.root)}>
      <Typography variant="h4" component="h1" align="center">
        Pick a name
      </Typography>
      <TextField
        className={classes.field}
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button
        variant="contained"
        color="secondary"
        fullWidth
        onClick={() => onChange(name)}
      >
        Join
      </Button>
    </Div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {},
  field: {
    paddingBottom: theme.spacing(4),
  },
}));
