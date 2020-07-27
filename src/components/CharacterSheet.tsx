import React, { FC, useState } from 'react';
import { Character } from '../logic/character';
import { Div } from './Div';
import { makeStyles, Tabs, Tab } from '@material-ui/core';
import { cn } from '../logic/cn';
import { CharacterSheetHeader } from './CharacterSheetHeader';
import { CharacterTraits } from './CharacterTraits';

export interface CharacterSheetProps {
  character: Character;
  className?: string;
}

export const CharacterSheet: FC<CharacterSheetProps> = ({
  character,
  className,
}) => {
  const classes = useStyles();
  const [tab, setTab] = useState(0);

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
      {tab === 0 && <CharacterTraits character={character} />}
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
}));
