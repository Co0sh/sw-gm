import React, { FC } from 'react';
import { CssBaseline } from '@material-ui/core';
import { Route, Switch } from 'react-router-dom';
import { Layout } from './Layout';
import DicePage from '../pages/DicePage';
import CardsPage from '../pages/CardsPage';

const App: FC = () => {
  return (
    <Layout>
      <CssBaseline />

      <Switch>
        <Route exact path="/" component={DicePage} />
        <Route exact path="/cards" component={CardsPage} />
      </Switch>
    </Layout>
  );
};

export default App;
