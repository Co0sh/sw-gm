import React, { FC } from 'react';
import { Character, AttributeName } from '../logic/character';
import { Div } from './Div';
import { Typography, makeStyles, Paper } from '@material-ui/core';
import { useCompendium } from './CompendiumManager';
import { byId } from '../logic/byId';
import { TraitLevel } from './TraitLevel';
import { AttributeIcon } from './AttributeIcon';
import { DieIcon } from './DieIcon';
import { ImageView } from './ImageView';
import { cn } from '../logic/cn';

export interface CharacterSheetProps {
  character: Character;
  className?: string;
}

export const CharacterSheet: FC<CharacterSheetProps> = ({
  character,
  className,
}) => {
  const classes = useStyles();
  const { compendium } = useCompendium();
  const { origins, baseSkills } = compendium;
  const { name, image, profession, originId, attributes, skills } = character;
  const origin = origins.find(byId(originId))!;

  return (
    <Div className={cn(classes.root, className)} spacing>
      <Div row spacing className={classes.header}>
        <Div className={classes.image}>
          <ImageView src={image!} alt="Image" />
        </Div>
        <Div>
          <Typography variant="h4" component="h1">
            {[name]}
          </Typography>
          <Typography variant="subtitle1">
            {[origin.name, profession].filter(Boolean).join(', ')}
          </Typography>
        </Div>
      </Div>
      <Div spacing row className={classes.attributes}>
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
    </Div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
  },
  skillName: {
    fontFamily: 'monospace',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  header: {
    paddingBottom: theme.spacing(2),
    paddingTop: theme.spacing(2),
    position: 'sticky',
    top: 0,
    backgroundColor: theme.palette.background.default,
    zIndex: theme.zIndex.appBar,
  },
  image: {
    width: 120,
  },
  attributes: {
    // flexWrap: 'wrap',
  },
  attribute: {
    padding: `${theme.spacing(1)}px 0`,
    marginBottom: theme.spacing(1),
  },
}));
