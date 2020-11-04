import React, {useState} from 'react';
import NextHead from 'next/head';
import { Header } from '@common/Header';
import { BackToTop } from "@common/BackToTop";
import { SideBar } from "@common/SideBar";
import { SideBarMenu } from "@common/SideBarMenu";
import { Footer } from "@common/Footer";
import { useStyles } from './styles';
import Home from '@material-ui/icons/Home';
import DeveloperMode from '@material-ui/icons/DeveloperMode';
import LocalLibrary from '@material-ui/icons/LocalLibrary';
import AccountBox from '@material-ui/icons/AccountBox';
import Toolbar from '@material-ui/core/Toolbar';


export const BaseLayout = (props) => {
  const { children, title, description = '', navPos = 'fixed' } = props;


  const [openSidebar, setOpenSidebar] = useState(false);
  const navItems = [
    {
      id: 1,
      link: '/',
      title: 'Home',
      icon: <Home/>
    },
    {
      id: 2,
      link: '/project',
      title: 'Project',
      icon: <DeveloperMode/>
    },
    {
      id: 3,
      link: '/portfolio',
      title: "Portfolio",
      icon: <AccountBox/>
    },
    {
      id: 4,
      link: '/experience',
      title: "Experience",
      icon: <LocalLibrary/>
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
      <NextHead>
        <title>{title}</title>
        <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no' />
        <meta name='Description' content={description || title}></meta>
      </NextHead>
      <Header onSidebarOpen={handleSidebarOpen} navPos={navPos} listNavItem={navItems} />
      <SideBar onClose={handleSidebarClose} open={openSidebar} variant={'temporary'}>
        <SideBarMenu navItems={navItems} />
      </SideBar>
      <main className={classes.root}>
      <Toolbar id="back-to-top-anchor" />
        {children}
      </main>
      <Footer />
      <BackToTop />
    </>
  );
};
