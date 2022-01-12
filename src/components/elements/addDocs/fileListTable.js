import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import Container from '@material-ui/core/Container';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import TextField from '@material-ui/core/TextField';
import {MenuItem, Card, CardContent, Grid, Slide, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import { Typography, Breadcrumbs, Link, Button } from '@material-ui/core';
import { DropzoneArea } from 'material-ui-dropzone'
import CallMadeIcon from '@material-ui/icons/CallMade';
import axios from "axios"
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import { getData } from '../../api/api'
import Swal from 'sweetalert2'
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const columns = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
    {
        id: 'population',
        label: 'Population',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'size',
        label: 'Size\u00a0(km\u00b2)',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'density',
        label: 'Density',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toFixed(2),
    },

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

export default function StickyHeadTable() {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const [open, setOpen] = React.useState(false);

    const [state, setState] = React.useState({
        file: [],
        fileNameList: [],
        selected_file_name : ""

    })
    const handleClickOpen = () => {
        setOpen(true);
        // getData('Api_test/test',{data:'hehehehe'}).then((res)=>{
        //     console.log(res)
        // })
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const handleChangeFile = (files) => {
        setState({
            ...state,
            file: files
        });
    }

    const onChangeText = (e) => {
        let name = e.target.name
        let value = e.target.value
        setState(prev => ({
            ...prev,
            [name]: value
        }))
    }

    console.log(state.selected_file_name)
    
    const upload = () => {
        let data = new FormData();
        for (let index = 0; index < state.file.length; index++) {
            const element = state.file[index];
            data.append('file' + index, element)

        }
        data.append('file_name',state.selected_file_name)

        const config = {
            onUploadProgress: progressEvent => {
                const { loaded, total } = progressEvent;
                let percent = Math.floor((loaded * 100) / total)
                console.log(`${loaded}kb of ${total}kb | ${percent}`)
            }
        }
        axios.post("http://localhost/test_api/addingDocs/uploadFile", data, config
        ).then((res) => {
            console.log(res)
        })
    }
    React.useEffect(() => {
        getCategoryList()
    }, [state.refresh])

    const getCategoryList = () => {
        Swal.fire({
            html: 'Loading',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading()
            },
        })
        getData('addingDocs/getCategoryList', { category_type: 'File Name' }).then((res) => {
            Swal.close()
            setState(prev => ({ ...prev, fileNameList: res.result.data }))
        })
    }
    // const upload = () =>{
    //     let data = new FormData();
    //     data.append('field',state.file[0])

    //     const options = {
    //         onUploadProgess : (progressEvent)=>{
    //             console.log('heheheh')
    //             const {loaded,total} = progressEvent;
    //             let percent = Math.floor((loaded * 100) / total)
    //             console.log(`${loaded}kb of ${total}kb | ${percent}`)
    //         }
    //     }
    //     const config = {
    //         onUploadProgress: progressEvent => {
    //             const {loaded,total} = progressEvent;
    //             let percent = Math.floor((loaded * 100) / total)
    //             console.log(percent)
    //         }
    //     }
    //    axios.post("http://localhost/test_api/addingDocs/uploadFile",data,config
    //   ).then((res)=>{
    //        console.log(res)
    //    })
    // }

    return (
        <React.Fragment>

            <Container>
                <Breadcrumbs aria-label="breadcrumb" gutterBottom>
                    <Link color="inherit" href="/">Home Page</Link>
                    <Typography color="textPrimary">Files</Typography>
                    <Typography color="textPrimary">Files List</Typography>

                </Breadcrumbs>

                <Grid container spacing={1}>

                    {/* <Grid item xs={12} md={4}>
                        <Card className={classes.root}>
                            <CardContent>
                                <Grid container spacing={{1}}>
                                    <Grid>

                                    </Grid>

                                </Grid>
                                <DropzoneArea
                                    className={classes.drop_zone_area}
                                    acceptedFiles={[".csv,.xlsx,text/csv, application/vnd.ms-excel, application/csv, text/x-csv, application/x-csv, text/comma-separated-values, text/x-comma-separated-values"]}
                                    onChange={handleChangeFile}
                                    showFileNames={true}
                                    maxFileSize={500800000}
                                />
                                 <Button style={{ background: '#ed9e21', color: '#fff', fontWeight: "bold" }} variant="contained">
                                Create
                            </Button>
                            </CardContent>
                        </Card>
                    </Grid> */}
                    <Grid item xs={12} md={1}>
                        <Button onClick={() => handleClickOpen()} style={{ width: '100%', background: '#ed9e21', color: '#fff', fontWeight: "bold" }} variant="contained">
                            Upload
                        </Button>

                    </Grid>
                    {/* <Grid item xs={12} md={2}>
                        <Button onClick={handleClickOpen} style={{ width: '100%', background: '#ed9e21', color: '#fff', fontWeight: "bold" }} variant="contained">
                        <AddIcon />
                        </Button>
                    </Grid> */}
                    <Grid item xs={12} md={4}>
                        <TextField style={{ width: '100%' }} size='small' label='Search' variant='outlined' />
                    </Grid>
                    <Grid item xs={12} md={12}>

                        <Card className={classes.root}>
                            <CardContent>
                                <Grid container spacing={1}>

                                    <Grid item xs={12} md={12}>

                                        <TableContainer className={classes.container}>
                                            <Table stickyHeader aria-label="sticky table">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell
                                                        >

                                                        </TableCell>
                                                        {columns.map((column) => (

                                                            <TableCell
                                                                key={column.id}
                                                                align={column.align}
                                                                style={{ minWidth: column.minWidth }}
                                                            >
                                                                {column.label}
                                                            </TableCell>
                                                        ))}

                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                                        return (
                                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                                <TableCell
                                                                    style={{ display: 'flex', justifyContent: 'flex-start' }}

                                                                >
                                                                    <CallMadeIcon style={{ cursor: 'pointer', color: '#ed9e21' }} />
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
                                            count={rows.length}
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            onPageChange={handleChangePage}
                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                        />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                <Dialog
                    fullWidth
                    maxWidth="xs"
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"

                >
                    <div onClick={() => handleClose()} style={{ position: 'absolute', right: 3, top: 3, cursor: 'pointer' }}>
                        <CloseIcon />

                    </div>

                    <DialogTitle id="alert-dialog-slide-title">{"Upload File"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            <Grid container spacing={1}>
                                <Grid item xs={12} md={12}>
                                    <TextField
                                        id="outlined-select-currency"
                                        select
                                        size = 'small'
                                        label="File Name"
                                        name = 'selected_file_name'
                                        // value={currency}
                                        onChange={onChangeText}
                                        // helperText="Please select your currency"
                                        variant="outlined"
                                        style={{width:'100%'}}
                                    >
                                        {state.fileNameList.map((val,index) => (
                                            <MenuItem key={index}  value= {val.category_name}>
                                                {val.category_name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <DropzoneArea
                                        className={classes.drop_zone_area}
                                        acceptedFiles={[".csv,.xlsx,text/csv, application/vnd.ms-excel, application/csv, text/x-csv, application/x-csv, text/comma-separated-values, text/x-comma-separated-values,.pdf,.docx"]}
                                        onChange={handleChangeFile}
                                        showFileNames={true}
                                        maxFileSize={500800000}
                                    />
                                </Grid>

                            </Grid>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        {/* <Button onClick={handleClose} color="primary">
                            Disagree
                        </Button> */}
                        <Button onClick={() => upload()} style={{ background: '#ed9e21', color: '#fff', fontWeight: "bold" }} variant="contained">
                            Create
                        </Button>
                    </DialogActions>

                </Dialog>


            </Container>
        </React.Fragment>


    );
}