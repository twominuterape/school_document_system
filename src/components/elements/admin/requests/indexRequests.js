import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Typography, Breadcrumbs, Link, AppBar, Toolbar, List, ListItemText, ListItem } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import Visibility from '@material-ui/icons/Visibility';
import Button from '@material-ui/core/Button';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import { useParams, useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import FilterListIcon from '@material-ui/icons/FilterList';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { getData } from '../../../api/api';
import CallMadeIcon from '@material-ui/icons/CallMade';
import CloseIcon from '@material-ui/icons/Close';
// import AttachIcon from './attachIcon.png'
import moment from 'moment'
import { loading_page } from '../../loading'
import CachedIcon from '@material-ui/icons/Cached';
import Swal from 'sweetalert2';
import ThumbsUpDownIcon from '@material-ui/icons/ThumbsUpDown';
import { useSelector, useDispatch } from 'react-redux'
import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
let width = window.innerWidth;
const columns = [
    { id: 'form_id', label: 'Request ID' },
    { id: 'studnum', label: 'Student No.' },
    { id: 'lname', label: 'Name' },
    { id: 'department', label: 'Department' },
    { id: 'degree', label: 'Degree' },

    // { id: 'req_date_claimed', label: 'Date Claimed' },


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
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        '& > .fa': {
            margin: theme.spacing(2)
        }
    },
    root2: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    margin: {
        margin: theme.spacing(1),
    },


    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
}));
export default function LoginPg() {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const history = useHistory()
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const adminReducer = useSelector(state => state.adminReducer)


    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [state, setState] = React.useState({
        requestList: [],
        statusFilter: 'All',
        requestListDisplay: [],
        searchDriver: '',
        selectedReq: [],
        refresh: false,
        logsData: [],
        deny_modal: false,
        reason:''
    })

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleFilter = (e) => {
        setState(prev => ({ ...prev, statusFilter: e.target.value }))
    }
    let RequestList = state.requestListDisplay.filter(
        (files) => {
            return files.fname.toLowerCase().indexOf(
                state.searchDriver.toLocaleLowerCase()) !== -1 || files.lname.toLowerCase().indexOf(
                    state.searchDriver.toLocaleLowerCase()) !== -1
                || files.form_id.toLowerCase().indexOf(
                    state.searchDriver.toLocaleLowerCase()) !== -1
        }
    )

    const onSubmitFilter = () => {
        console.log(state.statusFilter)
        let filter = []
        if (state.statusFilter === "All") {
            filter = state.requestList
        } else if (state.statusFilter === "My Released") {
            filter = state.requestList.filter((val) => (val.status === 'Released' && val.user_id === adminReducer.loginData[0].user_id))
        } else if (state.statusFilter === "My Approved") {
            filter = state.requestList.filter((val) => (val.status === 'Approved' && val.user_id === adminReducer.loginData[0].user_id))
        } else {
            filter = state.requestList.filter((val) => (val.status === state.statusFilter))
        }

        setState(prev => ({ ...prev, requestListDisplay: filter }))
        setPage(0);
    }

    React.useEffect(() => {
        loading_page()
        getData('requests/getRequests').then((res) => {
            Swal.close()
            let filter = []
            if (state.statusFilter === "All") {
                filter = res.result.data
            }
            else if (state.statusFilter === "My Released") {
                filter = state.requestList.filter((val) => (val.status === 'Released' && val.user_id === adminReducer.loginData[0].user_id))
            } else if (state.statusFilter === "My Approved") {
                filter = state.requestList.filter((val) => (val.status === 'Approved' && val.user_id === adminReducer.loginData[0].user_id))
            } else {
                filter = res.result.data.filter((val) => (val.status === state.statusFilter))
            }

            setState(prev => ({ ...prev, requestList: res.result.data, requestListDisplay: filter }))

        })
    }, [state.refresh])
    const onChangeText = (e) => {
        setState(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }
    const onSubmitApproved = (status) => {
        setOpen(false)
        
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to " + status + ' this request',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.isConfirmed) {
                setState(prev => ({ ...prev,deny_modal:false}))
                let user_id = adminReducer.loginData[0].user_id
                loading_page()
                getData('addingDocs/approveRequest', { form_id: state.selectedReq.form_id, email: state.selectedReq.email, status: status, user_id: user_id,reason:state.reason }).then((res) => {
                    Swal.close()
                    if (res.status == "success") {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            html: 'Success',
                            showConfirmButton: false,
                            timer: 1500
                        }).then(() => {
                            setState(prev => ({ ...prev, selectedReq: [], refresh: !state.refresh,reason:''}))
                        })
                    } else {
                        setOpen(true)
                    }
                    // setState(prev => ({ ...prev, requestList: res.result.data, requestListDisplay: res.result.data }))
                })
            } else {
                setOpen(true)
            }
        })

    }
    const onSubmitClaim = (status, id) => {
        // setOpen(false)
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to change status to " + status,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.isConfirmed) {

                loading_page()
                getData('requests/changeStatus', { form_id: id, status: status }).then((res) => {
                    Swal.close()
                    if (res.status == true) {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            html: 'Success',
                            showConfirmButton: false,
                            timer: 1500
                        }).then(() => {
                            setState(prev => ({ ...prev, selectedReq: [], refresh: !state.refresh }))
                        })
                    } else {
                        // setOpen(true)
                    }
                    // setState(prev => ({ ...prev, requestList: res.result.data, requestListDisplay: res.result.data }))
                })
            }
        })

    }
    const onDeny =(e)=>{
        e.preventDefault();
        onSubmitApproved('Deny')
    }
    console.log(adminReducer)
    return (
        <React.Fragment>
            <>
                <Breadcrumbs aria-label="breadcrumb" gutterBottom>
                    <Link color="inherit" href="/">Home Page</Link>
                    <Typography color="textPrimary">Request List</Typography>
                </Breadcrumbs>
                <Grid container spacing={1}>
                    {/* <Grid item xs={12} md={6}>
                        <Card>
                            <CardContent>
                                <Grid container spacing={1}>
                                    <Grid item xs={12} md={10} >
                                        <FormControl size={"small"} style={{ width: '100%' }} variant="outlined" className={classes.formControl}>
                                            <InputLabel id="demo-simple-select-filled-label">Status</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-filled-label"
                                                id="demo-simple-select-filled"
                                            // value={age}
                                            // onChange={handleChange}
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem value={10}>Ten</MenuItem>
                                                <MenuItem value={20}>Twenty</MenuItem>
                                                <MenuItem value={30}>Thirty</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={1} >
                                    <Button  style={{ width: '100%', background: '#ed9e21', color: '#fff',fontWeight:"bold" }} variant="contained">
                                            Filter
                                        </Button>
                                    </Grid>
                                </Grid>
                            </CardContent>

                        </Card>
                    </Grid> */}
                    <Grid item xs={12} md={12}>
                        <Card variant='outlined'>
                            <CardContent>
                                <Grid container spacing={1}>
                                    <Grid item xs={12} md={3}>
                                        <Card variant='outlined'>
                                            <CardContent>
                                                <div style={{ display: 'flex' }}>
                                                    <Typography variant='p' className={classes.cardFont}>Released</Typography>
                                                </div>
                                                <Typography style={{ fontSize: 30, fontWeight: 'bold' }}>{state.requestList.reduce((count, val) => {
                                                    if (val.status === 'Released') {
                                                        count++
                                                    }
                                                    return count
                                                }, 0)}</Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <Card variant='outlined'>
                                            <CardContent>
                                                <div style={{ display: 'flex' }}>
                                                    <Typography variant='p' className={classes.cardFont}>Approved</Typography>
                                                </div>
                                                <Typography style={{ fontSize: 30, fontWeight: 'bold' }}>{state.requestList.reduce((count, val) => {
                                                    if (val.status === 'Approved') {
                                                        count++
                                                    }
                                                    return count
                                                }, 0)}</Typography>


                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <Card variant='outlined'>
                                            <CardContent>
                                                <div style={{ display: 'flex' }}>
                                                    <Typography variant='p' className={classes.cardFont}>Pending</Typography>
                                                </div>
                                                <Typography style={{ fontSize: 30, fontWeight: 'bold' }}>{state.requestList.reduce((count, val) => {
                                                    if (val.status === 'Pending') {
                                                        count++
                                                    }
                                                    return count
                                                }, 0)}</Typography>

                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <Card variant='outlined'>
                                            <CardContent>
                                                <div style={{ display: 'flex' }}>
                                                    <Typography variant='p' className={classes.cardFont}>Denied</Typography>
                                                </div>
                                                <Typography style={{ fontSize: 30, fontWeight: 'bold' }}>{state.requestList.reduce((count, val) => {
                                                    if (val.status === 'Denied') {
                                                        count++
                                                    }
                                                    return count
                                                }, 0)}</Typography>

                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <Card variant='outlined'>
                                            <CardContent>
                                                <div style={{ display: 'flex' }}>
                                                    <Typography variant='p' className={classes.cardFont}>My Released</Typography>
                                                </div>
                                                <Typography style={{ fontSize: 30, fontWeight: 'bold' }}>{state.requestList.reduce((count, val) => {

                                                    if (val.status === 'Released' && adminReducer.loginData[0]?.user_id === val.user_id) {
                                                        count++
                                                    }
                                                    return count
                                                }, 0)}</Typography>

                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <Card variant='outlined'>
                                            <CardContent>
                                                <div style={{ display: 'flex' }}>
                                                    <Typography variant='p' className={classes.cardFont}>My Approved</Typography>
                                                </div>
                                                <Typography style={{ fontSize: 30, fontWeight: 'bold' }}>{state.requestList.reduce((count, val) => {
                                                    if (val.status === 'Approved' && adminReducer.loginData[0]?.user_id === val.user_id) {
                                                        count++
                                                    }
                                                    return count
                                                }, 0)}</Typography>

                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>

                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Grid container spacing={1}>
                            <Grid item xs={12} md={6} >
                                <FormControl size={"small"} style={{ width: '100%' }} variant="outlined" className={classes.formControl}>
                                    <InputLabel id="demo-simple-select-filled-label">Status</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-filled-label"
                                        id="demo-simple-select-filled"
                                        value={state.statusFilter}
                                        onChange={handleFilter}
                                        style={{ textAlign: 'left' }}
                                    >
                                        <MenuItem value="">
                                            {/* <em>None</em> */}
                                        </MenuItem>
                                        <MenuItem value={"All"}>All</MenuItem>
                                        <MenuItem value={"Approved"}>Approved</MenuItem>
                                        <MenuItem value={"Released"}>Released</MenuItem>
                                        <MenuItem value={"Pending"}>Pending</MenuItem>
                                        <MenuItem value={"Deny"}>Deny</MenuItem>
                                        <MenuItem value={"My Released"}>My Released</MenuItem>
                                        <MenuItem value={"My Approved"}>My Approved</MenuItem>


                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={3} >
                                <Button onClick={() => { onSubmitFilter() }} style={{ width: '100%', background: '#ed9e21', color: '#fff', fontWeight: "bold" }} variant="contained">
                                    Filter
                                </Button>
                            </Grid>
                            <Grid item xs={12} md={3} >
                                <Button onClick={() => { setState(prev => ({ ...prev, refresh: !state.refresh, statusFilter: 'All', searchDriver: "" })) }} style={{ width: '100%', background: '#ed9e21', color: '#fff', fontWeight: "bold" }} variant="contained">
                                    <CachedIcon />
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={5}></Grid>

                    <Grid container item xs={12} md={3} justify='flex-end'>
                        <TextField onChange={onChangeText} name='searchDriver' style={{ width: '100%' }} variant='outlined' size='small' label="Search Name / Request ID"></TextField>
                    </Grid>

                    <Grid item xs={12} md={12}>
                        <Paper>

                            <TableContainer className={classes.container} style={{ maxHeight: 400, }}>
                                <Table stickyHeader aria-label="sticky table" >
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
                                                    style={{ minWidth: column.minWidth, backgroundColor: '#b23232', color: '#fff', whiteSpace: 'nowrap' }}
                                                >
                                                    {column.label}
                                                </TableCell>
                                            ))}
                                            <TableCell
                                                style={{ backgroundColor: '#b23232', color: '#fff' }}
                                            >
                                                Document(s)
                                            </TableCell>
                                            <TableCell
                                                style={{ backgroundColor: '#b23232', color: '#fff' }}
                                            >
                                                Status
                                            </TableCell>
                                            <TableCell
                                                style={{ backgroundColor: '#b23232', color: '#fff', whiteSpace: 'nowrap' }}
                                            >
                                                Date Request
                                            </TableCell>
                                            <TableCell
                                                style={{ backgroundColor: '#b23232', color: '#fff', whiteSpace: 'nowrap' }}
                                            >
                                                Date Approved
                                            </TableCell>

                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {RequestList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {

                                            return (
                                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                    <TableCell
                                                        style={{ whiteSpace: 'nowrap' }}
                                                    >
                                                        <CallMadeIcon onClick={() => {
                                                            getData('requests/getRequestsLogs', row.form_id).then((res) => {
                                                                handleClickOpen()
                                                                setState(prev => ({ ...prev, selectedReq: row, logsData: res.result.data }))
                                                            })
                                                        }} style={{ cursor: 'pointer', color: '#ed9e21', marginRight: '10' }} />
                                                        {row.status === 'Approved' ?
                                                            <OpenInBrowserIcon onClick={() => {

                                                                onSubmitClaim('Released', row.form_id)
                                                            }} style={{ cursor: 'pointer', color: '#ed9e21', marginRight: '10' }} />
                                                            : undefined

                                                        }


                                                    </TableCell>
                                                    {columns.map((column) => {
                                                        let value = row[column.id];
                                                        if (column.id === 'lname') {
                                                            value = String(row.lname + ' ' + row.fname + ', ' + row.mname).toLocaleUpperCase()
                                                        }
                                                        return (
                                                            <TableCell key={column.id} align={column.align}>
                                                                {column.format && typeof value === 'number' ? column.format(value) : value}
                                                            </TableCell>
                                                        );
                                                    })}
                                                    <TableCell>
                                                        {row.appliedFor !== "" && JSON.parse(row.appliedFor).map((val, index2) => {
                                                            return <div style={{ display: 'flex', alignItems: 'center', }}>
                                                                <div style={{ width: 10, height: 10, borderRadius: 5, background: '#f1c40f', marginRight: 5 }} />
                                                                <Typography key={index2}>{val}</Typography>
                                                            </div>
                                                        })
                                                        }
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography>{row.status}</Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography>{moment(row.req_date_added).format('YYYY-MM-DD')}</Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography>{row.req_date_approved !== null ? moment(row.req_date_approved).format('YYYY-MM-DD') : undefined}</Typography>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[10, 25, 100]}
                                component="div"
                                count={RequestList.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </Paper>

                    </Grid>
                </Grid>
                <Dialog fullScreen open={open} onClose={handleClose} style={{ overflowX: 'hidden' }}>
                    <AppBar style={{ background: '#fff' }} elevation={1}>
                        <Toolbar>
                            <IconButton style={{ color: '#000' }} edge="start" color="inherit" onClick={handleClose} aria-label="close">
                                <CloseIcon />
                            </IconButton>
                            <Typography variant="h6" style={{ color: '#000' }}>
                                Request Details
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <div style={{ marginTop: 100 }} />
                    <Grid container spacing={1}>
                        <Grid item xs={12} md={1}>

                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Card variant='outlined'>
                                <CardContent>
                                    <Grid container spacing={1}>
                                        <Grid item xs={12} md={12}>
                                            <Typography variant='h5'>Student Info</Typography>
                                        </Grid>
                                        <Grid item xs={12} md={3}>
                                            <Typography variant='p'>Student No.</Typography>
                                            <TextField readOnly variant='outlined' size='small' style={{ width: '100%', background: '#ecf0f1' }} value={state.selectedReq.studnum}></TextField>
                                        </Grid>
                                        <Grid item xs={12} md={9}>
                                            <Typography variant='p'>Name</Typography>
                                            <TextField readOnly variant='outlined' size='small' style={{ width: '100%', background: '#ecf0f1' }} value={state.selectedReq.lname + ' ' + state.selectedReq.fname + ', ' + state.selectedReq.mname}></TextField>
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                            <Typography variant='p'>Department</Typography>
                                            <TextField readOnly variant='outlined' size='small' style={{ width: '100%', background: '#ecf0f1' }} value={state.selectedReq.department}></TextField>
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                            <Typography variant='p'>Degree</Typography>
                                            <TextField readOnly variant='outlined' size='small' style={{ width: '100%', background: '#ecf0f1' }} value={state.selectedReq.degree}></TextField>
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                            <Typography variant='p'>Major</Typography>
                                            <TextField readOnly variant='outlined' size='small' style={{ width: '100%', background: '#ecf0f1' }} value={state.selectedReq.major}></TextField>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Typography variant='p'>Year & Semester</Typography>
                                            <TextField readOnly variant='outlined' size='small' style={{ width: '100%', background: '#ecf0f1' }} value={state.selectedReq.entry_year}></TextField>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Typography variant='p'>Last Attendance at WIS</Typography>
                                            <TextField readOnly variant='outlined' size='small' style={{ width: '100%', background: '#ecf0f1' }} value={state.selectedReq.last_attn}></TextField>
                                        </Grid>
                                        <Grid item xs={12} md={7}>
                                            <Typography variant='p'>Graduate/Undergraduate</Typography>
                                            <TextField readOnly variant='outlined' size='small' style={{ width: '100%', background: '#ecf0f1' }} value={state.selectedReq.gradStatus}></TextField>
                                        </Grid>
                                        <Grid item xs={12} md={5}>
                                            <Typography variant='p'>Year Graduated</Typography>
                                            <TextField readOnly variant='outlined' size='small' style={{ width: '100%', background: '#ecf0f1' }} value={state.selectedReq.year_graduated}></TextField>
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                            <Typography variant='p'>Permanent Address</Typography>
                                            <TextField multiline rows={4} readOnly variant='outlined' size='small' style={{ width: '100%', background: '#ecf0f1' }} value={state.selectedReq.address}></TextField>
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                            <Typography variant='p'>Basis of Admission</Typography>
                                            <TextField readOnly variant='outlined' size='small' style={{ width: '100%', background: '#ecf0f1' }} value={state.selectedReq.admission}></TextField>
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <Typography variant='p'>Contact No.</Typography>
                                            <TextField readOnly variant='outlined' size='small' style={{ width: '100%', background: '#ecf0f1' }} value={state.selectedReq.contact}></TextField>
                                        </Grid>
                                        <Grid item xs={12} md={8}>
                                            <Typography variant='p'>Email</Typography>
                                            <TextField readOnly variant='outlined' size='small' style={{ width: '100%', background: '#ecf0f1' }} value={state.selectedReq.email}></TextField>
                                        </Grid>
                                    </Grid>

                                </CardContent>
                            </Card>
                            <hr />
                            <Card variant='outlined'>
                                <CardContent>
                                    <Grid container spacing={1}>
                                        <Grid item xs={12} md={12}>
                                            <Typography variant='h5'>Request Document(s)</Typography>
                                        </Grid>
                                        <Grid>
                                            {typeof state.selectedReq.appliedFor !== "undefined" && JSON.parse(state.selectedReq.appliedFor).map((val, index2) => {
                                                return <div style={{ display: 'flex', alignItems: 'center', marginLeft: 20 }}>
                                                    <div style={{ width: 10, height: 10, borderRadius: 5, background: '#f1c40f', marginRight: 5 }} />
                                                    <Typography key={index2}>{val}</Typography>
                                                </div>
                                            })
                                            }
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                            <Typography style={{ fontWeight: 'bold' }}>Transcript of Records (TOR) Purpose</Typography>
                                            <Typography>{state.selectedReq.tor_type}</Typography>

                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                            <Typography style={{ fontWeight: 'bold' }}>Certification Purpose</Typography>

                                            <Typography>{state.selectedReq.cert_type}</Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                            <hr />
                            <Card variant='outlined'>
                                <CardContent>
                                    <Grid container spacing={1}>
                                        <Grid item xs={12} md={12}>
                                            {
                                                state.selectedReq.cert_file != "" && state.selectedReq.cert_file != null ?
                                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                        <Typography variant='p' style={{ fontSize: 15 }}>Certified True Copy of Document</Typography>
                                                        <img onClick={() => {
                                                            window.open('https://images.workflow.gzonetechph.com/documents_wis/' + state.selectedReq.cert_file)
                                                        }} src={'https://images.workflow.gzonetechph.com/documents_wis/' + state.selectedReq.cert_file} style={{ width: 100, height: 100, cursor: 'pointer' }} />

                                                    </div>
                                                    : undefined
                                            }



                                            {/* <img src={'https://images.workflow.gzonetechph.com/documents_wis/'+state.selectedReq.cert_file} style={{width:'50%',height:'50%'}}/>     */}
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                            {
                                                state.selectedReq.receipt_file != "" && state.selectedReq.receipt_file != null ?
                                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                        <Typography variant='p' style={{ fontSize: 15 }}>Proof of Payment</Typography>
                                                        <img onClick={() => {
                                                            window.open('https://images.workflow.gzonetechph.com/documents_wis/' + state.selectedReq.receipt_file)
                                                        }} src={'https://images.workflow.gzonetechph.com/documents_wis/' + state.selectedReq.receipt_file} style={{ width: 100, height: 100, cursor: 'pointer' }} />
                                                    </div>
                                                    : undefined
                                            }


                                            {/* <img src={'https://images.workflow.gzonetechph.com/documents_wis/'+state.selectedReq.cert_file} style={{width:'50%',height:'50%'}}/>     */}
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                            <hr />
                            {state.selectedReq.user_id != null ?
                                <Card variant='outlined'>
                                    <CardContent>
                                        <Grid container spacing={1}>
                                            <Grid item xs={12} md={12}>
                                                <Typography variant='h5' >Admin Info</Typography>

                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <Typography variant='p'>Name</Typography>
                                                <TextField readOnly variant='outlined' size='small' style={{ width: '100%', background: '#ecf0f1' }} value={state.selectedReq.completename}></TextField>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                                : undefined

                            }

                            <Grid container spacing={1} style={{ marginTop: 10 }}>
                                <Grid item xs={12} md={8} >
                                </Grid>
                                {state.selectedReq.status == 'Pending' &&
                                    <Grid container item xs={12} md={2} justify='flex-end'>
                                        <Button onClick={() => {
                                            setState(prev => ({
                                                ...prev,
                                                deny_modal: true
                                            }))
                                        }} style={{ width: width < 700 ? '100%' : undefined, background: '#e74c3c', color: '#fff', fontWeight: "bold", }} variant="contained">
                                            Deny
                                        </Button>
                                    </Grid>
                                }
                                {state.selectedReq.status == 'Pending' &&
                                    <Grid container item xs={12} md={2} justify='flex-end'>
                                        <Button onClick={() => { onSubmitApproved('Approved') }} style={{ width: width < 700 ? '100%' : undefined, background: '#ed9e21', color: '#fff', fontWeight: "bold", }} variant="contained">
                                            Approve
                                        </Button>
                                    </Grid>
                                }
                                {(state.selectedReq.status == 'Approved' && state.selectedReq.user_id == adminReducer.loginData[0].user_id || state.selectedReq.status == 'Denied' && state.selectedReq.user_id == adminReducer.loginData[0].user_id) &&
                                    <Grid container item xs={12} md={4} justify='flex-end'>
                                        <Button onClick={() => { onSubmitApproved('Pending') }} style={{ width: width < 700 ? '100%' : undefined, background: '#ed9e21', color: '#fff', fontWeight: "bold", }} variant="contained">
                                            Undo
                                        </Button>
                                    </Grid>
                                }


                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Grid container spacing={1}>
                                <Grid item xs={12} md={12}>
                                    <Card variant='outlined' style={{ background: '#2c3e50' }}>
                                        <CardContent>
                                            <Grid container spacing={1}>
                                                <Grid item xs={12} md={12}>
                                                    <Typography variant='h5' style={{ color: '#fff' }}>Payment</Typography>
                                                </Grid>
                                                <Grid item xs={12} md={12}>
                                                    <Table>
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell style={{ color: '#fff' }}>Docs</TableCell>
                                                                <TableCell style={{ color: '#fff' }}>Qty</TableCell>
                                                                <TableCell style={{ color: '#fff' }}>Amount</TableCell>
                                                                <TableCell style={{ color: '#fff' }}>Total</TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {(state.selectedReq.breakdown != null && state.selectedReq.breakdown != "") && JSON.parse(state.selectedReq.breakdown).map((val, index) => {
                                                                return <TableRow>
                                                                    <TableCell style={{ color: '#fff' }}>{val.docs}</TableCell>
                                                                    <TableCell style={{ color: '#fff' }}>{val.pages}</TableCell>
                                                                    <TableCell style={{ color: '#fff' }}>{val.price}</TableCell>
                                                                    <TableCell style={{ color: '#fff' }}>{val.subTotal}</TableCell>
                                                                </TableRow>
                                                            })

                                                            }


                                                        </TableBody>
                                                    </Table>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
                                                        <Typography style={{ color: '#fff' }} variant='h6'>Total</Typography>
                                                        <Typography style={{ color: '#fff' }} variant='h6'>{state.selectedReq.total}</Typography>
                                                    </div>


                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <Card variant='outlined' style={{}}>
                                        <CardContent>
                                            <Grid container spacing={1}>
                                                <Grid item xs={12} md={12}>
                                                    <Typography variant='h5'>Logs</Typography>
                                                </Grid>
                                                <Grid item xs={12} md={12}>
                                                    {state.logsData.map((val, index) => {
                                                        return <Card variant='outlined'>
                                                            <CardContent>
                                                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                                    <Typography variant='p' style={{ fontWeight: 'bold' }}>{String(val.user_lname + ' ' + val.user_fname)}  <span style={{ color: '#3498db' }}>{moment(val.date_added).format('YYYY-MM-DD hh:mm A')}</span></Typography>
                                                                    <Typography variant='p'>Request {val.status}</Typography>
                                                                    {val.status === 'Deny'?
                                                                     <Typography variant='p'>Reason : {state.selectedReq.reason}</Typography>
                                                                    :undefined
                                                                    }
                                                                   

                                                                </div>
                                                            </CardContent>
                                                        </Card>
                                                    })

                                                    }

                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>

                        </Grid>
                        <Grid item xs={12} md={1}>

                        </Grid>
                    </Grid>
                </Dialog>
                <Dialog
                    fullWidth
                    maxWidth="xs"
                    open={state.deny_modal}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={() => {
                        setState(prev => ({
                            ...prev,
                            deny_modal: false
                        }))
                    }}
                    style={{zIndex:9999}}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"

                >
                    <div onClick={() => {
                        setState(prev => ({
                            ...prev,
                            deny_modal: false
                        }))
                    }} style={{ position: 'absolute', right: 3, top: 3, cursor: 'pointer' }}>
                        <CloseIcon />

                    </div>
                    <form onSubmit={onDeny}>
                        <DialogTitle id="alert-dialog-slide-title">{"Deny"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description">
                                <Grid container spacing={1}>
                                    <Grid item xs={12} md={12}>
                                        <TextField value={state.reason} variant='outlined' multiline rows={4} style={{width:'100%'}} required placeholder='Reason' onChange={(e)=>setState(prev=>({
                                            ...prev,
                                            reason:e.target.value
                                        }))}/>
                                    </Grid>
                                    
                                </Grid>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button type = 'submit'  color="primary">
                            Proceed
                        </Button>
                            {/* <Button type='submit' style={{ background: '#ed9e21', color: '#fff', fontWeight: "bold" }} variant="contained">
                Create
              </Button> */}
                        </DialogActions>
                    </form>
                </Dialog>
            </>
        </React.Fragment>
    );
}