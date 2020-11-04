import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {useStyles} from './styles';

export const Header = (props) => {
    const {listNavItem, navPos, onSidebarOpen} = props;
    const renderNavItem = (navItem) => (
        <Link href={navItem.link} key={navItem.title}>
            <Button color='secondary'>
                {navItem.icon}
                <span>{navItem.title}</span>
            </Button>
        </Link>
    );

    const classes = useStyles();
    return (
        <div className={classes.flexGrow}>
            <AppBar position={navPos} style={{backgroundColor: '#0c0f16', opacity: 0.7}}>
                <Toolbar>
                    <img height={50} src={`/static/logo.svg`} alt='logo' />
                    <div className={classes.flexGrow}></div>
                    <Hidden smDown implementation='css'>
                        {listNavItem.map(navItem => (
                            renderNavItem(navItem)
                        ))}
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
}
