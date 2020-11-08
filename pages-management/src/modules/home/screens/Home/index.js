import React from 'react';
import { BaseLayout } from '@common/BaseLayout';
import { withAuth } from '@hoc/withAuth';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

const HomeScreen = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route path='/' component={BaseLayout} />
      </Switch>
    </BrowserRouter>
  );
};

export default withAuth(HomeScreen);
