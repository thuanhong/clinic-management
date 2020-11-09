import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  content: {
    backgroundColor: theme.palette.background.default,
    minWidth: 0,
    width: '100%',
    position: 'relative',
    display: 'block',
    [theme.breakpoints.up('sm')]: {
      overflowY: 'auto',
      overflowX: 'hidden',
    },
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    '-webkit-overflow-scrolling': 'touch',
  },
  'content-left': {
    [theme.breakpoints.up('md')]: {
      padding: 30,
    },
    [theme.breakpoints.down('md')]: {
      padding: 20,
    },
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  'contentShift-left': {
    marginLeft: 20,
  },
  'contentShift-right': {
    marginRight: 0,
  },
}));
