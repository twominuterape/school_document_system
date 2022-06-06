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
import HelpIcon from '@material-ui/icons/Help';
import { useDispatch,useSelector } from 'react-redux'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

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

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

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
    const [displayGuide, setdisplayGuide] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [files, setfiles] = React.useState([]);

    const [qtyTor, setqtyTor] = React.useState(1);
    const [qtyCert, setqtyCert] = React.useState(1);

    const [summaryPayment, setsummaryPayment] = React.useState([]);
    const [docstype, setdocstype] = React.useState([
        {type:'Diploma',price:'45'},
        {type:'Transcript of Records (TOR)',price:'195'},
        {type:'Certification',price:'145'},
        {type:'Transfer Credentials',price:'485'},
        {type:'CAV Credentials',price:'250'},
        {type:'Certified True Copy of Document',price:'30'},
    ]);
    const [openCertified, setopenCertified] = React.useState(false);
    const [displayWarning, setdisplayWarning] = React.useState({
        action:false,
        message:''
    });
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('xl'));
    const [admissionVal, setadmissionVal] = React.useState('Junior High School Report Card (JHS Form 138)');

    const Dispatch = useDispatch();
    const ReceiptFile = useSelector(state => state.reqDocsReducer.receiptCopy)
    const student_Input = useSelector(state => state.reqDocsReducer.studentDetails)

    const ApplyFor = useSelector(state => state.reqDocsReducer.appliedFor)
    const tor_selectedType = useSelector(state => state.reqDocsReducer.tor_type)
    const certificate_type = useSelector(state => state.reqDocsReducer.cert_type)
    const documentCat = useSelector(state => state.reqDocsReducer.documentCat)
    const handleClose = () => {
        setfiles([])
        setOpen(false);
    };
    const handleChangeFile = (files) => {
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

    const paymentCompute=(qtyTor,qtyCert)=>{
        let payment_list = []
        documentCat.map((val,index)=>{
            let doc_Request = []
            let price = 0
            let pages = 0
            let subTotal = 0
            let transferee = "No"
            let editable = "No"
            ApplyFor.map((val2,index2)=>{
                if(val.option_name === val2){
                    if(val2 === "Transcript of Records (TOR)"){
                        if(tor_selectedType === "Personal Copy"){
                            pages=qtyTor
                            subTotal = pages * 45
                            editable = "Yes"
                            val.price = 45

                        }else{
                            if(student_Input.admission === "Transcript of Records (for transferees)"){
                                pages = qtyTor
                                subTotal = val.price * pages
                                transferee = "Yes"
                                editable = "Yes"
                            }else{
                                if(student_Input.department === "COE"){
                                    pages=4
                                    subTotal = 645
                                }else{
                                    pages = 3
                                    subTotal = 495
                                }
                            }
                        }
                      
                    }else if(val2 === "Certified True Copy of Document"){
                        pages = qtyCert
                        subTotal = val.price * pages
                        editable = "Yes"
                    }else{
                        pages= 1
                        subTotal = val.price * pages
                    }
                    doc_Request = {
                        docs:val2,
                        subTotal:subTotal,
                        price:val.price,
                        pages:pages,
                        editable:editable,
                        transferee:transferee
                    }
                    payment_list.push(doc_Request)
                }
            })
        })
        if(tor_selectedType === "Not Applicable" && certificate_type === "Not Applicable"){
            const filterTor = payment_list.filter(function(item){
                return (item.docs !== "Transcript of Records (TOR)" && item.docs !== "Certified True Copy of Document") ;
            })
            setsummaryPayment(filterTor)
        }else if(tor_selectedType === "Not Applicable"){
            const filterTor = payment_list.filter(function(item){
                return item.docs !== "Transcript of Records (TOR)";
            })
            Dispatch({
                type:'passBreakdown',
                breakdown_:filterTor,
                totalPayment:filterTor.reduce((previousValue, currentValue) => previousValue + currentValue.subTotal, 0),
            })
            setsummaryPayment(filterTor)
        }else if(certificate_type === "Not Applicable"){
            const filterTor = payment_list.filter(function(item){
                return item.docs !== "Certified True Copy of Document";
            })
            Dispatch({
                type:'passBreakdown',
                breakdown_:filterTor,
                totalPayment:filterTor.reduce((previousValue, currentValue) => previousValue + currentValue.subTotal, 0),
            })
            setsummaryPayment(filterTor)
        }else{
            Dispatch({
                type:'passBreakdown',
                breakdown_:payment_list,
                totalPayment:payment_list.reduce((previousValue, currentValue) => previousValue + currentValue.subTotal, 0),
            })
            setsummaryPayment(payment_list)
        }
    }

    const onChange = (event,type) => {
        if(event.target.value <= 0){
            setdisplayWarning({
                action:true,
                message:'Minimum Reached'
            })
        }else{
            if(student_Input.department === "COE"){
                if(event.target.value > 4){
                    setdisplayWarning({
                        action:true,
                        message:'Maximum Reached'
                    })
                }else{
                    setqtyTor(event.target.value)
                    paymentCompute(event.target.value,qtyCert)
                }
            }else{
                if(event.target.value > 3){
                    setdisplayWarning({
                        action:true,
                        message:'Maximum Reached'
                    })
                }else{
                    setqtyTor(event.target.value)
                    paymentCompute(event.target.value,qtyCert)
                }
               
            }
        }
    };
    const onChangeCert = (event,type) => {
        if(event.target.value <= 0){
            setdisplayWarning({
                action:true,
                message:'Minimum Reached'
            })
        }else{
            if(event.target.value > 2){
                setdisplayWarning({
                    action:true,
                    message:'Maximum Reached'
                })
            }else{
                setqtyCert(event.target.value)
                paymentCompute(qtyTor,event.target.value)
            }
               
        }
    };

    useEffect(()=>{
        paymentCompute(qtyTor,qtyCert)
    },[])
    return (
        <Grid container spacing={1} >
            <Grid item xs={12} md={3} ></Grid>
            <Grid item xs={12} md={6} >
                <Grid container spacing={1} >
                    <Grid item xs={12} md={10}>
                        <Typography variant="h4" >Proof of Payment:</Typography>
                        <Typography  style={{textAlign:'left',color:'#2f3640',fontSize:16}}> Proof of Payment for the Requested Document(s)</Typography>
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <div style={{display:'flex',justifyContent:'flex-end'}}>
                            <IconButton 
                                onClick={()=>setdisplayGuide(!displayGuide)}
                                aria-label="delete" className={classes.margin}>
                                <HelpIcon fontSize="large" />
                            </IconButton>
                        </div>
                    </Grid>
                </Grid>
               
                <Grid container spacing={1} style={{marginTop:10}}>
                    {displayGuide === true &&
                        <Grid item xs={12} md={12} >
                            <Card style={{marginBottom:10}}>
                                <CardContent>
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
                                </CardContent>
                            </Card>
                        </Grid>
                    }
                     <Grid item xs={12} md={12} >
                        <Snackbar open={displayWarning.action} autoHideDuration={6000} 
                            onClose={()=>{
                                setdisplayWarning({
                                    action:false,
                                    message:'"'
                                })
                            }}>
                            <Alert onClose={handleClose} severity="warning">
                                {displayWarning.message}
                            </Alert>
                        </Snackbar>
                        <Typography variant="h6">Payment summary</Typography>
                        {JSON.stringify(ApplyFor).includes('Transcript of Records (TOR)') &&
                            <>
                            {tor_selectedType === "Not Applicable"
                                ?<></>
                                : <Alert severity="info" style={{marginBottom:10}}> If your are an Engineering student, 4 pages of TOR will be required.</Alert>
                            }
                           
                            </>
                        }
                        <TableContainer component={Paper}>
                            <Table className={classes.table} aria-label="simple table">
                                <TableHead>
                                    <TableRow style={{backgroundColor:'#3d3d3d'}}>
                                        <TableCell style={{color:'#f5f6fa'}}>Type of Document</TableCell>
                                        <TableCell style={{color:'#f5f6fa'}}>Page(s)</TableCell>
                                        <TableCell style={{color:'#f5f6fa'}}>Cost/ Amount to be paid</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {summaryPayment.map((val,index)=>{
                                    return<TableRow key={index}>
                                        <TableCell  >
                                            {/* <div style={{lineHeight:0}}> */}
                                                <p style={{fontSize:15}}>{val.docs}</p>
                                                {val.docs === "Transcript of Records (TOR)" &&
                                                    <p style={{fontSize:12,color:'#c23616'}}>({tor_selectedType})</p>
                                                }
                                            {/* </div> */}
                                          
                                        </TableCell>
                                        <TableCell  >
                                            {val.editable === "Yes"
                                                ?<>
                                                {val.docs === "Transcript of Records (TOR)" &&
                                                    <TextField
                                                    style={{width:'50%'}}
                                                    size={'small'}
                                                    id="outlined-helperText"
                                                    required={true}
                                                    type="number"
                                                    value={qtyTor}
                                                    onChange={(e)=>onChange(e,val.docs)}
                                                    name="qty"
                                                    variant="outlined"
                                                    />
                                                }
                                                {val.docs === "Certified True Copy of Document" &&
                                                    <TextField
                                                    style={{width:'50%'}}
                                                    size={'small'}
                                                    id="outlined-helperText"
                                                    required={true}
                                                    type="number"
                                                    value={qtyCert}
                                                    onChange={(e)=>onChangeCert(e,val.docs)}
                                                    name="qty"
                                                    variant="outlined"
                                                    />
                                                }
                                                </>
                                                :val.pages
                                            }
                                        </TableCell>
                                        <TableCell  >
                                            ₱ {parseFloat(val.subTotal).toFixed(2)}
                                        </TableCell>
                                    </TableRow>
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <div style={{display:'flex',justifyContent:'flex-end',marginTop:10}}>
                            <Typography variant="h5" >Total: ₱ {summaryPayment.reduce((previousValue, currentValue) => previousValue + currentValue.subTotal, 0)}</Typography>
                        </div>
                     </Grid>
                    
                    <Grid item xs={12} md={4} style={{marginTop:10}}>
                        <FormControl variant="outlined" className={classes.formControl} style={{ width: '100%' }} size={"small"} required={true}>
                            {/* <InputLabel id="demo-simple-select-outlined-label">Type of claiming document(s) </InputLabel> */}
                            <Typography style={{marginTop: 10 }} >Type of claiming document(s)</Typography>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={student_Input.claimtype}
                                onChange={handleClaim}>
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value="Onsite">Onsite</MenuItem>
                                <MenuItem value="Deliver">Deliver</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={12} >
                        <Typography style={{ fontSize: 14, marginTop: 10 }} >
                            Pay directly thru any of the following WIS-accredited banks or via GCash:<br />
                            Bank Name: Bank of Commerce (BOC)<br />
                            Account Name: Westmead International School Inc.<br />
                            Account Number: 027-00-001272-1<br />
                            <br />
                            Bank Name: Banco de Oro (BDO)<br />
                            Account Name: Westmead International School Inc.<br />
                            Account Number: 012598000438
                        </Typography>
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