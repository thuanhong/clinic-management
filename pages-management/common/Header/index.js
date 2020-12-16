import React, { useState } from 'react';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import AppBar from '@material-ui/core/AppBar';
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
import Toolbar from '@material-ui/core/Toolbar';
import { CookieHandler } from '@utils/Cookies';
import Router from 'next/router';
import { useStyles } from './styles';

export const Header = ({ logo, logoAltText, toggleFullscreen, toggleDrawer }) => {
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
          <div className={classes.searchWrapper} />
        </Hidden>

        <Hidden xsDown>
          <IconButton color='inherit' onClick={toggleFullscreen}>
            <FullscreenIcon />
          </IconButton>
        </Hidden>

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
          <Toolbar className={classes.toolBar}></Toolbar>
        </Collapse>
      </Hidden>
    </AppBar>
  );
};
