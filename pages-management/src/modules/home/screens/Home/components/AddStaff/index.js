import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { useStyles } from './styles';
import { AddStaffForm } from '../AddStaffForm';

export const AddStaff = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component='h1' variant='h4' align='center'>
            Add New Staff
          </Typography>
          <div>
            <AddStaffForm />
          </div>
        </Paper>
      </div>
    </React.Fragment>
  );
};
