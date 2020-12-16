import React from 'react';
import { BaseLayout } from '@common/BaseLayout';
import { withAuth } from '@hoc/withAuth';
import routes from './routes';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

const HomeScreen = ({ groupNumber }) => {
  const checkRoutes = {
    1: routes.adminRoutes,
    2: routes.doctorRoutes,
    3: routes.nurseRoutes,
  };

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' render={(props) => <BaseLayout {...props} routes={checkRoutes[groupNumber]} />} />
      </Switch>
    </BrowserRouter>
  );
};

export default withAuth(HomeScreen);
