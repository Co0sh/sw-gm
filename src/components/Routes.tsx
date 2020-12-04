import React, { FC, lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { Layout } from './Layout';
import LoadingView from './LoadingView';

const TablePage = lazy(() => import('../pages/TablePage'));
const LocalPage = lazy(() => import('../pages/LocalPage'));

export const Routes: FC = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<LoadingView />}>
          <Switch>
            <Route path="/table/:tableId" component={TablePage} />
            <Route path="/" component={LocalPage} />
          </Switch>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
};
