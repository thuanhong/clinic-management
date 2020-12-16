import React, { useEffect, useState } from 'react';
import { Header } from '@common/Header';
import Sidebar from '@common/Sidebar';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Workspace } from '@common/Workspace';
import { MobileBreakpoint } from '@common/styleVariables';
import { useStyles } from './styles';
import { NotificationCenter } from '@common/NotificationCenter';

export const BaseLayout = ({ history, routes }) => {
  const classes = useStyles();
  const [opened, setOpened] = useState(true);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const mediaMatcher = matchMedia(`(max-width: ${MobileBreakpoint}px)`);

  const handleDrawerToggle = () => {
    setOpened(!opened);
  };

  const handleNotificationToggle = () => setNotificationsOpen(!notificationsOpen);

  const handleFullscreenToggle = () => {
    const element = document.querySelector('#root');
    const isFullscreen = document.webkitIsFullScreen || document.mozFullScreen || false;

    element.requestFullScreen =
      element.requestFullScreen ||
      element.webkitRequestFullScreen ||
      element.mozRequestFullScreen ||
      function() {
        return false;
      };
    document.cancelFullScreen =
      document.cancelFullScreen ||
      document.webkitCancelFullScreen ||
      document.mozCancelFullScreen ||
      function() {
        return false;
      };
    isFullscreen ? document.cancelFullScreen() : element.requestFullScreen();
  };

  const getRoutes = (
    <Switch>
      {routes.items.map((item, index) =>
        item.type === 'external' ? (
          <Route exact path={item.path} component={item.component} name={item.name} key={index} />
        ) : item.type === 'submenu' ? (
          item.children.map((subItem, index) => (
            <Route
              key={index}
              exact
              path={`${item.path}${subItem.path}`}
              component={subItem.component}
              name={subItem.name}
            />
          ))
        ) : (
          <Route exact path={item.path} component={item.component} name={item.name} key={index} />
        ),
      )}
      <Redirect to='/404' />
    </Switch>
  );

  useEffect(() => {
    if (mediaMatcher.matches) setOpened(false);
    mediaMatcher.addListener((match) => {
      setTimeout(() => {
        if (match.matches) setOpened(false);
        else setOpened(true);
      }, 300);
    });

    const unlisten = history.listen(() => {
      if (mediaMatcher.matches) setOpened(false);
      document.querySelector('#root main').scrollTop = 0;
    });

    return () => {
      unlisten();
      mediaMatcher.removeListener((match) => {
        setTimeout(() => {
          if (match.matches) setOpened(false);
          else setOpened(true);
        }, 300);
      });
    };
  }, []);

  return (
    <>
      <Header
        logoAltText='Clinic Management'
        logo={'/static/images/LOG.png'}
        toggleDrawer={handleDrawerToggle}
        toogleNotifications={handleNotificationToggle}
        toggleFullscreen={handleFullscreenToggle}
      />
      <div className={classes.panel}>
        <Sidebar routes={routes.items} opened={opened} toggleDrawer={handleDrawerToggle} />
        <Workspace opened={opened}>{getRoutes}</Workspace>
        <NotificationCenter notificationsOpen={notificationsOpen} toogleNotifications={handleNotificationToggle} />
      </div>
    </>
  );
};
