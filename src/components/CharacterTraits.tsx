import React, { FC } from 'react';
import { Div } from './Div';
import { Character, AttributeName, TraitLevel } from '../logic/character';
import { AttributeIcon } from './AttributeIcon';
import { Paper, Typography, makeStyles } from '@material-ui/core';
import { DieIcon } from './DieIcon';
import { TraitLevelView } from './TraitLevelView';
import { useCompendium } from './CompendiumManager';

export interface CharacterTraitsProps {
  character: Character;
  onChange?: (character: Character) => void;
}

export const CharacterTraits: FC<CharacterTraitsProps> = ({
  character,
  onChange,
}) => {
  const classes = useStyles();
  const { compendium } = useCompendium();
  const { baseSkills } = compendium;
  const { attributes, skills } = character;

  const handleSkillChange = (skillId: string) => (level?: TraitLevel) => {
    if (!onChange) {
      return;
    }
    const characterCopy = { ...character };
    const skillsCopy = [...characterCopy.skills];
    const skillIndex = skillsCopy.findIndex(
      (skill) => skill.skillId === skillId,
    );
    const skillCopy = level
      ? skillIndex < 0
        ? { skillId, level }
        : { ...skillsCopy[skillIndex], level }
      : undefined;
    if (skillIndex < 0) {
      if (skillCopy) {
        skillsCopy.push(skillCopy);
      }
    } else {
      if (skillCopy) {
        skillsCopy.splice(skillIndex, 1, skillCopy);
      } else {
        skillsCopy.splice(skillIndex, 1);
      }
    }
    characterCopy.skills = skillsCopy;
    onChange(characterCopy);
  };

  return (
    <>
      <Div spacing row>
        {Object.entries(attributes).map(([id, attribute]) => (
          <Div
            key={id}
            component={Paper}
            align="center"
            spacing
            className={classes.attribute}
            grows
          >
            <AttributeIcon type={id as AttributeName} size={2} />
            <DieIcon type={attribute.base} size="large" color="secondary" />
          </Div>
        ))}
      </Div>
      <Div spacing>
        {baseSkills.map((baseSkill) => {
          const skill = skills.find(({ skillId }) => skillId === baseSkill.id);

          if (!skill && !onChange) {
            return null;
          }

          return (
            <Div key={baseSkill.id} row justify="space-between" align="center">
              <Typography
                className={classes.skillName}
                variant="h5"
                component="span"
              >
                {baseSkill.shortcut}
              </Typography>
              <TraitLevelView
                base={skill?.level.base}
                bonus={skill?.level.bonus}
                color="primary"
                onChange={
                  onChange ? handleSkillChange(baseSkill.id) : undefined
                }
              />
            </Div>
          );
        })}
      </Div>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  skillName: {
    fontFamily: 'monospace',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  attribute: {
    padding: `${theme.spacing(1)}px 0`,
    marginBottom: theme.spacing(1),
  },
}));
