import React, { FC, memo } from 'react';
import { Die, DIE_TYPES } from '../model/die.model';
import { Div } from './Div';
import { DieIcon } from './DieIcon';
import { FastIconButton } from './FastIconButton';
import { ThrowType } from '../model/throwType.model';
import { makeStyles } from '@material-ui/core';

export interface DiePickerProps {
  value: Die | null;
  onChange: (value: Die) => void;
  type?: ThrowType;
  disabled?: boolean;
  className?: string;
  enabledDice?: Die[];
}

const DiePicker: FC<DiePickerProps> = ({
  value,
  onChange,
  type = 'regular',
  disabled = false,
  className,
  enabledDice = DIE_TYPES,
}) => {
  const classes = useStyles();
  const die = value;

  return (
    <Div row align="center" justify="space-between" grows className={className}>
      {DIE_TYPES.map((key) => {
        if (!enabledDice.includes(key)) {
          return <div key={key} className={classes.placeholder} />;
        }
        const dieType = Number(key) as Die;
        const selected = dieType === die;
        return (
          <FastIconButton
            key={key}
            color={
              selected
                ? type === 'regular'
                  ? 'primary'
                  : 'secondary'
                : undefined
            }
            disabled={disabled}
            onClick={() => onChange(dieType)}
            label={`d${dieType}`}
          >
            <DieIcon type={dieType} size="small" />
          </FastIconButton>
        );
      })}
    </Div>
  );
};

const useStyles = makeStyles({
  placeholder: {
    width: 40,
    height: 40,
  },
});

export default memo(DiePicker);
