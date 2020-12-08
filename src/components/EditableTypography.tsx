import {
  makeStyles,
  TextField,
  Typography,
  TypographyProps,
  useTheme,
} from '@material-ui/core';
import { Variant } from '@material-ui/core/styles/createTypography';
import React, { ElementType, FC } from 'react';
import { cn } from '../logic/cn';

interface EditableTypographyProps extends Omit<TypographyProps, 'onChange'> {
  value: string;
  onChange?: (value: string) => void;
  component: ElementType;
}

const EditableTypography: FC<EditableTypographyProps> = (props) => {
  const { value, onChange, ...typographyProps } = props;
  const classes = useStyles();
  const theme = useTheme();

  const variant: Variant =
    (typographyProps.variant === 'inherit' ||
    typographyProps.variant === 'srOnly'
      ? undefined
      : typographyProps.variant) ?? 'body1';

  return onChange ? (
    <TextField
      value={value}
      onChange={(e) => onChange(e.target.value)}
      InputProps={{
        classes: { input: classes.nameInput },
        inputProps: {
          style: { ...theme.typography[variant] },
        },
      }}
    />
  ) : (
    <Typography
      {...typographyProps}
      className={cn(classes.typography, typographyProps.className)}
    >
      {value}
    </Typography>
  );
};

const useStyles = makeStyles((theme) => ({
  nameInput: {
    padding: 0,
    paddingBottom: theme.spacing(0.5),
    height: 'unset',
  },
  typography: {
    marginBottom: theme.spacing(0.5),
  },
}));

export default EditableTypography;
