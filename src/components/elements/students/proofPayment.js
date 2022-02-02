import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Typography, Breadcrumbs, Link } from '@material-ui/core';
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
import Wisimage from '../../assets/westmead.jpeg'
import StaticDialog from './staticDialog'
import Issuance from './issuance'
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import { DropzoneArea } from 'material-ui-dropzone'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useDispatch,useSelector } from 'react-redux'

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

const helperTextStyles = makeStyles(theme => ({
    root: {
      margin: 4,
      color: "#222f3e"
    },
    error: {
      "&.MuiFormHelperText-root.Mui-error": {
        color: theme.palette.common.white
      }
    }
  }));
export default function ProofView() {
    const classes = useStyles();
    const helperTestClasses = helperTextStyles();
    const History = useHistory()
    const [open, setOpen] = React.useState(false);
    const [files, setfiles] = React.useState([]);
  
    const [openCertified, setopenCertified] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('xl'));
    const [admissionVal, setadmissionVal] = React.useState('Junior High School Report Card (JHS Form 138)');

    const Dispatch = useDispatch();
    const ReceiptFile = useSelector(state => state.reqDocsReducer.receiptCopy)
    const student_Input = useSelector(state => state.reqDocsReducer.studentDetails)

    
    const handleClose = () => {
        setfiles([])
        setOpen(false);
    };


    const handleChangeFile = (files) => {
        console.log(files)
        setfiles(files)
    }

    const handleDelete = () => {
        Dispatch({
            type:'passReceipt',
            receiptImage:[],
        })
        setfiles([])
    };

    const handleClaim = (event) => {
        Dispatch({
            type:'passStudForm',
            studentdetails:{
                'claimtype': event.target.value
            },
        })
    };

    useEffect(()=>{
    },[])
    return (
        <Grid container spacing={1} >
            <Grid item xs={12} md={3} ></Grid>
            <Grid item xs={12} md={6} >
                <Typography variant="h4" >Proof of Payment:</Typography>
                <Typography  style={{textAlign:'left',color:'#2f3640',fontSize:16}}> Proof of Payment for the Requested Document(s)</Typography>
                <Grid container spacing={1} style={{marginTop:10}}>
                    <Grid item xs={12} md={12} >
                        <TableContainer component={Paper}>
                            <Table className={classes.table} aria-label="simple table">
                                <TableHead>
                                    <TableRow style={{backgroundColor:'#3d3d3d'}}>
                                        <TableCell style={{color:'#f5f6fa'}}>Type of Document</TableCell>
                                        <TableCell style={{color:'#f5f6fa'}}>Cost/ Amount to be paid</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            Diploma & TOR (Personal Copy)
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            ₱ 45.00
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            TOR (for specific purpose) 
                                            <p style={{fontSize:12,color:'#c23616'}}>**Each page containes 3 academic semesters</p>
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            ₱45.00 (1 page) ; ₱345.00 (2 pages) ; ₱495.00 (3 pages) ; ₱645.00 (4 pages) ; 
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            Certification (per type)
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            ₱ 145.00
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            Complete CAV credentials
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            ₱ 250.00
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            Transfer Credentials
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            ₱ 485.00
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            Certified true copy of document
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            ₱ 30.00 (per type of document with maximum of 2 copies per document)
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    <Typography style={{fontSize:14,marginTop:10}} >
                        Pay directly thru any of the following WIS-accredited banks or via GCash:<br/>
                        Bank Name: Bank of Commerce (BOC)<br/>
                        Account Name: Westmead International School Inc.<br/>
                        Account Number: 027-00-001272-1<br/>
                        <br/>
                        Bank Name: Banco de Oro (BDO)<br/>
                        Account Name: Westmead International School Inc.<br/>
                        Account Number: 012598000438
                    </Typography>
                    </Grid>
                    <Grid item xs={12} md={12} style={{marginTop:10}}>
                        <FormControl variant="outlined" className={classes.formControl} style={{ width: '100%' }} size={"small"} required={true}>
                            <InputLabel id="demo-simple-select-outlined-label">Type of claiming document(s) </InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={student_Input.claimtype}
                                onChange={handleClaim}
                                label="Type of claiming document(s)">
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value="Onsite">Onsite</MenuItem>
                                <MenuItem value="Deliver">Deliver</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={12} >
                        <Button
                        onClick={()=>setOpen(true)}
                        style={{marginTop:10}}
                        variant="contained"
                        color="default"
                        className={classes.button}
                        startIcon={<CloudUploadIcon />}>
                        Attach file
                        </Button>   
                        <Typography>{ReceiptFile.length > 0 ? ReceiptFile[0].name : ""}</Typography>
                    </Grid>
                </Grid>
                <Dialog
                    fullWidth={"sm"}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogContent>
                        <DropzoneArea
                            filesLimit={1}
                            className={classes.drop_zone_area}
                            acceptedFiles={[".png,.jpg,.jpeg,.csv,.xlsx,text/csv, application/vnd.ms-excel, application/csv, text/x-csv, application/x-csv, text/comma-separated-values, text/x-comma-separated-values,.pdf,.docx"]}
                            onChange={handleChangeFile}
                            showFileNames={true}
                            maxFileSize={500800000}
                            onDelete={handleDelete}
                            clearOnUnmount={false}
                            initialFiles={ReceiptFile}
                            showPreviewsInDropzone={true}/>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={()=>{
                        Dispatch({
                            type:'passReceipt',
                            receiptImage:files,
                        })
                        setTimeout(()=>{
                            handleClose()
                        },200)
                    }} color="primary" autoFocus>
                        Attach
                    </Button>
                    </DialogActions>
                </Dialog>
            </Grid>
            <Grid item xs={12} md={3}> </Grid>
        </Grid>
    );
}