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
import { makeStyles, withStyles } from '@material-ui/core/styles';
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
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import ReactExport from "react-data-export";
import { useSelector, useDispatch } from 'react-redux'
import Menu from '@material-ui/core/Menu';
import MoreVertIcon from '@material-ui/icons/MoreVert';
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
let width = window.innerWidth;
const columns = [
    { id: 'rec_id', label: 'Request ID' },
    { id: 'lname', label: 'Last Name' },
    { id: 'fname', label: 'First Name' },
    { id: 'lname', label: 'Middle Name' },
    { id: 'birthdate', label: 'Birthdate' },
    { id: 'department', label: 'Department' },
    { id: 'yearGraduated', label: 'Year Graduated' },
    { id: 'email_rec', label: 'Email' },
    { id: 'status', label: 'Status' },

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
    root3: {
        width: "100%",
        marginTop: theme.spacing.unit * 3,
        overflowX: "auto"
    },
    table: {
        minWidth: 700
    }
}));

export default function LoginPg() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose2 = () => {
        setAnchorEl(null);
    };

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
        statusFilter: 'Pending',
        requestListDisplay: [],
        searchDriver: '',
        selectedReq: [],
        refresh: false,
        logsData: [],
        from: '',
        to: '',
        studen_no: '',
        status: '',
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

        }
    )

    const onSubmitFilter = () => {
        let filter = []
        if (state.statusFilter === "All") {
            filter = state.requestList
        } else {
            filter = state.requestList.filter((val) => (val.status === state.statusFilter))
        }

        setState(prev => ({ ...prev, requestListDisplay: filter }))
        setPage(0);
    }

    React.useEffect(() => {
        loading_page()
        let data = {
            from: state.from,
            to: state.to
        }
        getData('requests/getAccountRecoveryRequests').then((res) => {
            Swal.close()
            let filter = []
            if (state.statusFilter === "All") {
                filter = res.result.data
            } else {
                filter = res.result.data.filter((val) => (val.status === state.statusFilter))
            }
    
            setState(prev => ({ ...prev, requestListDisplay: filter }))
            setState(prev => ({ ...prev, requestList: res.result.data, requestListDisplay: filter  }))

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
                let user_id = adminReducer.loginData[0].user_id
                loading_page()
                getData('addingDocs/approveRequest', { form_id: state.selectedReq.form_id, email: state.selectedReq.email, status: status, user_id: user_id }).then((res) => {
                    Swal.close()
                    if (res.status == "success") {
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
    const onSubmit = (e) => {
        e.preventDefault();
        let user_id = adminReducer.loginData[0].user_id
        let data = {
            selectedReq: state.selectedReq,
            student_no: state.studen_no,
            status: state.status,
            reason:state.reason,
            user_id:user_id 
        }
        loading_page()
        getData('requests/confirmAccounts', data).then((res) => {
            Swal.close()
            if (res.status == true) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    html: 'Success',
                    showConfirmButton: false,
                    timer: 1000
                }).then(() => {
                    setState(prev => ({ ...prev, student_no: '',selectedReq:[],status:'',reason:'', refresh: !state.refresh }))
                    setOpen(false)
                })
            }
        })
    }

    return (
        <React.Fragment>
            <>
                <Breadcrumbs aria-label="breadcrumb" gutterBottom>
                    <Link color="inherit" href="/">Home Page</Link>
                    <Typography color="textPrimary">Account Recovery Request</Typography>
                </Breadcrumbs>
                <Grid container spacing={1}>

                    <Grid item xs={12} md={6} >

                    </Grid>

                    <Grid item xs={12} md={12} >
                        <div style={{ marginTop: 10 }} />
                    </Grid>

                    <Grid item xs={12} md={5} >
                        <Grid container spacing={1}>
                            <Grid item xs={12} md={5} >
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
                                        <MenuItem value={"Confirm"}>Confirm</MenuItem>
                                        <MenuItem value={"Pending"}>Pending</MenuItem>
                                        <MenuItem value={"Deny"}>Deny</MenuItem>

                                        {/* <MenuItem value={"My Released"}>My Released</MenuItem>
                                        <MenuItem value={"My Approved"}>My Approved</MenuItem> */}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={3} >
                                <Button onClick={() => { onSubmitFilter() }} style={{ width: '100%', background: '#ed9e21', color: '#fff', fontWeight: "bold" }} variant="contained">
                                    Filter
                                </Button>
                            </Grid>
                            <Grid item xs={12} md={2} >
                                <Button onClick={() => { setState(prev => ({ ...prev, refresh: !state.refresh, statusFilter: 'All', searchDriver: "" })) }} style={{ width: '100%', background: '#ed9e21', color: '#fff', fontWeight: "bold" }} variant="contained">
                                    <CachedIcon />
                                </Button>
                            </Grid>
                            {/* <Grid item xs={12} md={2} >
                                <ExcelFile filename={'Transaction (' + state.from + ' to ' + state.to + ')'} element={<Button style={{ width: '100%', background: '#ed9e21', color: '#fff', fontWeight: "bold" }} variant="contained">
                                    <CloudDownloadIcon />
                                </Button>} >
                                    <ExcelSheet data={RequestList} name="SSS Contribution">
                                        <ExcelColumn label="Request ID" value="form_id" />
                                        <ExcelColumn label="Student No." value="studnum" />
                                        <ExcelColumn label="Last Name" value="lname" />
                                        <ExcelColumn label="First Name" value="fname" />
                                        <ExcelColumn label="Department" value='department' />
                                        <ExcelColumn label="Degree" value='degree' />
                                        <ExcelColumn label="EC" value='sssEc' />
                                        <ExcelColumn label="Status" value='status' />
                                        <ExcelColumn label="Request Date Added" value='req_date_added' />
                                        <ExcelColumn label="Request Date Approved" value='req_date_approved' />
                                    </ExcelSheet>
                                </ExcelFile>

                            </Grid> */}

                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={3}></Grid>

                    <Grid container item xs={12} md={4} justify='flex-end'>
                        <TextField onChange={onChangeText} name='searchDriver' style={{ width: '100%' }} variant='outlined' size='small' label="Search Name / Request ID"></TextField>
                    </Grid>

                    <Grid item xs={12} md={12}>
                        <Paper className={classes.root3}>
                            <TableContainer className={classes.container} style={{ maxHeight: 400, }}>
                                <Table stickyHeader aria-label="sticky table" className={classes.table}>
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
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {RequestList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {

                                            return (
                                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                    <TableCell
                                                        style={{ whiteSpace: 'nowrap' }}
                                                    >
                                                        {/* <CallMadeIcon onClick={() => {
                                                            setState(prev => ({
                                                                ...prev,
                                                                selectedReq: row
                                                            }))
                                                            setOpen(true)
                                                        }} style={{ cursor: 'pointer', color: '#ed9e21', marginRight: '10' }} /> */}
                                                        <MoreVertIcon style={{ cursor: 'pointer', color: '#ed9e21',display:row.status !== 'Pending'?'none':undefined }} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} />

                                                        <Menu
                                                            id="simple-menu"
                                                            anchorEl={anchorEl}
                                                            keepMounted
                                                            open={Boolean(anchorEl)}
                                                            onClose={handleClose2}
                                                        >
                                                            <MenuItem onClick={() => {
                                                                setState(prev => ({
                                                                    ...prev,
                                                                    selectedReq: row,
                                                                    status: 'Confirm',
                                                                    reason:''
                                                                }))
                                                                setOpen(true)
                                                                handleClose2()
                                                            }}>Confirm</MenuItem>
                                                            <MenuItem onClick={() => {
                                                                setState(prev => ({
                                                                    ...prev,
                                                                    selectedReq: row,
                                                                    status: 'Deny'
                                                                }))
                                                                setOpen(true)
                                                                handleClose2()
                                                            }}>Deny</MenuItem>
                                                        </Menu>


                                                    </TableCell>
                                                    {columns.map((column) => {
                                                        let value = row[column.id];
                                                        if (column.id === 'lname') {
                                                            value = String(row.lname + ' ' + row.fname + ', ' + row.mname).toLocaleUpperCase()
                                                        }
                                                        return (
                                                            <TableCell style={{ whiteSpace: 'nowrap' }} key={column.id} align={column.align}>
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
                                count={RequestList.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </Paper>

                    </Grid>
                </Grid>
                <Dialog
                    fullWidth
                    maxWidth="sm"
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="simple-dialog-title" style={{ color: '#b23232', fontWeight: 'bolder' }}>{state.status === 'Confirm'?"Confirm Account":'Deny'}</DialogTitle>
                    <DialogContent>
                        <form onSubmit={onSubmit}>
                            <Grid container spacing={2}>
                                {state.status === 'Confirm' ?
                                    <Grid item xs={12} md={12}>
                                        <Typography variant='p' style={{ fontWeight: 'bold' }}>Student No.</Typography>
                                        <TextField onChange={onChangeText} name='studen_no' variant='outlined' size='small' style={{ width: '100%' }} />
                                    </Grid>
                                    :
                                    <Grid item xs={12} md={12}>
                                        <Typography variant='p' style={{ fontWeight: 'bold' }}>Reason</Typography>
                                        <TextField multiline minRows={5} onChange={onChangeText} name='reason' variant='outlined' size='small' style={{ width: '100%' }} />
                                    </Grid>
                                }

                            </Grid>
                            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    style={{
                                        backgroundColor: "#b23232",
                                        color: "white",
                                        marginTop: 15,
                                        marginBottom: 15,

                                    }}
                                >
                                    Submit
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </>
        </React.Fragment>
    );
}