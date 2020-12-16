import React from 'react';
import classNames from 'classnames';
import { useStyles } from './styles';

export const Workspace = ({ children, opened }) => {
  const classes = useStyles();
  return (
    <main
      className={classNames(classes.content, classes['content-left'], {
        [classes.contentShift]: opened,
        [classes['contentShift-left']]: opened,
      })}
    >
      {children}
    </main>
  );
};
