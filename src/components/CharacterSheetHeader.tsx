import React, { Dispatch, FC, useState } from 'react';
import { Character } from '../logic/character';
import { makeStyles, Typography } from '@material-ui/core';
import { Div } from './Div';
import { ImageView } from './ImageView';
import { useCompendium } from './CompendiumManager';
import { byId } from '../logic/byId';
import defaultCharacter from '../assets/defaultCharacter.svg';
import { CharacterAction } from '../logic/characterReducer';
import EditableTypography from './EditableTypography';
import { CharacterImageEditDialog } from './CharacterImageEditDialog';

export interface CharacterSheetHeaderProps {
  character: Character;
  onChange?: Dispatch<CharacterAction>;
  className?: string;
}

export const CharacterSheetHeader: FC<CharacterSheetHeaderProps> = ({
  character,
  onChange,
  className,
}) => {
  const classes = useStyles();
  const [editImg, setEditImg] = useState(false);
  const { compendium } = useCompendium();
  const { baseOrigins } = compendium;
  const { name, image, origin } = character;
  const baseOrigin = origin
    ? baseOrigins.find(byId(origin.originId))
    : undefined;
  const displayOrigin = [baseOrigin?.name, origin?.individualName]
    .filter(Boolean)
    .join(', ');
  return (
    <Div row spacing className={className}>
      <Div className={classes.image}>
        <ImageView
          onClick={onChange ? () => setEditImg(true) : undefined}
          src={image ?? defaultCharacter}
          alt="Image"
        />
        {onChange && (
          <CharacterImageEditDialog
            open={editImg}
            onClose={() => setEditImg(false)}
            initialValue={image}
            onAccept={(src) => onChange({ type: 'setImage', src })}
          />
        )}
      </Div>
      <Div grows>
        <Typography variant="caption">Name</Typography>
        <EditableTypography
          value={name}
          onChange={
            onChange ? (name) => onChange({ type: 'rename', name }) : undefined
          }
          variant="h4"
          component="p"
        />
        {displayOrigin && (
          <>
            <Typography variant="caption">Origin</Typography>
            <Typography variant="subtitle1">{displayOrigin}</Typography>
          </>
        )}
      </Div>
    </Div>
  );
};

const useStyles = makeStyles((theme) => ({
  image: {
    width: 120,
    flexShrink: 0,
  },
}));
