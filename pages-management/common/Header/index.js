import React, { useState } from 'react';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import Collapse from '@material-ui/core/Collapse';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import NotificationsIcon from '@material-ui/icons/Notifications';
// import NotificationsOffIcon from '@material-ui/icons/NotificationsOff';
import SearchIcon from '@material-ui/icons/Search';
import SettingsIcon from '@material-ui/icons/Settings';
import Toolbar from '@material-ui/core/Toolbar';
import { CookieHandler } from '@utils/Cookies';
import Router from 'next/router';
import { useStyles } from './styles';

export const Header = ({ logo, logoAltText, toggleFullscreen, toggleDrawer, toogleNotifications }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchExpanded, setSearchExpanded] = useState(false);

  const handleSettingdToggle = (event) => setAnchorEl(event.currentTarget);

  const handleCloseMenu = () => setAnchorEl(null);

  const handleSearchExpandToggle = () => setSearchExpanded(!searchExpanded);

  const handleDrawerToggle = () => {
    toggleDrawer();
    if (searchExpanded) handleSearchExpandToggle();
  };

  const handleNotificationToggle = () => {
    toogleNotifications();
    if (searchExpanded) handleSearchExpandToggle();
  };

  const signOut = () => {
    CookieHandler.removeCookie('access_token');
    Router.replace('/login');
  };

  return (
    <AppBar position='static' className={classes.appBar}>
      <Toolbar className={classes.toolBar}>
        <IconButton color='inherit' aria-label='open drawer' onClick={handleDrawerToggle}>
          <MenuIcon />
        </IconButton>

        <div className={classes.branding}>
          <img src={logo} alt={logoAltText} className={classes.logo} />
        </div>

        <Hidden xsDown>
          <div className={classes.searchWrapper}>
            <form className={classes.searchForm}>
              <IconButton aria-label='Search' className={classes.searchIcon}>
                <SearchIcon />
              </IconButton>
              <input className={classes.searchInput} type='text' placeholder='Search' />
            </form>
          </div>
        </Hidden>

        <Hidden smUp>
          <span className='flexSpacer' />
        </Hidden>

        <Hidden smUp>
          <IconButton
            color='inherit'
            onClick={handleSearchExpandToggle}
            aria-expanded={searchExpanded}
            aria-label='Show searchbar'
          >
            <SearchIcon />
          </IconButton>
        </Hidden>

        <Hidden xsDown>
          <IconButton color='inherit' onClick={toggleFullscreen}>
            <FullscreenIcon />
          </IconButton>
        </Hidden>

        <IconButton color='inherit' onClick={handleNotificationToggle}>
          <Badge badgeContent={5} color='secondary'>
            <NotificationsIcon />
          </Badge>
        </IconButton>

        <IconButton
          aria-label='User Settings'
          aria-owns={anchorEl ? 'user-menu' : null}
          aria-haspopup='true'
          color='inherit'
          onClick={handleSettingdToggle}
        >
          <MoreVertIcon />
        </IconButton>

        <Menu id='user-menu' anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
          <MenuItem onClick={handleCloseMenu}>
            <ListItemIcon>
              <AccountBoxIcon />
            </ListItemIcon>
            <ListItemText primary='Profile' />
          </MenuItem>
          <MenuItem onClick={handleCloseMenu}>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary='Settings' />
          </MenuItem>
          {/* <MenuItem onClick={handleCloseMenu}>
            <ListItemIcon>
              <NotificationsOffIcon />
            </ListItemIcon>
            <ListItemText primary='Disable notifications' />
          </MenuItem> */}
          <MenuItem onClick={signOut}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary='Sign out' />
          </MenuItem>
        </Menu>
      </Toolbar>
      <Hidden smUp>
        <Collapse in={searchExpanded} timeout='auto' unmountOnExit>
          <Toolbar className={classes.toolBar}>
            <div className={classes.searchWrapper}>
              <form className={classes.searchForm}>
                <IconButton aria-label='Search' className={classes.searchIcon}>
                  <SearchIcon />
                </IconButton>
                <input className={classes.searchInput} type='text' placeholder='Search' />
              </form>
            </div>
          </Toolbar>
        </Collapse>
      </Hidden>
    </AppBar>
  );
};
