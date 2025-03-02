// imports the React Javascript Library
import React from 'react';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import red from '@material-ui/core/colors/red';
import blue from '@material-ui/core/colors/blue';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import axios from 'axios';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
  },
  icon: {
    margin: theme.spacing(2),
  },
  iconHover: {
    margin: theme.spacing(2),
    '&:hover': {
      color: red[800],
    },
  },
  cardHeader: {
    textalign: 'center',
    align: 'center',
    backgroundColor: 'white',
  },
  input: {
    display: 'none',
  },
  title: {
    color: blue[800],
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
    align: 'center',
  },
  button: {
    color: blue[900],
    margin: 10,
  },
  secondaryButton: {
    color: 'gray',
    margin: 10,
  },
  typography: {
    margin: theme.spacing(2),
    backgroundColor: 'default',
  },

  searchRoot: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  searchInput: {
    marginLeft: 8,
    flex: 1,
  },
  searchIconButton: {
    padding: 10,
  },
  searchDivider: {
    width: 1,
    height: 28,
    margin: 4,
  },
});

class ImageUploadCard extends React.Component {
  state = {
    imageUploaded: 0,
    selectedFile: null,
    open: false,
  };

  handleUploadClick = (event) => {
    let file = event.target.files[0];
    const reader = new FileReader();
    let url = reader.readAsDataURL(file);

    reader.onloadend = function(e) {
      console.log(file);
      if (file.size / 1000 > 500) {
        this.setState({ open: true });
        return;
      }
      this.setState({
        selectedFile: [reader.result],
      });
      this.props.updateImage(reader.result);
    }.bind(this);

    this.setState({
      imageUploaded: 1,
    });
  };

  renderInitialState() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <CardContent>
          <Grid container justify='flex-start' alignItems='center'>
            <Button
              variant='contained'
              color='default'
              className={classes.button}
              startIcon={<AddPhotoAlternateIcon />}
              component='label'
            >
              Upload
              <input
                accept='image/*'
                className={classes.input}
                id='contained-button-file'
                type='file'
                onChange={this.handleUploadClick}
              />
            </Button>
          </Grid>
        </CardContent>
      </React.Fragment>
    );
  }

  renderUploadedState() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <CardActionArea style={{ width: '60%' }} onClick={this.imageResetHandler}>
          <img
            width='100%'
            className={classes.media}
            src={this.state.selectedFile || 'http://via.placeholder.com/300x200'}
            alt='Temporary Patient Avatar'
          />
        </CardActionArea>
      </React.Fragment>
    );
  }

  imageResetHandler = () => {
    this.setState({
      selectedFile: null,
      imageUploaded: 0,
    });
    this.props.updateImage('');
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <div className={classes.root}>
          <div>{this.renderUploadedState()}</div>
          <div>{this.renderInitialState()}</div>
          <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={this.state.open}
            autoHideDuration={6000}
            onClose={(e, r) => this.handleClose(e, r)}
          >
            <Alert onClose={this.handleClose} severity='error'>
              Your too big
            </Alert>
          </Snackbar>
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ImageUploadCard);
