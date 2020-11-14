import React from 'react';
import { StatCard } from '@common/StatCard';
import Grid from '@material-ui/core/Grid';
import CardHeader from '@material-ui/core/CardHeader';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { mockPatientsStatistic } from '@app/mock';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import AccessibleOutlinedIcon from '@material-ui/icons/AccessibleOutlined';
import EventOutlinedIcon from '@material-ui/icons/EventOutlined';
import AccountBalanceWalletOutlinedIcon from '@material-ui/icons/AccountBalanceWalletOutlined';
import RateReviewOutlinedIcon from '@material-ui/icons/RateReviewOutlined';
import { MultiAxisLine } from '@common/Chart';
import { withStyles } from '@material-ui/core/styles';

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'New Patients',
      data: [300, 340, 158, 217, 259, 168, 197, 250, 343, 374, 313, 318],
      fill: false,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgba(255, 99, 132, 0.2)',
      yAxisID: 'y-axis-1',
    },
    {
      label: 'Old Patients',
      data: [257, 240, 242, 275, 288, 344, 265, 205, 367, 236, 226, 365],
      fill: false,
      backgroundColor: 'rgb(54, 162, 235)',
      borderColor: 'rgba(54, 162, 235, 0.2)',
      yAxisID: 'y-axis-2',
    },
  ],
};

const options = {
  scales: {
    yAxes: [
      {
        type: 'linear',
        display: true,
        position: 'left',
        id: 'y-axis-1',
      },
      {
        type: 'linear',
        display: true,
        position: 'right',
        id: 'y-axis-2',
        gridLines: {
          drawOnArea: false,
        },
      },
    ],
  },
};

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#0098d1',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

export const DashBoard = () => {
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

        <Grid item xs={12} sm={12} md={12}>
          <Card elevation={10}>
            <CardHeader title='Clinic Survey' />
            <CardContent>
              <MultiAxisLine data={data} options={options} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={12} md={12}>
          <Card elevation={10} className='table-responsive'>
            <CardHeader title='Patient Statistic' />
            <CardContent>
              <Table style={{ maxHeight: '200vh', overflowY: 'scroll' }} size='medium' aria-label='a dense table'>
                <TableHead>
                  <TableRow>
                    <StyledTableCell>No</StyledTableCell>
                    <StyledTableCell>Name</StyledTableCell>
                    <StyledTableCell>Assigned By</StyledTableCell>
                    <StyledTableCell>Diseases</StyledTableCell>
                    <StyledTableCell>Time</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mockPatientsStatistic.map((n) => (
                    <TableRow key={n.id}>
                      <TableCell component='th' scope='row'>
                        {n.id}
                      </TableCell>
                      <TableCell>{n.Patients}</TableCell>
                      <TableCell>{n.Assigned}</TableCell>
                      <TableCell>{n.Diseases}</TableCell>
                      <TableCell>{n.Date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};
