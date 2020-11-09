import React, { useState } from 'react';
// import { Bar, Bubble } from "react-chartjs-2";
import { StatCard } from '@common/StatCard';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AccessibleOutlinedIcon from '@material-ui/icons/AccessibleOutlined';
import EventOutlinedIcon from '@material-ui/icons/EventOutlined';
import AccountBalanceWalletOutlinedIcon from '@material-ui/icons/AccountBalanceWalletOutlined';
import RateReviewOutlinedIcon from '@material-ui/icons/RateReviewOutlined';

let id = 0;
function createData(name, date, progress) {
  id += 1;
  return { id, name, date, progress };
}

const data = [
  createData('UI prototyping', 'January 23', 67),
  createData('Design', 'February 2', 87),
  createData('Development', 'March 30', 54),
  createData('Testing and delivery', 'April 12', 34),
  createData('Ongoing maintanance', 'May 28', 56),
  createData('Extensive review', 'December 3', 56),
  createData('Extensive testing', 'December 25', 56),
];

export const DashBoard = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  // const chartMenu = (
  //   <Menu id='chart-menu' anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
  //     <MenuItem onClick={handleClose}>
  //       <ListItemIcon>
  //         <SettingsIcon />
  //       </ListItemIcon>
  //       <ListItemText primary='Settings' />
  //     </MenuItem>
  //     <MenuItem onClick={handleClose}>
  //       <ListItemIcon>
  //         <MoreIcon />
  //       </ListItemIcon>
  //       <ListItemText primary='View more' />
  //     </MenuItem>
  //     <MenuItem onClick={handleClose}>
  //       <ListItemIcon>
  //         <NotificationsOffIcon />
  //       </ListItemIcon>
  //       <ListItemText primary='Disable notifications' />
  //     </MenuItem>
  //     <MenuItem onClick={handleClose}>
  //       <ListItemIcon>
  //         <ExitToAppIcon />
  //       </ListItemIcon>
  //       <ListItemText primary='Remove panel' />
  //     </MenuItem>
  //   </Menu>
  // );

  return (
    <div>
      <Grid container p spacing={5}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title='Patients' value={103} IconComponent={AccessibleOutlinedIcon} color='#ff7d00' />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title='Appointments' value={230} IconComponent={EventOutlinedIcon} color='#9c27b0' />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title='Rate' value={323} IconComponent={RateReviewOutlinedIcon} color='#f44336' />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title='Earn' value={870} IconComponent={AccountBalanceWalletOutlinedIcon} color='#3cb371' />
        </Grid>
        {/* {chartMenu} */}
        {/* {mockDashboard.map((chart, index) => (
          <Grid item xs={12} sm={12} md={4} key={index}>
            <Card>
              <CardHeader
                subheader={chart.title}
                action={
                  <IconButton id={`${index}-menu-button`} onClick={handleClick}>
                    <MoreVertIcon />
                  </IconButton>
                }
              />
              <CardContent>
                {chart.type === "bar" && (
                  <Bar
                    data={chart.data}
                    height={chart.height}
                    options={chart.options}
                  />
                )}
                {chart.type === "bubble" && (
                  <Bubble
                    data={chart.data}
                    height={chart.height}
                    options={chart.options}
                  />
                )}
              </CardContent>
            </Card>
          </Grid>
        ))} */}
        <Grid item xs={12} sm={12} md={8}>
          <Paper className='table-responsive'>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Project</TableCell>
                  <TableCell>Due Date</TableCell>
                  <TableCell>Current Progress</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((n) => (
                  <TableRow key={n.id}>
                    <TableCell component='th' scope='row'>
                      {n.name}
                    </TableCell>
                    <TableCell>{n.date}</TableCell>
                    <TableCell>{<LinearProgress variant='determinate' value={n.progress} />}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};
