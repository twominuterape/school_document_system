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
import { Card, CardContent, Grid, Typography, Breadcrumbs, Link, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Slide } from '@material-ui/core';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import Container from '@material-ui/core/Container';
import FilterListIcon from '@material-ui/icons/FilterList';
import folder from './folder.jpg'
import AddIcon from '@material-ui/icons/Add';
import { DropzoneArea } from 'material-ui-dropzone'
import { getData } from '../../../api/api'
import CloseIcon from '@material-ui/icons/Close';
import axios from "axios"
import Swal from 'sweetalert2'
import { loading_page } from '../../loading'
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import {
    useHistory,
    useParams
  } from "react-router-dom";
  import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
let width = window.innerWidth;
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

export default function FileStorage() {
    const {user_id } = useParams();

    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [loading, setLoading] = React.useState(false);
    const history = useHistory()
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const [state, setState] = React.useState({
        file: [],
        folderName: "",
        folderData: [],
        refresh: false
    })
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
        // getData('Api_test/test',{data:'hehehehe'}).then((res)=>{
        //     console.log(res)
        // })
    };

    const handleClose = () => {
        setOpen(false);
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

    const CreateFolder = (e) => {
        e.preventDefault()
        handleClose()
        loading_page()
        getData('addingDocs/AddFolderName', { name: state.folderName }).then((res) => {
            Swal.close()
            if (res.status) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    html: 'Success',
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    setState(prev => ({ ...prev, refresh: !state.refresh }))

                })
            } else {
                Swal.fire({
                    position: 'center',
                    icon: 'warning',
                    html: 'File name already exist',
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    handleClickOpen()

                })
            }
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
        getData('addingDocs/getCategoryList',{category_type:'Folder Name'}).then((res) => {
            Swal.close()
            setState(prev => ({ ...prev, folderData: res.result.data }))
        })
    }

    const getCategoryList2 = () => {

        getData('addingDocs/getCategoryList').then((res) => {
            setState(prev => ({ ...prev, folderData: res.result.data }))
        })
    }

    const deleteFolder = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                getData('addingDocs/deleteCategory', { id: id }).then((res) => {
                    if (res.status) {
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        ).then(() => {
                            setState(prev => ({ ...prev, refresh: !state.refresh }))

                        })
                    } else {
                        Swal.fire(
                            'Failed!',
                            'Your file is failed to deleted.',
                            'warning'
                        )
                    }

                })
            }


        })
    }
    const upload = () =>{
        let data = new FormData();
        data.append('field',state.file[0])

        const options = {
            onUploadProgess : (progressEvent)=>{
                console.log('heheheh')
                const {loaded,total} = progressEvent;
                let percent = Math.floor((loaded * 100) / total)
                console.log(`${loaded}kb of ${total}kb | ${percent}`)
            }
        }
        const config = {
            onUploadProgress: progressEvent => {
                const {loaded,total} = progressEvent;
                let percent = Math.floor((loaded * 100) / total)
                console.log(percent)
            }
        }
       axios.post("http://localhost/test_api/addingDocs/uploadFile",data,config
      ).then((res)=>{
           console.log(res)
       })
    }
    const getFiles = (data,file_id) =>{
        history.push('/wis/admin/fileStorageList/'+data+'/'+file_id+'/'+user_id)
        
    }

    return (
        <React.Fragment>
            <>
                {/* <Loading loading={loading}/> */}
               
                <Breadcrumbs aria-label="breadcrumb" gutterBottom>
                
                <Link color="inherit" href="/#/wis/admin/documents">Back</Link>
            
                    <Link color="inherit" href="/">Home Page</Link>
                    <Typography color="textPrimary">Folder</Typography>
                </Breadcrumbs>

                <Grid container spacing={1}>
                    <Grid item xs={12} md={1}>
                        <Button startIcon={<AddIcon />} onClick={handleClickOpen} style={{ width: width<600?'100%':undefined, background: '#ed9e21', color: '#fff', fontWeight: "bold" }} variant="contained">
                            Folder
                        </Button>
                    </Grid>
                    {/* <Grid item xs={12} md={1}>
                        <Button startIcon={<AddIcon />} onClick={()=>handleClickOpen()} style={{ width: '100%', background: '#ed9e21', color: '#fff', fontWeight: "bold" }} variant="contained">
                            Upload
                        </Button>
                    </Grid> */}

                    <Grid item xs={12} md={2}>
                        {/* <Button startIcon={<AddIcon />} onClick={handleClickOpen} style={{ width: '100%', background: '#ed9e21', color: '#fff', fontWeight: "bold" }} variant="contained">
                            Category
                        </Button> */}
                    </Grid>

                    <Grid item xs={12} md={12}>
                        <Card className={classes.root}>
                            <CardContent>
                                <Grid container spacing={1}>
                                    {state.folderData.map((val, index) => {
                                        return <Grid container key={index} item xs={12} md={2} justify='center'>
                                            <Grid container item xs={12} md={12} justify='center'>
                                                <div style={{ position: 'relative', width: 120, height: 120,cursor:'pointer' }} onClick={()=>{
                                                    getFiles(val.category_name,val.category_id)
                                                }}>
                                                    <IconButton onClick={() => {
                                                      
                                                            deleteFolder(val.category_id)
                                                      
                                                        }} style={{ display:val.with_data?'none':undefined ,position: 'absolute', top: 15, right: 3,cursor:'pointer' }} aria-label="delete" className={classes.margin} size="small">
                                                        <CloseIcon fontSize="inherit" />
                                                    </IconButton>
                                                    <img src={folder} style={{ width: 120, height: 120 }} />
                                                </div>
                                            </Grid>
                                            <Grid item xs={12} md={12} >
                                                <Typography style={{ fontSize: 12 }}>{String(val.category_name).toLocaleUpperCase()}</Typography>

                                            </Grid>
                                        </Grid>
                                    })

                                    }
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
                    <form onSubmit={CreateFolder}>
                        <DialogTitle id="alert-dialog-slide-title">{"New Folder"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description">
                                <Grid container spacing={1}>
                                    <Grid item xs={12} md={12}>
                                        <TextField style={{ width: '100%',textTransform:'uppercase' }} name='folderName' onChange={onChangeText} required id="standard-required" label="Name" value={state.folderName} />
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
                                Create
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
                <Dialog
                    fullWidth
                    maxWidth="xs"
                    // open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"

                >
                    <div onClick={() => handleClose()} style={{ position: 'absolute', right: 3, top: 3, cursor: 'pointer' }}>
                        <CloseIcon />

                    </div>
                    
                        <DialogTitle id="alert-dialog-slide-title">{"New Folder"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description">
                                <Grid container spacing={1}>
                                    {/* <Grid item xs={12} md={12}>
                                        <TextField style={{ width: '100%' }} name='folderName' onChange={onChangeText} required id="standard-required" label="Name" value={state.folderName} />
                                    </Grid> */}
                                    <Grid item xs={12} md={12}>
                                        <DropzoneArea
                                        className={classes.drop_zone_area}
                                        acceptedFiles={[".csv,.xlsx,text/csv, application/vnd.ms-excel, application/csv, text/x-csv, application/x-csv, text/comma-separated-values, text/x-comma-separated-values"]}
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
                            <Button onClick={()=>upload()} style={{ background: '#ed9e21', color: '#fff', fontWeight: "bold" }} variant="contained">
                                Create
                            </Button>
                        </DialogActions>
                  
                </Dialog>

            </>
        </React.Fragment>


    );
}