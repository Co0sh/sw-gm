import React, { FC } from 'react';
import { Div } from './Div';
import { Character, AttributeName, TraitLevel } from '../logic/character';
import { SkillView } from './SkillView';
import { useCompendium } from './CompendiumManager';
import { AttributeView } from './AttributeView';
import { makeStyles } from '@material-ui/core';

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

  const handleAttributeChange = (attributeName: AttributeName) => (
    level: TraitLevel,
  ) => {
    if (!onChange) {
      return;
    }
    onChange({
      ...character,
      attributes: { ...character.attributes, [attributeName]: level },
    });
  };

  return (
    <>
      <Div spacing row className={classes.spaced}>
        {Object.entries(attributes).map(([id, attribute]) => (
          <AttributeView
            key={id}
            characterName={character.name}
            attribute={id as AttributeName}
            level={attribute}
            onChange={
              onChange ? handleAttributeChange(id as AttributeName) : undefined
            }
          />
        ))}
      </Div>
      <Div spacing>
        {baseSkills.map((baseSkill) => {
          const skill = skills.find(({ skillId }) => skillId === baseSkill.id);

          if (!skill && !onChange) {
            return null;
          }

          return (
            <SkillView
              key={baseSkill.id}
              skillId={baseSkill.id}
              level={skill?.level}
              attributes={attributes}
              onChange={onChange ? handleSkillChange(baseSkill.id) : undefined}
            />
          );
        })}
      </Div>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  spaced: {
    paddingBottom: theme.spacing(2),
  },
}));
