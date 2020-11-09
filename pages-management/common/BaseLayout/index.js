import React, { useEffect, useState } from 'react';
import { Header } from '@common/Header';
import Sidebar from '@common/Sidebar';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Workspace } from '@common/Workspace';
import Hidden from '@material-ui/core/Hidden';
import { MobileBreakpoint } from '@common/styleVariables';
import SettingsIcon from '@material-ui/icons/Settings';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import { useStyles } from './styles';
import { NotificationCenter } from '@common/NotificationCenter';

export const BaseLayout = ({ history, routes }) => {
  const classes = useStyles();
  const [opened, setOpened] = useState(true);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [openSpeedDial, setOpenSpeedDial] = useState(false);

  const mediaMatcher = matchMedia(`(max-width: ${MobileBreakpoint}px)`);

  const resizeDispatch = () => {
    if (typeof Event === 'function') {
      window.dispatchEvent(new Event('resize'));
    } else {
      const evt = window.document.createEvent('UIEvents');
      evt.initUIEvent('resize', true, false, window, 0);
      window.dispatchEvent(evt);
    }
  };

  const handleDrawerToggle = () => {
    console.log('asdasdasdasdad');
    setOpened(!opened);
    // resizeDispatch();
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

  const handleSpeedDialOpen = () => setOpenSpeedDial(true);

  const handleSpeedDialClose = () => setOpenSpeedDial(false);

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

      <Hidden xsDown>
        <SpeedDial
          ariaLabel='Settings'
          className={classes.speedDial}
          icon={<SpeedDialIcon icon={<SettingsIcon />} />}
          onBlur={handleSpeedDialClose}
          onClose={handleSpeedDialClose}
          onFocus={handleSpeedDialOpen}
          onMouseEnter={handleSpeedDialOpen}
          onMouseLeave={handleSpeedDialClose}
          open={openSpeedDial}
        >
          <SpeedDialAction
            icon={<WbSunnyIcon />}
            tooltipTitle='Toggle light/dark theme'
            onClick={() => dispatch({ type: 'type' })}
          />
        </SpeedDial>
      </Hidden>
    </>
  );
};
