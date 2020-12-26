import { FC, memo, useState } from 'react';
import {
  Button,
  ButtonProps,
  Checkbox,
  Dialog,
  FormControlLabel,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { Div } from './Div';

export interface ConfirmButtonProps extends ButtonProps {
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLable?: string;
  additionalActions?: AdditionalAction[];
  ButtonComponent?: any;
}

interface AdditionalActionId extends String {
  __additionalActionId: never;
}

interface AdditionalAction {
  id: AdditionalActionId;
  text: string;
  action: () => void;
}

const ConfirmButton: FC<ConfirmButtonProps> = ({
  title,
  description,
  confirmLabel = 'OK',
  cancelLable = 'Cancel',
  children,
  onClick,
  additionalActions = [],
  ButtonComponent = Button,
  ...buttonProps
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState<AdditionalActionId[]>([]);

  const toggle = (actionId: AdditionalActionId) => () => {
    setChecked((prev) => {
      const index = checked.indexOf(actionId);
      if (index >= 0) {
        const copy = [...prev];
        copy.splice(index, 1);
        return copy;
      } else {
        return [...prev, actionId];
      }
    });
  };

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
        {additionalActions.map((action) => (
          <FormControlLabel
            key={String(action.id)}
            control={
              <Checkbox
                checked={checked.includes(action.id)}
                onChange={toggle(action.id)}
              />
            }
            label={action.text}
          />
        ))}
        <Div row spacing>
          <Button onClick={() => setOpen(false)} fullWidth>
            {cancelLable}
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={(e) => {
              onClick?.(e);
              additionalActions.forEach(({ id, action }) => {
                if (checked.includes(id)) {
                  action();
                }
              });
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
