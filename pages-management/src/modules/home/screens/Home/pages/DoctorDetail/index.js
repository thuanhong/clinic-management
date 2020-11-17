import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { useStyles } from './styles';
import Paper from '@material-ui/core/Paper';

export const DoctorDetail = () => {
  const classes = useStyles();
  let history = useHistory();
  const data = useLocation().state.data;

  return (
    <div className={classes.root}>
      {/* <AppBar color='transparent' position='static'> */}
      <Toolbar>
        <IconButton onClick={() => history.push('/patients/all-patients')} edge='start' className={classes.menuButton}>
          <ArrowBackIcon color={'#0098d1'} />
        </IconButton>
        <h2 style={{ color: '#212121' }}>Doctor Detail</h2>
      </Toolbar>
      {/* </AppBar> */}
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12} md={4}>
          <Paper className={classes.leftLayout}>
            <img style={{ width: '100%' }} src={'https://picsum.photos/300/200'} alt='patient' />
            <div className='patient'>
              <p className={classes.patientName}>{data.FirstName + ' ' + data.LastName}</p>
              <p className={classes.date}>{data.Gender}</p>
            </div>
            <div className={classes.info}>
              <p className={classes.title}>Address:</p>
              <p className={classes.value}>{data.Address}</p>
            </div>
            <div className={classes.info}>
              <p className={classes.title}>Date of Birth:</p>
              <p className={classes.value}>{data.Birth}</p>
            </div>
            <div className={classes.info}>
              <p className={classes.title}>Mobile:</p>
              <p className={classes.value}>{data.Mobile}</p>
            </div>
            <div className={classes.info}>
              <p className={classes.title}>Age:</p>
              <p className={classes.value}>{data.Age}</p>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <div className={classes.rightLayout}>
            <Paper>
              
            </Paper>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
