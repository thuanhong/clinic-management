import makeStyles from '@material-ui/core/styles/makeStyles';
import coverBg from '@images/home-four-shape-1.png';

export const useStyles = makeStyles((theme) => ({
  coverImage: {
    margin: 0,
    backgroundSize: 'cover',
    backgroundColor: '#e6f7fc',
    backgroundImage: `url(${coverBg})`,
    overflow: 'hidden',
    padding: 20,
  },
  headingContent: {
    fontFamily: 'Avenir',
    fontStyle: 'normal',
    paddingTop: '10vh',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.8rem',
      textAlign: 'center',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '1.5rem',
    },
    '& > p': {
      fontSize: '1.3vw',
      marginTop: 30,
      marginBottom: 30,
    },
    '& > h1': {
      fontSize: '3.5vw',
    },
  },
  activeButton: {
    background: 'linear-gradient(90deg, #0098D1 0%, #CC70ED 100%)',
    borderRadius: 99,
    color: 'white',
    fontWeight: 800,
    padding: 7,
    [theme.breakpoints.down('sm')]: {
      margin: 'auto',
      display: 'block',
    },
  },
  doctorImgStyle: {
    position: 'absolute',
    zIndex: 99,
    left: '16%',
    bottom: -40,
    width: '66%',
  },
}));
