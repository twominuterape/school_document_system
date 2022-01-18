import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import TextField from '@material-ui/core/TextField';
import {Card,CardContent, Grid,Tooltip } from '@material-ui/core';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import CallMadeIcon from '@material-ui/icons/CallMade';

import {
  HashRouter as Router,
  Route,
  useParams,
  Redirect,
  Link as NewLink,
  useHistory
} from "react-router-dom";
const columns = [
  { id: 'schoolId', label: 'Student ID'},
  { id: 'lastName', label: 'Last Name'},
  { id: 'middleName', label: 'Middle Name'},
  { id: 'firstName', label: 'First Name'},
  { id: '', label: 'Department'},
  // { id: 'student_course', label: 'Course'},


 

];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData('India', 'IN', 1324171354, 3287263),
  createData('China', 'CN', 1403500365, 9596961),
  createData('Italy', 'IT', 60483973, 301340),
  createData('United States', 'US', 327167434, 9833520),
  createData('Canada', 'CA', 37602103, 9984670),
  createData('Australia', 'AU', 25475400, 7692024),
  createData('Germany', 'DE', 83019200, 357578),
  createData('Ireland', 'IE', 4857000, 70273),
  createData('Mexico', 'MX', 126577691, 1972550),
  createData('Japan', 'JP', 126317000, 377973),
  createData('France', 'FR', 67022000, 640679),
  createData('United Kingdom', 'GB', 67545757, 242495),
  createData('Russia', 'RU', 146793744, 17098246),
  createData('Nigeria', 'NG', 200962417, 923768),
  createData('Brazil', 'BR', 210147125, 8515767),
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 400,
  },
});

export default function StickyHeadTable({state}) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const history = useHistory()
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <Card className={classes.root}>
      <CardContent>

     
      <Grid container spacing={1}>
    <Grid item xs={12} md={4}>
    <TextField style={{ width: '100%' }} size='small' label='Search' variant='outlined' />
    </Grid>
    <Grid item xs={12} md={12}>
  
    <TableContainer className={classes.container} >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell
              style={{backgroundColor: '#b23232', color: '#fff'}}
              >
              
              </TableCell>
              {columns.map((column) => (

                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth,backgroundColor: '#b23232', color: '#fff'}}
                >
                  {column.label}
                </TableCell>
              ))}

            </TableRow>
          </TableHead>
          <TableBody>
            {state.student_list.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  <TableCell
                    style={{ display: 'flex', justifyContent: 'flex-start' }}

                  >
                    <Tooltip title="View">
                    <CallMadeIcon onClick={()=>{
                  history.push('/wis/admin/folder/'+row.userId)
                }}  style={{cursor:'pointer',color:'#ed9e21'}} />

                    </Tooltip>
                  </TableCell>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}

                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={state.student_list.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Grid>
      </Grid>
      </CardContent>
    </Card>
     
     
  );
}