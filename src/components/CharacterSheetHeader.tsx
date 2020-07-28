import React, { FC } from 'react';
import { Character } from '../logic/character';
import { makeStyles, Typography } from '@material-ui/core';
import { Div } from './Div';
import { ImageView } from './ImageView';
import { useCompendium } from './CompendiumManager';
import { byId } from '../logic/byId';

export interface CharacterSheetHeaderProps {
  character: Character;
  className?: string;
}

export const CharacterSheetHeader: FC<CharacterSheetHeaderProps> = ({
  character,
  className,
}) => {
  const classes = useStyles();
  const { compendium } = useCompendium();
  const { baseOrigins } = compendium;
  const { name, image, origin } = character;
  const baseOrigin = origin
    ? baseOrigins.find(byId(origin.originId))
    : undefined;
  return (
    <Div row spacing className={className}>
      <Div className={classes.image}>
        <ImageView src={image!} alt="Image" />
      </Div>
      <Div>
        <Typography variant="h4" component="h1">
          {[name]}
        </Typography>
        <Typography variant="subtitle1">
          {[baseOrigin?.name, origin?.individualName]
            .filter(Boolean)
            .join(', ')}
        </Typography>
      </Div>
    </Div>
  );
};

const useStyles = makeStyles((theme) => ({
  image: {
    width: 120,
  },
}));
