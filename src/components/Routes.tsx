import React, { FC } from 'react';
import { Route, Switch } from 'react-router';
import { DicePage } from '../pages/DicePage';
import { CardsPage } from '../pages/CardsPage';
import { DiceHistoryPage } from '../pages/DiceHistoryPage';
import { CharactersPage } from '../pages/CharactersPage';

export const Routes: FC = () => {
  return (
    <Switch>
      <Route exact path="/" component={DicePage} />
      <Route exact path="/cards" component={CardsPage} />
      <Route exact path="/history" component={DiceHistoryPage} />
      <Route exact path="/characters" component={CharactersPage} />
    </Switch>
  );
};
