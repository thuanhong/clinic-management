import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  content: {
    position: 'relative',
    padding: theme.spacing(1),
    '&:last-child': {
      padding: 0,
    },
  },
  iconFloat: {
    borderWidth: 1,
    borderRadius: '100%',
    borderStyle: 'solid',
    padding: 25,
  },
}));
