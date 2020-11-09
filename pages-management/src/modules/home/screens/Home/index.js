import React from 'react';
import { BaseLayout } from '@common/BaseLayout';
import { withAuth } from '@hoc/withAuth';
import routes from './routes';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

const HomeScreen = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' render={(props) => <BaseLayout {...props} routes={routes} />} />
      </Switch>
    </BrowserRouter>
  );
};

export default withAuth(HomeScreen);
