import React, { FC } from 'react';
import { Div } from './Div';
import { DieIcon } from './DieIcon';
import { makeStyles, Typography } from '@material-ui/core';
import { RaiseBar } from './RaiseBar';
import { TraitLevel, Attributes } from '../logic/character';
import { useCompendium } from './CompendiumManager';
import { byId } from '../logic/byId';
import { AttributeIcon } from './AttributeIcon';
import { FastIconButton } from './FastIconButton';

export interface SkillViewProps {
  skillId: string;
  attributes: Attributes;
  level?: TraitLevel;
  onChange?: (level?: TraitLevel) => void;
}

export const SkillView: FC<SkillViewProps> = ({
  skillId,
  attributes,
  level,
  onChange,
}) => {
  const classes = useStyles();
  const { compendium } = useCompendium();
  const baseSkill = compendium.baseSkills.find(byId(skillId));

  const { base, bonus } = level ?? {};

  if (!baseSkill) {
    return null;
  }

  return (
    <Div row justify="space-between" align="center">
      <Div row align="center" spacing className={classes.skillNameRow}>
        <AttributeIcon type={baseSkill.attribute} size={1.5} />
        <Typography className={classes.skillName} variant="h5" component="span">
          {baseSkill.shortcut}
        </Typography>
      </Div>
      <Div row>
        {traitDice.map((die) => {
          return (
            <FastIconButton
              key={die}
              onClick={() =>
                onChange?.(die !== base ? { base: die } : undefined)
              }
              disabled={!onChange}
              label={`d${die}`}
            >
              <DieIcon
                type={die}
                color={
                  onChange && attributes[baseSkill.attribute].base < die
                    ? 'secondary'
                    : 'primary'
                }
                className={
                  die === base
                    ? undefined
                    : !base || die < base || onChange
                    ? classes.inactive
                    : classes.hidden
                }
              />
              {bonus && die === base && (
                <RaiseBar className={classes.bonus} value={bonus} />
              )}
            </FastIconButton>
          );
        })}
      </Div>
    </Div>
  );
};

const traitDice = [4, 6, 8, 10, 12] as const;

const useStyles = makeStyles((theme) => ({
  skillName: {
    fontFamily: 'monospace',
    whiteSpace: 'nowrap',
  },
  skillNameRow: {
    overflow: 'hidden',
  },
  inactive: {
    opacity: 0.25,
  },
  hidden: {
    opacity: 0,
  },
  bonus: {
    position: 'absolute',
    width: '100%',
    bottom: -8,
  },
}));
