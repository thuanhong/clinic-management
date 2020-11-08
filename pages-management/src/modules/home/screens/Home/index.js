import React from 'react';
import { BaseLayout } from '@common/BaseLayout';
import { withAuth } from '@hoc/withAuth';

const HomeScreen = () => {
  return <BaseLayout title='Home'></BaseLayout>;
};

export default withAuth(HomeScreen);
