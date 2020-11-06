import { createMuiTheme } from '@material-ui/core/styles';

// Create a theme instance.
export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0098D1',
    },
    secondary: {
      main: '#fff',
    },
    error: {
      main: '#CC0202',
    },
    background: {
      default: '#fff',
    },
  },
  typography: {
    button: {
      textTransform: 'capitalize',
    },
    fontFamily: 'Roboto, sans-serif',
  },
});
