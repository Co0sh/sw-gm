import React, { Dispatch, FC, Fragment, memo } from 'react';
import { Div } from './Div';
import { DieIcon } from './DieIcon';
import { Button, makeStyles, Typography } from '@material-ui/core';
import { RaiseBar } from './RaiseBar';
import { TraitLevel, Attributes, BaseSkillId } from '../logic/character';
import { useCompendium } from './CompendiumManager';
import { byId } from '../logic/byId';
import { AttributeIcon } from './AttributeIcon';
import { FastIconButton } from './FastIconButton';
import { cn } from '../logic/cn';
import { useDice } from '../logic/DiceContext';
import { prepareMultiThrow } from '../logic/prepareMultiThrow';
import { defaultRegularDie } from '../logic/rolls';
import { Die } from '../model/die.model';
import { CharacterAction } from '../logic/characterReducer';

export interface SkillViewProps {
  characterName: string;
  wildDie?: Die;
  skillId: BaseSkillId;
  attributes: Attributes;
  level?: TraitLevel;
  onChange?: Dispatch<CharacterAction>;
}

const SkillView: FC<SkillViewProps> = ({
  characterName,
  wildDie,
  skillId,
  attributes,
  level,
  onChange,
}) => {
  const classes = useStyles();
  const { compendium } = useCompendium();
  const baseSkill = compendium.baseSkills.find(byId(skillId));

  const throwDice = useDice();

  const { base, bonus } = level ?? {};

  if (!baseSkill) {
    return null;
  }

  const roll = () => {
    const options = prepareMultiThrow({
      type: 'trait',
      name: `${characterName}'s ${baseSkill.name}`,
      traitDie: level?.base ?? defaultRegularDie,
      modifier: level?.bonus ?? level?.base !== undefined ? 0 : -2,
      wildDie,
    });
    throwDice(options);
  };

  const content = (
    <>
      <Div row align="center" spacing className={classes.skillNameRow}>
        <AttributeIcon type={baseSkill.attribute} size={1.5} />
        <Typography className={classes.skillName} variant="h5" component="span">
          {baseSkill.name}
        </Typography>
      </Div>
      <Div row>
        {traitDice.map((die) => {
          const dieContent = (
            <Fragment key={die}>
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
            </Fragment>
          );
          if (onChange) {
            return (
              <FastIconButton
                key={die}
                onClick={() => {
                  if (die !== base) {
                    onChange({
                      type: 'setSkill',
                      skill: baseSkill.id,
                      level: { base: die },
                    });
                  } else {
                    onChange({
                      type: 'clearSkill',
                      skill: baseSkill.id,
                    });
                  }
                }}
                disabled={!onChange}
                label={`d${die}`}
              >
                {dieContent}
              </FastIconButton>
            );
          }
          return dieContent;
        })}
      </Div>
    </>
  );

  if (onChange) {
    return (
      <Div
        row
        justify="space-between"
        align="center"
        className={classes.skillPadding}
      >
        {content}
      </Div>
    );
  }

  return (
    <Button
      className={cn(classes.skillButton, classes.skillPadding)}
      onClick={roll}
    >
      {content}
    </Button>
  );
};

const traitDice = [4, 6, 8, 10, 12] as const;

const useStyles = makeStyles((theme) => ({
  skillName: {
    fontFamily: 'monospace',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    paddingRight: theme.spacing(1),
    textAlign: 'start',
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
  skillButton: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    textTransform: 'none',
    cursor: 'pointer',
  },
  skillPadding: {
    padding: `${theme.spacing(0.25)}px ${theme.spacing(1)}px`,
  },
}));

export default memo(SkillView);
