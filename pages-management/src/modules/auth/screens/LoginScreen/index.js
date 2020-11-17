import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { useStyles } from './styles';
import { AuthService } from '@services/AuthService';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { CookieHandler } from '@utils/Cookies';
import Router from 'next/router';
import { withAuth } from '@hoc/withAuth';
import { SquareAnimation } from '@common/SquareAnimation';

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='https://material-ui.com/'>
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const LoginScreen = () => {
  const classes = useStyles();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const [disabled, setDisabled] = useState(false);

  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setDisabled(true);
    AuthService.login(userName, password)
      .then((res) => {
        if (res.statusCode === 200) {
          CookieHandler.setCookie('access_token', res.msg.access_token);
          Router.push('/');
        } else {
          setOpen(true);
        }
      })
      .finally(() => {
        setDisabled(false);
      });
  };

  return (
    <Grid container component='main' className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={false} md={7} className={classes.image}>
        <div className={classes.rotated}>
          <SquareAnimation
            color={'#ffc107'}
            style={{ width: '120px', transform: 'translate(150px, -150px)', position: 'static' }}
            angle={60}
          />
          <SquareAnimation
            color={'#007bff'}
            style={{ width: '120px', transform: 'translate(-150px, 75px)', position: 'static' }}
            angle={100}
          />
          <SquareAnimation
            color={'#dc3545'}
            style={{ width: '120px', transform: 'translate(-100px, 300px)', position: 'static' }}
            angle={140}
          />
          <SquareAnimation
            color={'#28a745'}
            style={{ width: '120px', transform: 'translate(-23px, 57px)', position: 'static' }}
            angle={180}
          />
        </div>
      </Grid>
      <Grid item xs={12} sm={12} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert onClose={handleClose} severity='error'>
              Username or password incorrect
            </Alert>
          </Snackbar>
          <form className={classes.form} onSubmit={onSubmit}>
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              label='User Name'
              onChange={(event) => {
                setUserName(event.target.value);
              }}
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              label='Password'
              type='password'
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <FormControlLabel control={<Checkbox value='remember' color='primary' />} label='Remember me' />
            <Button
              type='submit'
              disableElevation
              disabled={disabled}
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
            >
              {disabled ? <CircularProgress /> : 'Sign In'}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href='#' variant='body2'>
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default withAuth(LoginScreen);
