import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    width: '100%',
    margin: 40,
    display: 'flex',
    justifyContent: 'space-around',
  },
}));

const StyledTab = withStyles(() => ({
  root: {
    textTransform: 'none',
    color: '#fff',
    width: 30,
    padding: 10,
    margin: 10,
    '&:focus': {
      opacity: 1,
    },
  },
}))((props) => <Tab disableRipple {...props} />);

const StyledTabs = withStyles({
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    '& > span': {
      maxWidth: 70,
      width: '100%',
      backgroundColor: '#0477F6',
    },
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

export const ScrollableTabs = (props) => {
  const { value, handleChange } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar style={{ backgroundColor: 'transparent' }} position='static'>
        <StyledTabs
          value={value}
          onChange={handleChange}
          variant='scrollable'
          scrollButtons='auto'
          aria-label='scrollable auto tabs example'
          style={{ margin: 'auto' }}
          TabIndicatorProps={<span></span>}
        >
          <StyledTab label='All' {...a11yProps(0)} />
          <StyledTab label='Frontend' {...a11yProps(1)} />
          <StyledTab label='Backend' {...a11yProps(2)} />
          <StyledTab label='Mobile' {...a11yProps(3)} />
        </StyledTabs>
      </AppBar>
    </div>
  );
};
