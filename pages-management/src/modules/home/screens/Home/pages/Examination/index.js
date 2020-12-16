import React, { useState, useEffect } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { useStyles } from './styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import { ApiService } from '@services/ApiService';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import { formDrugItem } from './states';
import { observer } from 'mobx-react-lite';

export const Examination = observer(() => {
  const classes = useStyles();
  let history = useHistory();
  const data = useLocation().state.data;

  const formDrug = React.useContext(formDrugItem);

  const deleteRow = (rowIndex) => {
    formDrug.removeRow(rowIndex);
  };

  const addRow = () => {
    formDrug.addNewRow();
  };

  return (
    <div className={classes.root}>
      <Toolbar>
        <IconButton onClick={() => history.push('/physical/')} edge='start' className={classes.menuButton}>
          <ArrowBackIcon color={'#0098d1'} />
        </IconButton>
        <h2 style={{ color: '#212121' }}>Back</h2>
      </Toolbar>
      <Grid container alignItems='center' className={classes.infomation}>
        <p>Patient Name: {data.first_name + data.last_name}</p>
        <Divider orientation='vertical' flexItem />
        <p>Birth Date: {data.birth_date}</p>
        <Divider orientation='vertical' flexItem />
        <Button onClick={addRow} color='primary'>
          Add
        </Button>
      </Grid>
      <div>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>Drug</TableCell>
                <TableCell align='right'>Amount</TableCell>
                <TableCell align='right'>Unit</TableCell>
                <TableCell align='right'>Description</TableCell>
                <TableCell align='right'>Quantity</TableCell>
                <TableCell align='right'>Prices</TableCell>
                <TableCell align='right'>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(formDrug.listDrug).map((row, index) => (
                <CustomTableRow key={index} rowIndex={row} onDelete={deleteRow} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Button
        onClick={() => {
          console.log(formDrug.listDrug[1].title);
        }}
        variant='contained'
        color='primary'
        size='large'
        style={{ margin: 10 }}
      >
        Post
      </Button>
    </div>
  );
});

const CustomTableRow = observer((props) => {
  const { rowIndex, onDelete } = props;
  const [listDrug, setListDrug] = useState([]);
  const formDrug = React.useContext(formDrugItem);

  useEffect(() => {
    ApiService.get_drug_list()
      .then((res) => {
        setListDrug(res.msg);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (e) => {
    const result = listDrug.find((ele) => ele.id == e.target.value);
    formDrug.updateListDrug(rowIndex, result);
  };

  return (
    <TableRow>
      <TableCell component='th' scope='row'>
        <Select onChange={handleChange}>
          {listDrug.map((drug, key) => (
            <MenuItem key={key} value={drug.id}>
              {drug.title}
            </MenuItem>
          ))}
        </Select>
      </TableCell>
      <TableCell align='right'>
        <TextField
          required
          defaultValue={1}
          onChange={(event) => formDrug.updateAmount(rowIndex, event.target.value)}
        />
      </TableCell>
      <TableCell align='right'>{formDrug.listDrug[rowIndex].unit}</TableCell>
      <TableCell align='right'>{formDrug.listDrug[rowIndex].description}</TableCell>
      <TableCell align='right'>{formDrug.listDrug[rowIndex].quantity}</TableCell>
      <TableCell align='right'>{formDrug.listDrug[rowIndex].price}</TableCell>
      <TableCell align='right'>
        <Button
          onClick={() => {
            setListDrug([]);
            onDelete(rowIndex);
          }}
          color='secondary'
        >
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
});
