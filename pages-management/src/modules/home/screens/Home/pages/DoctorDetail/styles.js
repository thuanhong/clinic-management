import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  leftLayout: {
    padding: 20,
    backgroundColor: '#fff',
    border: '1px solid #e1e4e8',
    '& > .patient': {
      textAlign: 'center',
    },
  },
  patientName: {
    fontSize: 25,
  },
  title: {
    color: '#96a2b4',
  },
  value: {
    fontSize: 14,
    color: '#555',
    paddingLeft: 15,
  },
  info: {
    borderBottom: '1px solid rgba(0,0,0,.1)',
  }
}));
