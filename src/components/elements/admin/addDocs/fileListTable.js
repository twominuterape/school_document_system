import React from 'react';
import { makeStyles,withStyles } from '@material-ui/core/styles';
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
import { Tooltip, MenuItem, Card, CardContent, Grid, Slide, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import { Typography, Breadcrumbs, Link, Button } from '@material-ui/core';
import { DropzoneArea } from 'material-ui-dropzone'
import CallMadeIcon from '@material-ui/icons/CallMade';
import axios from "axios"
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import { getData } from '../../../api/api'
import Swal from 'sweetalert2'
import {
    useHistory,
    useParams,
    Link as NewLink
} from "react-router-dom";
import { loading_page } from '../../loading'
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Update } from '@material-ui/icons';
import Backdrop from '@material-ui/core/Backdrop';
let width = window.innerWidth;
const BorderLinearProgress = withStyles((theme) => ({
    root: {
      height: 13,
      borderRadius: 5,
    },
    colorPrimary: {
      backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
      borderRadius: 5,
      backgroundColor: '#f1c40f',
    },
  }))(LinearProgress);
  
  // Inspired by the former Facebook spinners.
  const useStylesFacebook = makeStyles((theme) => ({
    root: {
      position: 'relative',
    },
    bottom: {
      color: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    top: {
      color: '#f1c40f',
      animationDuration: '550ms',
      position: 'absolute',
      left: 0,
    },
    circle: {
      strokeLinecap: 'round',
    },
  }));
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const columns = [
    { id: 'document_id', label: 'Document ID' },
    // { id: 'document_name', label: 'Name' },
    { id: 'file_name', label: 'Type' },
    { id: 'document_size', label: 'Size' },
    { id: 'document_type', label: 'File' },
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
const useStyles2 = makeStyles({
    root: {
      flexGrow: 1,
     
    },
  });
   function CustomizedProgressBars({percent}) {
    const classes = useStyles2();
  
    return (
      <div className={classes.root}>
        <BorderLinearProgress variant="determinate" value={percent} />
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',width:'100%'}}>
        <Typography style={{color:'#fff',fontWeight:'bold'}}>{percent}%</Typography>

        </div>
      </div>
    );
  }

export default function StickyHeadTable() {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const { folderName, category_id, user_id } = useParams();
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const [open, setOpen] = React.useState(false);

    const [state, setState] = React.useState({
        file: [],
        fileNameList: [],
        selected_file_name: "",
        documentList: [],
        actionButtonType: '',
        selected_document: [],
        refresh: false,
        clear: false,
        addFileModal: false,
        fileName: "",
        loading_modal:false,
        percent:0

    })
    const actionButtonChange = (action) => {
        setState(prev => ({ ...prev, actionButtonType: action }))
    }

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
            file: files,
            clear: true
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

    const upload = () => {
        setOpen(false)
        loading_page()
        // setState(prev=>({...prev,loading_modal:true}))
        let data = new FormData();
        for (let index = 0; index < state.file.length; index++) {
            const element = state.file[index];
            data.append('file' + index, element)

        }
        data.append('file_name', state.selected_file_name)
        data.append('category_id', category_id)
        data.append('student_id', user_id)
        data.append('user_id', 2)
        if (state.actionButtonType === "Update") {
            data.append('action', state.actionButtonType)
            data.append('document_id', state.selected_document.document_id)
        }


        const config = {
            onUploadProgress: progressEvent => {
                const { loaded, total } = progressEvent;
                let percent = Math.floor((loaded * 100) / total)
                // console.log(`${loaded}kb of ${total}kb | ${percent}`)
                // setState(prev=>({...prev,percent:percent}))
            }
        }

        axios.post("http://beta.gzonetechph.com/addingDocs/uploadFile", data, config
        ).then((res) => {
            Swal.close()
            // if(state.percent == 100){
                // setState(prev=>({...prev,loading_modal:false,percent:0}))    

                if (!res.data.result.exist) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        html: 'Success',
                        showConfirmButton: false,
                        timer: 1500
                    }).then(() => {
                        setState(prev => ({ ...prev, actionButtonType: '', selected_document: [], refresh: !state.refresh, file: [], selected_file_name: '', clear: false,percent:0 }))
    
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
                        setState(prev => ({ ...prev, actionButtonType: '', selected_document: [],percent:0 }))
    
                    })
                }
            // }
         
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
        Promise.all([getData('addingDocs/getCategoryList', { category_type: 'File Name', folderName: folderName }),
        getData('addingDocs/getDocuments', { category_id: category_id, student_id: user_id})])
            .then((res) => {
                Swal.close()
                setState(prev => ({ ...prev, fileNameList: res[0].result.data, documentList: res[1].result.data }))
            })
    }
    const update_docs = (data) => {
        setState(prev => ({
            ...prev,
            selected_document: data
        }))
        handleClickOpen()
    }

    const deleteFile = (data) => {

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
                getData('addingDocs/deleteDocsFile', data.document_id).then((res) => {
                    if (res.status) {
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        ).then(() => {
                            setState(prev => setState({ ...prev, refresh: !state.refresh }))

                        })
                    }
                })
            }
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

    const handleDelete = () => {
        setState(prev => ({ ...prev, file: [] }))
    };
    const CreateFile = (e) => {
        e.preventDefault()
        setState(prev => ({ ...prev, addFileModal: false }))
        loading_page()
        getData('addingDocs/AddFileName', { name: state.fileName, folderName: String(folderName).toLocaleUpperCase(), user_id: 1 }).then((res) => {
            Swal.close()
            if (res.status) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    html: 'Success',
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    setState(prev => ({ ...prev, refresh: !state.refresh, fileName: '' }))

                })
            } else {
                Swal.fire({
                    position: 'center',
                    icon: 'warning',
                    html: 'File name already exist',
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    setState(prev => ({ ...prev, addFileModal: true }))


                })
            }
        })
    }
    const toTitleCase = (phrase) => {
        return phrase
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };
    return (
        <React.Fragment>

            <>
                <Breadcrumbs aria-label="breadcrumb" gutterBottom>
                    <Link color="inherit" href={"#/folder/"+user_id}>Back</Link>
                    <Link color="inherit" href="/">Home Page</Link>
                    <Typography color="textPrimary">Files</Typography>
                    <Typography color="textPrimary">{toTitleCase(folderName)}</Typography>

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
                    <Grid item xs={12} md={1}>
                        <Button startIcon={<AddIcon />} onClick={() => setState(prev => ({ ...prev, addFileModal: true }))} style={{ width: '100%', background: '#ed9e21', color: '#fff', fontWeight: "bold" }} variant="contained">
                            File
                        </Button>

                    </Grid>
                    {/* <Grid item xs={12} md={2}>
                        <Button onClick={handleClickOpen} style={{ width: '100%', background: '#ed9e21', color: '#fff', fontWeight: "bold" }} variant="contained">
                        <AddIcon />
                        </Button>
                    </Grid> */}
                    {/* <Grid item xs={12} md={4}>
                        <TextField style={{ width: '100%' }} size='small' label='Search' variant='outlined' />
                    </Grid> */}
                    <Grid item xs={12} md={12}>

                        <Card className={classes.root}>
                            <CardContent>
                                <Grid container spacing={1}>

                                    <Grid item xs={12} md={12}>

                                        <TableContainer className={classes.container}>
                                            <Table stickyHeader aria-label="sticky table" style={{ whiteSpace: 'nowrap' }}>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell style={{ backgroundColor: '#b23232', color: '#fff' }}
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
                                                    {state.documentList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                                        return (
                                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                                <TableCell
                                                                    style={{ display: 'flex', justifyContent: 'flex-start' }}

                                                                >
                                                                    <Tooltip title="View">
                                                                        {/* <NewLink to={"file:///C:/xampp/htdocs/test_api/assets/docs_files/"+row.document_name} target="_blank"> */}
                                                                        <CallMadeIcon onClick={() => {
                                                                            // alert('hehehe')
                                                                            // window.open("C:/xampp/htdocs/test_api/assets/docs_files/"+row.document_name,'_blank').focus()
                                                                            window.open('https://images.workflow.gzonetechph.com/documents_wis/' + row.document_name);
                                                                        }} style={{ cursor: 'pointer', color: '#ed9e21', marginRight: 5 }} />
                                                                        {/* </NewLink> */}
                                                                    </Tooltip>
                                                                    <Tooltip title="Update">
                                                                        <SystemUpdateAltIcon onClick={() => {
                                                                            actionButtonChange('Update')
                                                                            update_docs(row)
                                                                        }} style={{ cursor: 'pointer', color: '#ed9e21', marginRight: 5 }} />
                                                                    </Tooltip>
                                                                    <Tooltip title="Delete">
                                                                        <DeleteOutlineIcon onClick={() => {
                                                                            actionButtonChange('Delete')
                                                                            deleteFile(row)
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
                                            count={state.documentList.length}
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
                                        size='small'
                                        label="File Name"
                                        name='selected_file_name'

                                        value={state.selected_file_name}
                                        onChange={onChangeText}
                                        // helperText="Please select your currency"
                                        variant="outlined"
                                        style={{ width: '100%', display: state.actionButtonType === 'Update' ? 'none' : undefined }}
                                    >
                                        {state.fileNameList.map((val, index) => (
                                            <MenuItem key={index} value={val.category_name}>
                                                {val.category_name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    {/* <TextField type='file' style={{width:'100%'}}  onChange={handleChangeFile}/> */}
                                    <DropzoneArea
                                        filesLimit={1}
                                        className={classes.drop_zone_area}
                                        acceptedFiles={[".csv,.xlsx,text/csv, application/vnd.ms-excel, application/csv, text/x-csv, application/x-csv, text/comma-separated-values, text/x-comma-separated-values,.pdf,.docx"]}
                                        onChange={handleChangeFile}
                                        showFileNames={true}
                                        maxFileSize={500800000}
                                        onDelete={handleDelete}
                                        clearOnUnmount={false}
                                        initialFiles={state.file}
                                        showPreviewsInDropzone={state.clear}
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
                                        size='small'
                                        label="File Name"
                                        name='selected_file_name'

                                        value={state.selected_file_name}
                                        onChange={onChangeText}
                                        // helperText="Please select your currency"
                                        variant="outlined"
                                        style={{ width: '100%', display: state.actionButtonType === 'Update' ? 'none' : undefined }}
                                    >
                                        {state.fileNameList.map((val, index) => (
                                            <MenuItem key={index} value={val.category_name}>
                                                {val.category_name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    {/* <TextField type='file' style={{width:'100%'}}  onChange={handleChangeFile}/> */}
                                    <DropzoneArea
                                        filesLimit={1}
                                        className={classes.drop_zone_area}
                                        acceptedFiles={[".csv,.xlsx,text/csv, application/vnd.ms-excel, application/csv, text/x-csv, application/x-csv, text/comma-separated-values, text/x-comma-separated-values,.pdf,.docx,.png,.jpg"]}
                                        onChange={handleChangeFile}
                                        showFileNames={true}
                                        maxFileSize={500800000}
                                        onDelete={handleDelete}
                                        clearOnUnmount={false}
                                        initialFiles={state.file}
                                        showPreviewsInDropzone={state.clear}
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
                            Upload
                        </Button>
                    </DialogActions>

                </Dialog>
                <Dialog
                    fullWidth
                    maxWidth="xs"
                    open={state.addFileModal}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={() => {
                        setState(prev => ({ ...prev, addFileModal: false }))
                    }}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"

                >
                    <div onClick={() => {
                        setState(prev => ({ ...prev, addFileModal: false }))
                    }} style={{ position: 'absolute', right: 3, top: 3, cursor: 'pointer' }}>
                        <CloseIcon />

                    </div>
                    <form onSubmit={CreateFile}>
                        <DialogTitle id="alert-dialog-slide-title">{"New File Name"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description">
                                <Grid container spacing={1}>
                                    <Grid item xs={12} md={12}>
                                        <TextField style={{ width: '100%', textTransform: 'uppercase' }} name='fileName' onChange={onChangeText} required id="standard-required" label="Name" value={state.fileName} />
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
                            <Button type='submit' style={{ background: '#ed9e21', color: '#fff', fontWeight: "bold" }} variant="contained">
                                Create
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
                <Backdrop 
                    open={state.loading_modal}
                    style={{zIndex:9999, display:'flex',
                    paddingBottom:10,
                    alignItems:'center',
                    justifyContent:'center'}}
                   
                   >
                        {/* <DialogContent> */}
                        <div style={{width:width*0.35}}>
                            <Typography variant='p' style={{fontSize:14,color:'#fff',fontWeight:'bold'}}>UPLOADING...</Typography>
                        <CustomizedProgressBars percent={state.percent}/>

                        </div>

                        {/* </DialogContent> */}

                </Backdrop>


            </>
        </React.Fragment>


    );
}