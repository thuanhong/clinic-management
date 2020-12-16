import React, { useState, useEffect } from 'react';
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
import { mockPatientsPayment } from '@app/mock';
import GetAppIcon from '@material-ui/icons/GetApp';
import { FullScreenDialog } from '../../components/FullScreenDialog';
import { ApiService } from '@services/ApiService';

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
  const [listData, setListData] = useState([]);

  useEffect(() => {
    ApiService.get_patient_visit(1).then((res) => {
      if (res.statusCode === 200) {
        setListData(listData.concat(res.msg));
      }
    });
  }, []);

  return (
    <div className={classes.root}>
      <Toolbar>
        <IconButton onClick={() => history.push('/patients/all-patients')} edge='start' className={classes.menuButton}>
          <ArrowBackIcon color={'#0098d1'} />
        </IconButton>
        <h2 style={{ color: '#212121' }}>Patient Detail</h2>
      </Toolbar>
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12} md={4}>
          <Paper className={classes.leftLayout}>
            <div className='patient'>
              <p className={classes.patientName}>{data.first_name + ' ' + data.last_name}</p>
              <p className={classes.date}>{data.gender}</p>
            </div>
            <div className={classes.info}>
              <p className={classes.title}>Address:</p>
              <p className={classes.value}>{data.address}</p>
            </div>
            <div className={classes.info}>
              <p className={classes.title}>Date of Birth:</p>
              <p className={classes.value}>{data.birth_date}</p>
            </div>
            <div className={classes.info}>
              <p className={classes.title}>Identity Card:</p>
              <p className={classes.value}>{data.identity_card}</p>
            </div>
            <FullScreenDialog patientId={data.id} />
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
                    {listData.map((row) => (
                      <StyledTableRow key={row.name}>
                        <StyledTableCell component='th' scope='row'>
                          {new Date(row.created_at).toISOString().split('T')[0]}
                        </StyledTableCell>
                        <StyledTableCell align='right'>{row.doctor}</StyledTableCell>
                        <StyledTableCell align='right'>{row.treatment}</StyledTableCell>
                        <StyledTableCell align='right'>${row.charges}</StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
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
                          <Button variant='outlined' color='primary' startIcon={<GetAppIcon />}>
                            Download
                          </Button>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
