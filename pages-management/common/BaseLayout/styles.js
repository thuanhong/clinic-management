import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  panel: {
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
    maxWidth: '100%',
    [theme.breakpoints.down('sm')]: {
      height: 'auto',
      minHeight: 'calc(100vh - 64px)',
      paddingTop: '64px',
    },
    [theme.breakpoints.down('xs')]: {
      height: 'auto',
      minHeight: 'calc(100vh - 56px)',
      paddingTop: '56px',
    },
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100vh - 64px)',
    },
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
  },
  speedDial: {
    position: 'absolute',
    bottom: theme.spacing(1) * 2,
    right: theme.spacing(1) * 3,
  },
}));
