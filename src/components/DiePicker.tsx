import React, { FC, memo } from 'react';
import { Die } from '../model/die.model';
import { DiceIcons } from '../logic/diceIcons';
import { Div } from './Div';
import { DieIcon } from './DieIcon';
import { FastIconButton } from './FastIconButton';
import { ThrowType } from '../model/throwType.model';

export interface DiePickerProps {
  value: Die | null;
  onChange: (value: Die) => void;
  type?: ThrowType;
  disabled?: boolean;
  className?: string;
}

const DiePicker: FC<DiePickerProps> = ({
  value,
  onChange,
  type = 'regular',
  disabled = false,
  className,
}) => {
  const die = value;

  return (
    <Div row align="center" justify="space-between" grows className={className}>
      {Object.keys(DiceIcons).map((key) => {
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

export default memo(DiePicker);
