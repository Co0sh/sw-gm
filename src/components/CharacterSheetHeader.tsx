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
  const { origins } = compendium;
  const { name, image, profession, originId } = character;
  const origin = origins.find(byId(originId))!;
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
          {[origin.name, profession].filter(Boolean).join(', ')}
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
