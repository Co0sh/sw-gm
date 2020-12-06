import React, { FC, useState, memo } from 'react';
import { Die } from '../model/die.model';
import { DiceIcons } from '../logic/diceIcons';
import { Div } from './Div';
import { DieIcon } from './DieIcon';
import { FastIconButton } from './FastIconButton';
import { ThrowType } from '../model/throwType.model';

export interface DiePickerProps {
  initialValue?: Die | null;
  value?: Die | null;
  onChange?: (value: Die) => void;
  type?: ThrowType;
  disabled?: boolean;
  className?: string;
}

const DiePicker: FC<DiePickerProps> = ({
  initialValue,
  value: propValue,
  onChange,
  type = 'regular',
  disabled = false,
  className,
}) => {
  const [stateDie, setStateDie] = useState(propValue ?? initialValue ?? null);
  const die = propValue !== undefined ? propValue : stateDie;
  const handleDie = (die: Die) => {
    onChange?.(die);
    setStateDie(die);
  };

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
            onClick={() => handleDie(dieType)}
            label={`d${dieType}`}
          >
            <DieIcon type={dieType} size="small" />
          </FastIconButton>
        );
      })}
    </Div>
  );
};

const MemoDiePicker = memo(DiePicker) as typeof DiePicker;
export { MemoDiePicker as DiePicker };
