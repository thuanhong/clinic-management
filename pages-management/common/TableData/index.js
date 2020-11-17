import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FilterListIcon from '@material-ui/icons/FilterList';
import { IndeterminateCheckBoxRounded } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { useToolbarStyles, useStyles } from './styles';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

// const headCells = [
//   { label: 'Avatar' },
//   { label: 'First Name' },
//   { label: 'Last Name' },
//   { label: 'Address' },
//   { label: 'Gender' },
//   { label: 'Birth' },
//   { label: 'Mobile' },
//   { label: 'Age' },
//   { lable: 'Email' },
// ];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort, headCells } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell, index) => (
          <TableCell key={index} align='left' padding='default' sortDirection={orderBy === headCell.id ? order : false}>
            <TableSortLabel
              active={orderBy === index}
              direction={orderBy === index ? order : 'asc'}
              onClick={createSortHandler(index)}
            >
              {headCell}
              {orderBy === IndeterminateCheckBoxRounded ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const EnhancedTableToolbar = ({ tableName }) => {
  const classes = useToolbarStyles();

  return (
    <Toolbar className={classes.root}>
      <Typography className={classes.title} variant='h6' id='tableTitle' component='div'>
        {tableName}
      </Typography>
      <Tooltip title='Filter list'>
        <IconButton aria-label='filter list'>
          <FilterListIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
};

export const TableData = (props) => {
  const { data, tableName, pathName } = props;
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const history = useHistory();

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = (event, row) => {
    event.preventDefault();
    history.push({
      pathname: pathName,
      state: { data: row },
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar tableName={tableName} />
        <TableContainer>
          <Table className={classes.table} aria-labelledby='tableTitle' size='medium' aria-label='enhanced table'>
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={data.length}
              headCells={Object.keys(data[0])}
            />
            <TableBody>
              {stableSort(data, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow hover onClick={(event) => handleClick(event, row)} tabIndex={-1} key={index}>
                      <TableCell component='th' id={labelId} scope='row' padding='default'>
                        <img src={row.Image} width='50px' alt='Avatar patient' />
                      </TableCell>
                      {Object.values(row)
                        .slice(1)
                        .map((headCell, head) => (
                          <TableCell key={head} align='left'>
                            {headCell}
                          </TableCell>
                        ))}
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};
