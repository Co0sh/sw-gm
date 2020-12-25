import { FC, memo, useState } from 'react';
import {
  Button,
  ButtonProps,
  Dialog,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { Div } from './Div';

export interface ConfirmButtonProps extends ButtonProps {
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLable?: string;
  ButtonComponent?: any;
}

const ConfirmButton: FC<ConfirmButtonProps> = ({
  title,
  description,
  confirmLabel = 'OK',
  cancelLable = 'Cancel',
  children,
  onClick,
  ButtonComponent = Button,
  ...buttonProps
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  return (
    <>
      <ButtonComponent {...buttonProps} onClick={() => setOpen(true)}>
        {children}
      </ButtonComponent>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        classes={{ paper: classes.dialog }}
      >
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          {title ?? children}
        </Typography>
        {description !== undefined && <Typography>{description}</Typography>}
        <Div row spacing>
          <Button onClick={() => setOpen(false)} fullWidth>
            {cancelLable}
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={(e) => {
              onClick?.(e);
              setOpen(false);
            }}
            fullWidth
          >
            {confirmLabel}
          </Button>
        </Div>
      </Dialog>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  dialog: {
    width: '100%',
    maxWidth: 400,
    padding: theme.spacing(2),
  },
}));

export default memo(ConfirmButton);
