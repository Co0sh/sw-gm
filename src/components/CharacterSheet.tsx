import React, { FC, useState } from 'react';
import { makeStyles, Tabs, Tab, Fab } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import { Character } from '../logic/character';
import { Div } from './Div';
import { cn } from '../logic/cn';
import { CharacterSheetHeader } from './CharacterSheetHeader';
import { CharacterTraits } from './CharacterTraits';

export interface CharacterSheetProps {
  character: Character;
  onChange?: (character: Character) => void;
  className?: string;
}

export const CharacterSheet: FC<CharacterSheetProps> = ({
  character: initialCharacter,
  onChange,
  className,
}) => {
  const classes = useStyles();
  const [tab, setTab] = useState(0);
  const [character, setCharacter] = useState(initialCharacter);
  const [editing, setEditing] = useState(false);

  const handleSave = () => {
    onChange?.(character);
  };

  return (
    <Div className={cn(classes.root, className)} spacing>
      <CharacterSheetHeader character={character} className={classes.header} />
      <Tabs
        variant="fullWidth"
        value={tab}
        onChange={(_, newTab) => setTab(newTab)}
      >
        <Tab className={classes.tab} label="Traits" />
        <Tab className={classes.tab} label="Info" />
        <Tab className={classes.tab} label="Items" />
        <Tab className={classes.tab} label="Powers" />
      </Tabs>
      {tab === 0 && (
        <CharacterTraits
          character={character}
          onChange={editing ? setCharacter : undefined}
        />
      )}
      <Fab
        color="secondary"
        className={classes.fab}
        onClick={() => {
          if (editing) {
            handleSave();
          }
          setEditing(!editing);
        }}
      >
        {!editing ? <EditIcon /> : <SaveIcon />}
      </Fab>
    </Div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
  },
  header: {
    paddingTop: theme.spacing(2),
    position: 'sticky',
    top: 0,
    backgroundColor: theme.palette.background.default,
    zIndex: theme.zIndex.appBar,
  },
  tab: {
    minWidth: 'auto',
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: 0,
  },
}));
