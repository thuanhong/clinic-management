import React, { useState } from 'react';
import { Header } from './components/Header';
import { BackToTop } from './components/BackToTop';
import { SideBar } from './components/SideBar';
import { SideBarMenu } from './components/SideBarMenu';
import { Footer } from './components/Footer';
import Home from '@material-ui/icons/Home';
import DeveloperMode from '@material-ui/icons/DeveloperMode';
import LocalLibrary from '@material-ui/icons/LocalLibrary';
import AccountBox from '@material-ui/icons/AccountBox';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import {
  BrowserRouter as Router,
  // Switch,
  Route,
} from 'react-router-dom';

const useStyles = makeStyles(() => ({
  root: {
    margin: 0,
    padding: 0,
  },
}));

const App = (props) => {
  const { navPos = 'fixed' } = props;

  const [openSidebar, setOpenSidebar] = useState(false);
  const navItems = [
    {
      id: 1,
      link: '/home',
      title: 'Home',
      icon: <Home />,
    },
    {
      id: 2,
      link: '/about-us',
      title: 'About Us',
      icon: <DeveloperMode />,
    },
    {
      id: 3,
      link: '/department',
      title: 'Department',
      icon: <AccountBox />,
    },
    {
      id: 4,
      link: '/contact',
      title: 'Contact',
      icon: <LocalLibrary />,
    },
  ];

  const classes = useStyles();

  const handleSidebarOpen = () => {
    setOpenSidebar(() => true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(() => false);
  };

  return (
    <>
      <Router>
        <div>
          <Header onSidebarOpen={handleSidebarOpen} navPos={navPos} listNavItem={navItems} />
          <SideBar onClose={handleSidebarClose} open={openSidebar} variant={'temporary'}>
            <SideBarMenu navItems={navItems} />
          </SideBar>
          <main className={classes.root}>
            <Toolbar id='back-to-top-anchor' />
            {/* <Switch> */}
            <Route path='/home'>
              <h1>home</h1>
            </Route>
            <Route path='/about-us'>
              <h1>about</h1>
            </Route>
            <Route path='/department'>
              <h1>department</h1>
            </Route>
            {/* </Switch> */}
          </main>
          <Footer />
          <BackToTop />
        </div>
      </Router>
    </>
  );
};

export default App;
