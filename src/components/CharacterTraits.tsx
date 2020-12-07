import React, { Dispatch, FC, memo } from 'react';
import { Div } from './Div';
import { Character, AttributeName } from '../logic/character';
import SkillView from './SkillView';
import AttributeView from './AttributeView';
import { useCompendium } from './CompendiumManager';
import { makeStyles } from '@material-ui/core';
import { CharacterAction } from '../logic/characterReducer';

export interface CharacterTraitsProps {
  character: Character;
  onChange?: Dispatch<CharacterAction>;
}

const CharacterTraits: FC<CharacterTraitsProps> = ({ character, onChange }) => {
  const classes = useStyles();
  const { compendium } = useCompendium();
  const { baseSkills } = compendium;
  const { attributes, skills } = character;

  return (
    <>
      <Div spacing row className={classes.spaced}>
        {Object.entries(attributes).map(([id, attribute]) => (
          <AttributeView
            key={id}
            characterName={character.name}
            wildDie={character.wildCard ? 6 : undefined}
            attribute={id as AttributeName}
            level={attribute}
            onChange={onChange}
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
              key={String(baseSkill.id)}
              characterName={character.name}
              wildDie={character.wildCard ? 6 : undefined}
              skillId={baseSkill.id}
              level={skill?.level}
              attributes={attributes}
              onChange={onChange}
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

export default memo(CharacterTraits);
