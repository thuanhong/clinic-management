import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

// eslint-disable-next-line require-jsdoc
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

// eslint-disable-next-line require-jsdoc
function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 224,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export const VerticalTabs = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation='vertical'
        value={value}
        onChange={handleChange}
        aria-label='Vertical tabs example'
        className={classes.tabs}
      >
        <Tab label='Company examination service' {...a11yProps(0)} />
        <Tab label='Beauty services' {...a11yProps(1)} />
        <Tab label='Dental service' {...a11yProps(2)} />
        <Tab label='Laboratory services' {...a11yProps(3)} />
        <Tab label='Health Insurance Service' {...a11yProps(4)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        Medical Clinic organizes periodic health check-ups for corporate units according to Circular 14 of the Ministry
        of Health.
      </TabPanel>
      <TabPanel value={value} index={1}>
        With a team of doctors with deep expertise and rich experience, the equipment is invested in the most advanced
        and modern.
      </TabPanel>
      <TabPanel value={value} index={2}>
        As one of the medical examination and treatment departments with a long history of operation and the most
        achievements of Ky Hoa Medical Center - Ky Hoa Dental Clinic we always have many
      </TabPanel>
      <TabPanel value={value} index={3}>
        Clinical testing has always played a particularly important role, and is of great significance in the medical
        examination and treatment process.
      </TabPanel>
      <TabPanel value={value} index={4}>
        With the mission of Activities for the benefit of public health, Ky Hoa Medical Center always focuses on
        providing the best services to all classes of customers.
      </TabPanel>
    </div>
  );
};
