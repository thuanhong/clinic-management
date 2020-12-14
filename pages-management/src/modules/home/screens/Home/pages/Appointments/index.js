import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { PatientForm } from '@common/PatientForm';
import { useStyles } from './styles';

export const Appointments = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component='h1' variant='h4' align='center'>
            Add New Appointments
          </Typography>
          <PatientForm />
        </Paper>
      </div>
    </React.Fragment>
  );
};
