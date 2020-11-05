import React, { Fragment } from 'react';
import { CoverImage } from '@components/CoverImage';
import { VerticalTabs } from '@components/VerticalTabs';

const Home = () => (
  <Fragment>
    {/* <h1>React Webpack Babel Starter Kit</h1>

    <p>
      Tired of complicated starters with 200MB of dependencies which are hard to understand and modify? This is for you!
    </p> */}
    <CoverImage />
    <VerticalTabs />
  </Fragment>
);

export default Home;
