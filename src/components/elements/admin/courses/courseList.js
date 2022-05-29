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
import { Tooltip, Card, CardContent, TextField, Grid, Button, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Slide } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import { getData } from '../../../api/api'
import { loading_page } from '../../loading'
import Swal from 'sweetalert2'
import CallMadeIcon from '@material-ui/icons/CallMade';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import {
    HashRouter as Router,
    Route,
    useParams,
    Redirect,
    Link as NewLink,
    useHistory
} from "react-router-dom";
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const columns = [
    { id: 'c_id', label: 'ID' },
    { id: 'dept_name', label: 'Department Name' },
    { id: 'course_name', label: 'Course Name' },


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
        maxHeight: 440,
    },
});

export default function StickyHeadTable() {
    const { dept_name, dept_id } = useParams();
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [open, setOpen] = React.useState(false);
    const [state, setState] = React.useState({
        departmentName: '',
        departmentList: [],
        refresh: false,
        actionButton: 'Create',
        selectedData: []
    })

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const CreateFolder = (e) => {
        e.preventDefault();
        let data = {
            course_name: state.departmentName,
            department: dept_id,
            dept_name: dept_name,
            actionButton: state.actionButton,
            selectedData: state.selectedData
        }
        loading_page()
        getData('Requests/insertCourse', data).then((res) => {
            Swal.close()
            if (res.status == true) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    html: 'Success',
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    setState(prev => ({
                        ...prev,
                        departmentName: '',
                        refresh: !state.refresh
                    }))
                    setOpen(false)
                })
            } else if (res.status === 'Exist') {
                if (res.status) {
                    Swal.fire({
                        position: 'center',
                        icon: 'warning',
                        html: 'File name already exist',
                        showConfirmButton: false,
                        timer: 1500
                    }).then(() => {
                        setState(prev => ({
                            ...prev,
                            refresh: !state.refresh
                        }))
                    })
                }
            }
        })
    }

    React.useEffect(() => {
        let data = { dept_id: dept_id }
        loading_page()
        getData('Requests/getCourses', data).then((res) => {
            Swal.close()
            setState(prev => ({
                ...prev,
                departmentList: res.result.data
            }))
        })
    }, [state.refresh])

    const onChangeText = (e) => {
        let value = e.target.value
        let name = e.target.name
        setState((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    const onDelete = (id) => {
        let data = {
            id:id   
        }
        
        if(window.confirm('Warning, Are you sure you want to delete this course?')){
            loading_page()
            getData('Requests/deleteCourse',data).then((res) => {
                Swal.close()
                setState(prev => ({
                    ...prev,
                    refresh: !state.refresh
                }))
            })
        }
      
    }



    return (
        <Grid container spacing={1}>

            <Grid item xs={12} md={4}>
                <Button startIcon={<AddIcon />} onClick={() => setOpen(true)} style={{ width: '100%', background: '#ed9e21', color: '#fff', fontWeight: "bold" }} variant="contained">
                    New Course
                </Button>
            </Grid>
            <Grid item xs={12} md={12}>
                <Card variant='outlined'>
                    <CardContent>
                        <Paper className={classes.root} variant='outlined'>
                            <TableContainer className={classes.container}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            {columns.map((column) => (
                                                <TableCell
                                                    key={column.id}
                                                    align={column.align}
                                                    style={{ minWidth: column.minWidth, backgroundColor: '#b23232', color: '#fff' }}
                                                >
                                                    {column.label}
                                                </TableCell>
                                            ))}
                                            <TableCell
                                                style={{ backgroundColor: '#b23232', color: '#fff', width: 10 }}
                                            >
                                                Action
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {state.departmentList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                            return (
                                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                    {columns.map((column) => {
                                                        const value = row[column.id];
                                                        return (
                                                            <TableCell key={column.id} align={column.align}>
                                                                {column.format && typeof value === 'number' ? column.format(value) : value}
                                                            </TableCell>
                                                        );
                                                    })}
                                                    <TableCell>
                                                        <div style={{ display: 'flex' }}>
                                                           
                                                            <Tooltip title="Edit">
                                                                {/* <NewLink to={"file:///C:/xampp/htdocs/test_api/assets/docs_files/"+row.document_name} target="_blank"> */}
                                                                <EditIcon onClick={() => {
                                                                    setOpen(true); setState(prev => ({
                                                                        ...prev,
                                                                        actionButton: 'Edit',
                                                                        departmentName: row.course_name,
                                                                        selectedData: row
                                                                    }))
                                                                }} style={{ cursor: 'pointer', color: '#ed9e21', marginRight: 5 }} />
                                                                {/* </NewLink> */}
                                                            </Tooltip>
                                                            <Tooltip title="Delete">
                                                                {/* <NewLink to={"file:///C:/xampp/htdocs/test_api/assets/docs_files/"+row.document_name} target="_blank"> */}
                                                                <DeleteIcon onClick={() => {
                                                                    onDelete(row.c_id)

                                                                }} style={{ cursor: 'pointer', color: '#ed9e21', marginRight: 5 }} />
                                                                {/* </NewLink> */}
                                                            </Tooltip>
                                                        </div>

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
                                count={state.departmentList.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </Paper>
                    </CardContent>
                </Card>
            </Grid>
            <Dialog
                fullWidth
                maxWidth="xs"
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => setOpen(false)}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"

            >
                <div onClick={() => setOpen(false)} style={{ position: 'absolute', right: 3, top: 3, cursor: 'pointer' }}>
                    <CloseIcon />
                </div>
                <form onSubmit={CreateFolder}>
                    <DialogTitle id="alert-dialog-slide-title">{state.actionButton + " Course "}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            <Grid container spacing={1}>
                                <Grid item xs={12} md={12}>
                                    <TextField onChange={onChangeText} value={state.departmentName} style={{ width: '100%', textTransform: 'uppercase' }} name='departmentName' required id="standard-required" label="Name" />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <Typography><i>Please follow the format: BS Information Technology (BSIT)</i></Typography>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    {/* <DropzoneArea
                                        className={classes.drop_zone_area}
                                        acceptedFiles={[".csv,.xlsx,text/csv, application/vnd.ms-excel, application/csv, text/x-csv, application/x-csv, text/comma-separated-values, text/x-comma-separated-values"]}
                                        onChange={handleChangeFile}
                                        showFileNames={true}
                                        maxFileSize={500800000}
                                    /> */}
                                </Grid>

                            </Grid>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        {/* <Button onClick={handleClose} color="primary">
                            Disagree
                        </Button> */}
                        <Button type='submit' style={{ background: '#ed9e21', color: '#fff', fontWeight: "bold" }} variant="contained">
                            {state.actionButton}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Grid>

    );
}