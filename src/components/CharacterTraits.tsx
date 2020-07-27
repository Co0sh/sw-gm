import React, { FC } from 'react';
import { Div } from './Div';
import { Character, AttributeName } from '../logic/character';
import { AttributeIcon } from './AttributeIcon';
import { Paper, Typography, makeStyles } from '@material-ui/core';
import { DieIcon } from './DieIcon';
import { TraitLevel } from './TraitLevel';
import { byId } from '../logic/byId';
import { useCompendium } from './CompendiumManager';

export interface CharacterTraitsProps {
  character: Character;
}

export const CharacterTraits: FC<CharacterTraitsProps> = ({ character }) => {
  const classes = useStyles();
  const { compendium } = useCompendium();
  const { baseSkills } = compendium;
  const { attributes, skills } = character;
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
        {skills.map(({ skillId, level }) => {
          const skill = baseSkills.find(byId(skillId))!;
          return (
            <Div key={skillId} row justify="space-between" align="center">
              <Typography
                className={classes.skillName}
                variant="h5"
                component="span"
              >
                {skill.shortcut}
              </Typography>
              <TraitLevel
                base={level.base}
                bonus={level.bonus}
                color="primary"
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
