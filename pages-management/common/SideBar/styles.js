import makeStyles from '@material-ui/core/styles/makeStyles';
import { drawerWidth } from '@common/styleVariables';

export const useStyles = makeStyles((theme) => ({
  root: {
    width: 240,
    marginTop: 56,
    height: 'calc(100% - 56px)',
    [theme.breakpoints.up('sm')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)',
    },
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
    maxWidth: drawerWidth,
    height: '100%',
    zIndex: theme.zIndex.drawer + 99,
  },
  modal: {
    [theme.breakpoints.down('sm')]: {
      top: '56px!important',
    },
    [theme.breakpoints.up('sm')]: {
      top: '64px!important',
    },
    zIndex: '1000!important',
  },
  backdrop: {
    [theme.breakpoints.down('sm')]: {
      top: '56px',
    },
    [theme.breakpoints.up('sm')]: {
      top: '64px',
    },
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    // overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: 55,
    },
  },
}));
