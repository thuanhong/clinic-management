import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  content: {
    position: 'relative',
    padding: 0,
    paddingBottom: '0 !important',
  },
  iconFloat: {
    borderWidth: 1,
    borderRadius: '100%',
    borderStyle: 'solid',
    padding: 25,
  },
}));
