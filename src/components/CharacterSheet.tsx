import React, { FC } from 'react';
import { Character } from '../logic/character';
import { Div } from './Div';
import { Typography, List, ListItem } from '@material-ui/core';
import { useCompendium } from './CompendiumManager';
import { byId } from '../logic/byId';

export interface CharacterSheetProps {
  character: Character;
  className?: string;
}

export const CharacterSheet: FC<CharacterSheetProps> = ({
  character,
  className,
}) => {
  const { compendium } = useCompendium();
  const { origins, baseSkills } = compendium;
  const { name, originId, attributes, skills } = character;
  const origin = origins.find(byId(originId))!;

  return (
    <Div className={className}>
      <Typography variant="h4" component="h1">
        {name}
      </Typography>
      <Typography variant="subtitle1">{origin.name}</Typography>
      <List>
        {Object.entries(attributes).map(([id, attribute]) => (
          <ListItem>
            {id}: {attribute.base} {attribute.bonus && `+${attribute.bonus}`}
          </ListItem>
        ))}
      </List>
      <List>
        {skills.map(({ skillId, level }) => {
          const skill = baseSkills.find(byId(skillId))!;
          return (
            <ListItem>
              {skill.name}: {level.base} {level.bonus && `+${level.bonus}`}
            </ListItem>
          );
        })}
      </List>
    </Div>
  );
};
