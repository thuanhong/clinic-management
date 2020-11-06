import React from 'react';
import { Drawer } from '@material-ui/core';
import { useStyles } from './styles';

export const SideBar = ({ onClose, open, variant, children }) => {
  const classes = useStyles();

  return (
    <Drawer
      anchor='left'
      classes={{
        paper: classes.root,
      }}
      onClose={onClose}
      open={open}
      variant={variant}
      data-testid='sidebar'
    >
      {children}
    </Drawer>
  );
};
