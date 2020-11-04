import makeStyles from '@material-ui/core/styles/makeStyles';
import { createStyles } from '@material-ui/core';


export const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      height: 264,
      flexGrow: 1,
      maxWidth: 400,
      backgroundColor: '#224C9C'
    },
    rootItem: {
      color: theme.palette.text.secondary,
      '&:focus > $content': {
        backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
        color: 'var(--tree-view-color)',
      },
    },
    content: {
      color: theme.palette.text.secondary,
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      paddingRight: theme.spacing(1),
      fontWeight: theme.typography.fontWeightMedium,
      '$expanded > &': {
        fontWeight: theme.typography.fontWeightRegular,
      },
    },
    group: {
      marginLeft: 0,
      '& $content': {
        paddingLeft: theme.spacing(2),
      },
    },
    expanded: {},
    label: {
      fontWeight: 'inherit',
      color: 'inherit',
    },
    labelRoot: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0.5, 0),
    },
    labelIconContainer: {
      width: 24,
      height: 24,
      marginRight: theme.spacing(1),
    },
    labelIcon: {},
    labelText: {
      fontWeight: 'inherit',
      flexGrow: 1,
    },
    link: {
      textDecoration: 'none',
    },
    defaultEndIcon: {
      width: 24,
    },
    btnAccount: {
      display: 'block',
      textAlign: 'center',
      marginRight: 40,
    },
  }),
);