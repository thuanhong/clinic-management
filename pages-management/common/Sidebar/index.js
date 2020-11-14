import React, { useState } from 'react';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import SidebarItem from '@common/SidebarItem';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { withRouter } from 'react-router-dom';
import withWidth from '@material-ui/core/withWidth';
import { useStyles } from './styles';
import classNames from 'classnames';

const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

const Sidebar = ({ opened, toggleDrawer, routes, location }) => {
  const classes = useStyles();
  const [activeRoute, setActiveRoute] = useState(undefined);
  const toggleMenu = (index) => setActiveRoute(activeRoute === index ? undefined : index);

  const menu = (
    <List component='div'>
      {routes.map((route, index) => {
        const isCurrentPath = location.pathname.indexOf(route.path) > -1 ? true : false;
        return (
          <SidebarItem
            key={index}
            index={index}
            route={route}
            activeRoute={activeRoute}
            toggleMenu={toggleMenu}
            currentPath={isCurrentPath}
          />
        );
      })}
    </List>
  );

  return (
    <>
      <Hidden smDown>
        <Drawer
          variant='permanent'
          className={classNames(classes.drawerPaper, {
            [classes.drawerOpen]: opened,
            [classes.drawerClose]: !opened,
          })}
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerOpen]: opened,
              [classes.drawerClose]: !opened,
            }),
          }}
          open={opened}
          ModalProps={{
            keepMounted: false,
            className: classes.modal,
            BackdropProps: {
              className: classes.backdrop,
            },
            onBackdropClick: toggleDrawer,
          }}
        >
          {menu}
        </Drawer>
      </Hidden>
      <Hidden mdUp>
        <SwipeableDrawer
          variant='temporary'
          classes={{
            paper: classes.drawerPaper,
          }}
          open={opened}
          onClose={toggleDrawer}
          onOpen={toggleDrawer}
          disableBackdropTransition={!iOS}
          ModalProps={{
            keepMounted: false,
            className: classes.modal,
            BackdropProps: {
              className: classes.backdrop,
            },
            onBackdropClick: toggleDrawer,
          }}
        >
          {menu}
        </SwipeableDrawer>
      </Hidden>
    </>
  );
};

const SidebarWithRouter = withRouter(Sidebar);

export default withWidth()(SidebarWithRouter);
