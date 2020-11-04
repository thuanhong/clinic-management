import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { useStyles } from './styles';
import logo from '../../assets/images/logo.svg';

export const Header = (props) => {
  const { listNavItem, navPos, onSidebarOpen } = props;
  const renderNavItem = (navItem) => (
    <NavLink to={navItem.link} key={navItem.title}>
      <Button color='primary'>
        {navItem.icon}
        <span>{navItem.title}</span>
      </Button>
    </NavLink>
  );

  const classes = useStyles();
  return (
    <div className={classes.flexGrow}>
      <AppBar position={navPos} style={{ backgroundColor: '#ffffff', opacity: 0.7 }}>
        <Toolbar>
          <img height={50} src={logo} alt='logo' />
          {/* <div className={classes.flexGrow}></div> */}
          <Hidden smDown implementation='css'>
            {listNavItem.map((navItem) => renderNavItem(navItem))}
          </Hidden>
          <Hidden mdUp>
            <IconButton color='primary' onClick={onSidebarOpen} data-testid='menu-icon' aria-label='menu'>
              <MenuIcon />
            </IconButton>
          </Hidden>
        </Toolbar>
      </AppBar>
    </div>
  );
};
