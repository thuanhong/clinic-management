import React from 'react';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { useStyles } from './styles';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { mockPatientsVist, mockPatientsPayment } from '@app/mock';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import GetAppIcon from '@material-ui/icons/GetApp';
import GridOnIcon from '@material-ui/icons/GridOn';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#0098d1',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export const PatientDetail = () => {
  const classes = useStyles();
  let history = useHistory();
  const data = useLocation().state.data;

  return (
    <div className={classes.root}>
      {/* <AppBar color='transparent' position='static'> */}
      <Toolbar>
        <IconButton onClick={() => history.push('/patients/all-patients')} edge='start' className={classes.menuButton}>
          <ArrowBackIcon color={'#0098d1'} />
        </IconButton>
        <h2 style={{ color: '#212121' }}>Patient Detail</h2>
      </Toolbar>
      {/* </AppBar> */}
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12} md={4}>
          <Paper className={classes.leftLayout}>
            <img style={{ width: '100%' }} src={'https://picsum.photos/300/200'} alt='patient' />
            <div className='patient'>
              <p className={classes.patientName}>{data.FirstName + ' ' + data.LastName}</p>
              <p className={classes.date}>{data.Gender}</p>
            </div>
            <div className={classes.info}>
              <p className={classes.title}>Address:</p>
              <p className={classes.value}>{data.Address}</p>
            </div>
            <div className={classes.info}>
              <p className={classes.title}>Date of Birth:</p>
              <p className={classes.value}>{data.Birth}</p>
            </div>
            <div className={classes.info}>
              <p className={classes.title}>Mobile:</p>
              <p className={classes.value}>{data.Mobile}</p>
            </div>
            <div className={classes.info}>
              <p className={classes.title}>Age:</p>
              <p className={classes.value}>{data.Age}</p>
            </div>
            <div className={classes.info}>
              <p className={classes.title}>Blood Group:</p>
              <p className={classes.value}>{data.BloodGroup}</p>
            </div>
            <Button style={{ marginTop: 10 }} variant='contained' fullWidth={true} color='primary'>
              Change patient information
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <div className={classes.rightLayout}>
            <Paper>
              <p style={{ margin: 0, padding: 15 }} className={classes.patientName}>
                Patient Past Visits
              </p>
              <TableContainer>
                <Table className={classes.table} aria-label='customized table'>
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Date</StyledTableCell>
                      <StyledTableCell align='right'>Doctor</StyledTableCell>
                      <StyledTableCell align='right'>Treatment</StyledTableCell>
                      <StyledTableCell align='right'>Charges</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {mockPatientsVist.map((row) => (
                      <StyledTableRow key={row.name}>
                        <StyledTableCell component='th' scope='row'>
                          {row.Date}
                        </StyledTableCell>
                        <StyledTableCell align='right'>Dr.{row.Doctor}</StyledTableCell>
                        <StyledTableCell align='right'>{row.Treatment}</StyledTableCell>
                        <StyledTableCell align='right'>${row.Charges}</StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Box display='flex' alignItems='center' justifyContent='center' m={5}>
                <ButtonGroup variant='outlined' color='primary' aria-label='outlined primary button group'>
                  <Button startIcon={<GetAppIcon />}>PDF</Button>
                  <Button startIcon={<GridOnIcon />}>CSV</Button>
                </ButtonGroup>
              </Box>
            </Paper>

            <Paper>
              <p style={{ margin: 0, padding: 15 }} className={classes.patientName}>
                Patient Payment Transactions
              </p>
              <TableContainer>
                <Table className={classes.table} aria-label='customized table'>
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Date</StyledTableCell>
                      <StyledTableCell align='right'>Cost</StyledTableCell>
                      <StyledTableCell align='right'>Doctor</StyledTableCell>
                      <StyledTableCell align='right'>Prescription</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {mockPatientsPayment.map((row) => (
                      <StyledTableRow key={row.name}>
                        <StyledTableCell component='th' scope='row'>
                          {row.Date}
                        </StyledTableCell>
                        <StyledTableCell align='right'>${row.Cost}</StyledTableCell>
                        <StyledTableCell align='right'>Dr.{row.Doctor}</StyledTableCell>
                        <StyledTableCell align='right'>
                          <Button startIcon={<GetAppIcon />}>Download</Button>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Box display='flex' alignItems='center' justifyContent='center' m={5}>
                <ButtonGroup variant='outlined' color='primary' aria-label='outlined primary button group'>
                  <Button startIcon={<GetAppIcon />}>PDF</Button>
                  <Button startIcon={<GridOnIcon />}>CSV</Button>
                </ButtonGroup>
              </Box>
            </Paper>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
