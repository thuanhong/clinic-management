import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export const AddPatient = () => {
  const classes = useStyles();
  let history = useHistory();

  return (
    <div className={classes.root}>
      <AppBar color='transparent' position='static'>
        <Toolbar>
          <IconButton
            onClick={() => history.push('/patients/all-patients')}
            edge='start'
            className={classes.menuButton}
          >
            <ArrowBackIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
};
