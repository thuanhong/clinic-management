import React from 'react';
import { useStyles } from './styles';

export const NotFound = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <h2>:(((( 404 | This page counld be not found</h2>
    </div>
  );
};
