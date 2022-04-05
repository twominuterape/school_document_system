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
import { Card, CardContent, Grid, Tooltip, Button, Typography } from '@material-ui/core';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import CallMadeIcon from '@material-ui/icons/CallMade';
import { useDispatch, useSelector } from 'react-redux'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import CloseIcon from '@material-ui/icons/Close';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import {
  HashRouter as Router,
  Route,
  useParams,
  Redirect,
  Link as NewLink,
  useHistory
} from "react-router-dom";
import { getData } from '../../../api/api';
const columns = [
  { id: 'schoolId', label: 'Student ID' },
  { id: 'lastName', label: 'Last Name' },
  { id: 'middleName', label: 'Middle Name' },
  { id: 'firstName', label: 'First Name' },
  { id: '', label: 'Department' },
  // { id: 'student_course', label: 'Course'},




];
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
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

export default function StickyHeadTable({ state }) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchDriver, setSearchDriver] = React.useState('');
  const adminReducer = useSelector(state => state.adminReducer)
  const [checkList, setCheckList] = React.useState(false)
  const [selectedData, setSelectedData] = React.useState([])

  const history = useHistory()
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    dispatch({
      type: 'onChangeAdminRedicer',
      data: { page: newPage }

    })
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const dispatch = useDispatch();
  let StudentList = adminReducer.masterList.filter(
    (files) => {
      return files.lastName.toLowerCase().indexOf(
        searchDriver.toLocaleLowerCase()) !== -1
        || files.firstName.toLowerCase().indexOf(
          searchDriver.toLocaleLowerCase()) !== -1 || files.schoolId.toLowerCase().indexOf(
            searchDriver.toLocaleLowerCase()) !== -1
    }
  )
  const getCheckList = (row) => {
    let data = {
      selectedData: row
    }
    getData('requests/selectedData', data).then((res) => {
      setCheckList(true)
      setSelectedData(res.result.data)
    })
  }
  return (
    <Card className={classes.root}>
      <CardContent>


        <Grid container spacing={1}>
          <Grid item xs={12} md={4}>
            <TextField onChange={(e) => setSearchDriver(e.target.value)} style={{ width: '100%' }} size='small' label='Search' variant='outlined' />
          </Grid>
          <Grid item xs={12} md={12}>

            <TableContainer className={classes.container} >
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      style={{ backgroundColor: '#b23232', color: '#fff' }}
                    >

                    </TableCell>
                    {columns.map((column) => (

                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth, backgroundColor: '#b23232', color: '#fff' }}
                      >
                        {column.label}
                      </TableCell>
                    ))}

                  </TableRow>
                </TableHead>
                <TableBody>
                  {StudentList.slice(adminReducer.page * rowsPerPage, adminReducer.page * rowsPerPage + rowsPerPage).map((row) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                        <TableCell
                          style={{ display: 'flex', justifyContent: 'flex-start' }}

                        >
                          <Tooltip title="View">
                            <CallMadeIcon onClick={() => {
                              history.push('/folder/' + row.userId)
                            }} style={{ cursor: 'pointer', color: '#ed9e21', marginRight: 15 }} />

                          </Tooltip>
                          <Tooltip title="Check List">
                            <PlaylistAddCheckIcon onClick={() => {
                              getCheckList(row)

                            }} style={{ cursor: 'pointer', color: '#ed9e21' }} />

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
              count={StudentList.length}
              rowsPerPage={rowsPerPage}
              page={adminReducer.page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Grid>
        </Grid>
        <Dialog
          fullWidth
          maxWidth="xs"
          open={checkList}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => {
            setCheckList(false)
          }}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"

        >
          <div onClick={() => {
            setCheckList(false)
          }} style={{ position: 'absolute', right: 3, top: 3, cursor: 'pointer' }}>
            <CloseIcon />

          </div>
          <form >
            <DialogTitle id="alert-dialog-slide-title">{"Check List"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                <Grid container spacing={1}>
                  <Grid item xs={12} md={12}>
                    {selectedData.map((val, index) => {
                      return <Card variant='outlined' key={index} style={{marginBottom:10}}>
                        <CardContent>
                        <Typography style={{ color: '#e67e22', fontSize: 17, fontWeight: 'bold' }}>{val.folder}</Typography>
                        {val.documents.map((val2, index2) => {
                          
                          return <div key={index2} style={{ marginLeft: 20, display: 'flex' }}>
                            {val2.data.length > 0 ?
                              <CheckCircleIcon style={{ color: '#6ab04c'}} />
                              :
                              <CancelIcon style={{ color: '#e74c3c' }} />
                            }
                            <Typography style={{ color:'#000',marginLeft:10 }}>{val2.file.category_name}</Typography>

                          </div>
                        })

                        }
                        </CardContent>
                        
                      </Card>
                    })

                    }
                  </Grid>
                  <Grid item xs={12} md={12}>

                  </Grid>
                </Grid>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              {/* <Button onClick={handleClose} color="primary">
                            Disagree
                        </Button> */}
              {/* <Button type='submit' style={{ background: '#ed9e21', color: '#fff', fontWeight: "bold" }} variant="contained">
                Create
              </Button> */}
            </DialogActions>
          </form>
        </Dialog>
      </CardContent>
    </Card>


  );
}