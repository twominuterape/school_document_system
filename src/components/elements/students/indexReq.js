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
import MobileStepper from '@material-ui/core/MobileStepper';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import DocsView from './docsForm'
import StudentView from './studForm'
import ReviewView from './reviewform'
import ProofView from './proofPayment'
import { useDispatch,useSelector } from 'react-redux'
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { getData } from '../../api/api'
import axios from "axios"
import Swal from 'sweetalert2'
import { loading_page } from '../loading'
import StudentOTP from './studentOTP'
import AccountRecover from './recover'
import WestmeadLogo from '../../assets/westm.jpeg'
import HeadBread from './headbread'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
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
    const History = useHistory()
    const [open, setOpen] = React.useState(false);
    const [warning, setwarning] = React.useState(false);
    const [displayConfirmation, setdisplayConfirmation] = React.useState(false);
    const [displayHistory, setdisplayHistory] = React.useState(false);
    const [warningadmiss, setwarningadmiss] = React.useState(false);
    const [countdown,setcountdown] = React.useState(30)
    const [resendIdentificator,setresendIdentificator] = React.useState(false)
    const [displayLoad,setdisplayLoad] = React.useState(false)
    const [otpview, setotpview] = React.useState("");
    const [createdOTP, setcreatedOTP] = React.useState("");
    const [insertedTOP, setinsertedTOP] = React.useState("");

    const [generatedOTP, setgeneratedOTP] = React.useState(false);
    const [FormCount, setFormCount] = React.useState(0);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);


    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('xl'));
    const Dispatch = useDispatch();

    const ApplyFor = useSelector(state => state.reqDocsReducer.appliedFor)
    const student_Input = useSelector(state => state.reqDocsReducer.studentDetails)
    const tor_selectedType = useSelector(state => state.reqDocsReducer.tor_type)
    const certificate_type = useSelector(state => state.reqDocsReducer.cert_type)

    const ReceiptFile = useSelector(state => state.reqDocsReducer.receiptCopy)
    const CertifiedFiles = useSelector(state => state.reqDocsReducer.certifiedCopy)

    const username_ = useSelector(state => state.reqDocsReducer.username)
    const password_ = useSelector(state => state.reqDocsReducer.password)

    const studentsRecord = useSelector(state => state.studData.studentRecords)
    const studentHistory = useSelector(state => state.studData.histories)

    const breakdown_ = useSelector(state => state.reqDocsReducer.breakdown)
    const totalpayment_ = useSelector(state => state.reqDocsReducer.total)

    const userData_recovery = useSelector(state => state.studData.studentRecover)

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };
   

    const handleHistoryClose = () => {
        setdisplayHistory(false);
    };
    const handleHistory = () => {
        setdisplayHistory(true);
    };

    const handleNext = (e) => {
        e.preventDefault()
        if(FormCount === 0){
            if(ApplyFor.length > 0){
                setwarning(false)
                setFormCount(FormCount+1)
            }else{
                setwarning(true)
            }
        }else if(FormCount === 1){
            if(student_Input.admission !== ""){
                setwarningadmiss(false)
                setFormCount(FormCount+1)
            }else{
                setwarningadmiss(true)
            }
        }else if(FormCount === 3){
            setOpen(false);
            let data = new FormData();
            let formSubmit={
                studnum:student_Input.studnum,
                fname:student_Input.fname,
                lname:student_Input.lname,
                mname:student_Input.mname,
                entry_year:student_Input.entry_year,
                last_attn:student_Input.last_attn,
                gradStatus:student_Input.gradStatus,
                year_graduated:student_Input.year_graduated,
                degree:student_Input.degree,
                major:student_Input.major,
                department:student_Input.department,
                address:student_Input.address,
                elem_school:student_Input.elem_school,
                elem_year:student_Input.elem_year,
                high_school:student_Input.high_school,
                high_year:student_Input.high_year,
                tertiary:student_Input.tertiary,
                admission:student_Input.admission,
                contact:student_Input.contact,
                email:student_Input.email,
                appliedFor:JSON.stringify(ApplyFor),
                tor_type:tor_selectedType,
                cert_type:certificate_type,
                claimtype:student_Input.claimtype,
                total:totalpayment_,
                breakdown:JSON.stringify(breakdown_),
                status:'Pending'
            }
            for (let index = 0; index < CertifiedFiles.length; index++) {
                const element = CertifiedFiles[index];
                data.append('certfile' + index, element)
            }
            for (let index = 0; index < ReceiptFile.length; index++) {
                const element = ReceiptFile[index];
                data.append('receiptfile' + index, element)
            }
            data.append('formfile', JSON.stringify(formSubmit))
            const config = {
                onUploadProgress: progressEvent => {
                    const { loaded, total } = progressEvent;
                    let percent = Math.floor((loaded * 100) / total)
                    // setState(prev=>({...prev,percent:percent}))
                }
            }
            loading_page()
            axios.post("http://beta.gzonetechph.com/Application_form/postApplication", data, config)
            .then((res) => {
                Swal.close()
                if(JSON.stringify(res.data).includes('success')){
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        html: 'Request document form successfuly submitted',
                        showConfirmButton: false,
                        timer: 1500
                    }).then(() => {
                       
                    })
                    let studFormnew = {
                        studnum:"",
                        fname:"",
                        lname:"",
                        mname:"",
                        entry_year:"",
                        last_attn:"",
                        gradStatus:"",
                        year_graduated:"",
                        degree:"",
                        major:"",
                        department:"",
                        address:"",
                        elem_school:"",
                        elem_year:"",
                        high_school:"",
                        high_year:"",
                        tertiary:"",
                        admission:"Junior High School Report Card (JHS Form 138)",
                        contact:"",
                        email:"",
                    }
                    Dispatch({
                        type:'resetVAlue',
                        resetapply:[],
                        reset_tor:"",
                        reset_cert:"",
                        reset_studform:studFormnew,
                        reset_copy:[],
                        reset_receipt:[],
                        reset_list:[],
                        reset_total:[],

                    })
                    setFormCount(0)
                }else{
                    Swal.fire({
                        position: 'center',
                        icon: 'warning',
                        html: 'Failed to post your request. Please try again',
                        showConfirmButton: false,
                        timer: 1500
                    }).then(() => {setOpen(true);})
                }
            })
        }else{
            setFormCount(FormCount+1)
        }
        
    };

    const handleRequet=(e)=>{
        e.preventDefault()
        setgeneratedOTP(false)
        let restruct = JSON.parse(studentsRecord)
        const filtered_pin = restruct.filter(function(item){
            return String(item.schoolId).toUpperCase() === String(username_).toUpperCase();
        })
        if(filtered_pin.length > 0){
            setgeneratedOTP(true)
            setotpview("addOTP")
        }else{
            Swal.fire({
                position: 'center',
                icon: 'warning',
                html: 'Student id not found. Please try again',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                setgeneratedOTP(true);})
        }
    }

    const sentOTP=()=>{
        setcountdown(30)
        var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var otpGenerated = '';
        for ( var i = 0; i < 6; i++ ) {
            otpGenerated += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }
        let usercredentials = {
            username:username_,
            password:password_,
            otpGenerated:otpGenerated,
        }
        getData('Application_form/sendmailingaddress',usercredentials).then((res) => {
            setdisplayLoad(false)
            setcreatedOTP(otpGenerated)
            setresendIdentificator(true)
            let interval = null;
            interval = setInterval(() => {
              setcountdown(seconds => seconds - 1);
            }, 1000);
            let reunmute = ""
            reunmute = JSON.stringify(res.account_history)
            Dispatch({
                type:'student_records_',
                data:{
                    histories:JSON.parse(reunmute)
                }
            })
            setTimeout(()=>{
                clearInterval(interval)
                setresendIdentificator(false)
            },30000)
        })
    }

    const handleChange = (prop) => (event) => {
        setinsertedTOP(event.target.value)
    };

    const submitCode=()=>{
        if(createdOTP === ""){
            alert('Invalid inserted OTP')
        }else{
            if(createdOTP === insertedTOP){
                setgeneratedOTP(false)
                if(studentHistory.length > 0){
                    setOpen(true)
                }
            }else{
                alert('Invalid inserted OTP')
            }
        }
    }

    const getStudents=()=>{
        loading_page()
        Promise.all([
            axios.post('https://api.innovattosoft.com/users/students'),
            axios.post('http://beta.gzonetechph.com/Application_form/fetchAvailableCourses')
          ]).then((res)=>{
            Swal.close()
            Dispatch({
                type:'passStudRecords',
                passStudents:JSON.stringify(res[0].data),
            })
            Dispatch({
                type:'student_records_',
                data:{
                    availableCourse:res[1].data.course,
                    availableDept:res[1].data.dept,
                }
            })
            setgeneratedOTP(true)
        })
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
    };

    const handleConfirmation=(e)=>{
        e.preventDefault()
        setdisplayConfirmation(true)
    }

    const CheckExisting=()=>{
        const filterName = JSON.parse(studentsRecord).filter(function(item){
            return (String(item.firstName).toUpperCase() === String(userData_recovery.fname).toUpperCase() && String(item.lastName).toUpperCase() === String(userData_recovery.lname).toUpperCase());
        })
        if(filterName.length > 0){
            const currentIndex = filterName.findIndex(x => String(x.forIdName).toUpperCase().includes(String(userData_recovery.department).toUpperCase()))
            if(currentIndex > -1){
                setdisplayConfirmation(false)
                setgeneratedOTP(false)
                AutomaticEmail(filterName[currentIndex].schoolId)
            }else{
                setdisplayConfirmation(false)
                setgeneratedOTP(false)
                RecoverySubmit()
            }
        }else{
            setdisplayConfirmation(false)
            setgeneratedOTP(false)
            RecoverySubmit()
        }

       
    }

    const RecoverySubmit=()=>{
        loading_page()
        getData('Application_form/postRecoveryAccount',userData_recovery).then((res) => {
            Swal.close()
            if(res.status === "success"){
                alert('Account recovery successfuly posted.')
                Dispatch({
                    type:'student_records_',
                    data:{
                        studentRecover:{
                            ...userData_recovery,
                            fname:"",
                            mname:"",
                            lname:"",
                            birthdate:"",
                            gender:"",
                            department:"",
                            yearGraduated:"",
                            email_rec:""
                        }, 
                    }
                })
                setdisplayConfirmation(false)
           }else{
               alert('Failed to post your application. Please try again')
           }
           setotpview("")
           setgeneratedOTP(true)
        })
    }

    const AutomaticEmail=(schoolId)=>{
        loading_page()
        let params = {
            schoolId:schoolId,
            userData_recovery:userData_recovery
        }
        getData('Application_form/postAutomaticEmail',params).then((res) => {
            Swal.close()
            if(res.status === "success"){
                alert('Account recovery successfuly posted.')
                Dispatch({
                    type:'student_records_',
                    data:{
                        studentRecover:{
                            ...userData_recovery,
                            fname:"",
                            mname:"",
                            lname:"",
                            birthdate:"",
                            gender:"",
                            department:"",
                            yearGraduated:"",
                            email_rec:""
                        }, 
                    }
                })
                setdisplayConfirmation(false)
           }else{
               alert('Failed to post your application. Please try again')
           }
           setotpview("")
           setgeneratedOTP(true)
        })
    }

    useEffect(()=>{
        
        if(studentsRecord === ""){
            getStudents()
        }
    },[])

    return (
        <React.Fragment>
            <Container>
                <HeadBread handleHistory={handleHistory}/>
                <Grid  spacing={1} >
                    <Grid  item xs={12} md={12}>
                        <StaticDialog/>
                    </Grid>
                </Grid>
                <Divider style={{backgroundColor:'#f7be68',marginTop:10,marginBottom:20,height:5}}/>
         
                <Issuance handleClickOpen={handleClickOpen}/>
            </Container>

            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title">
                <DialogTitle id="responsive-dialog-title">{"Online Document Application Portal"}</DialogTitle>
                <DialogContent>
                <Divider style={{backgroundColor:'#f7be68',marginBottom:20,height:5}}/>
                    <form onSubmit={handleNext}>
                        {FormCount === 0 &&
                            <DocsView warning={warning}/>
                        }
                        {FormCount === 1 &&
                            <StudentView warningadmiss={warningadmiss}/>
                        }
                        {FormCount === 2 &&
                            <ReviewView warningadmiss={warningadmiss}/>
                        }
                        {FormCount === 3 &&
                            <ProofView />
                        }
                        <Grid container spacing={1} style={{marginTop:10}}>
                            <Grid item xs={12} md={3} ></Grid>
                            <Grid item xs={12} md={6} >
                                <MobileStepper
                                variant="progress"
                                steps={4}
                                position="static"
                                activeStep={FormCount}
                                className={classes.root}
                                nextButton={
                                    FormCount === 3
                                        ?<Button size="small" type="submit" > 
                                            Submit
                                            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                                        </Button>
                                        :<Button size="small" type="submit"  disabled={FormCount === 3}> 
                                            Next
                                            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                                        </Button>
                                }
                                backButton={
                                    <Button size="small" onClick={()=>{
                                        let counter = FormCount - 1
                                        if(counter < 0){
                                            handleClose()
                                        }else{
                                            setFormCount(counter)
                                        }
                                    }} disabled={FormCount === -1}>
                                    {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                                    Back
                                    </Button>
                                }/>
                            </Grid>
                            <Grid item xs={12} md={3} ></Grid>
                        </Grid>
                    </form>
                </DialogContent>
                <DialogActions>
                    
                </DialogActions>
            </Dialog>

            <Dialog
                fullScreen={fullScreen}
                open={generatedOTP}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title">
                <DialogTitle id="responsive-dialog-title">
                    <div style={{display:'flex'}}>
                        <img src={WestmeadLogo} style={{width:45,height:50}} />
                        <Typography variant="h5" style={{fontWeight:'bold',color:'#4b4b4b',marginLeft:10,marginTop:5}}>Westmead International School</Typography>
                    </div>
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={1} style={{marginTop:'5%'}}>
                        <Grid  item xs={12} md={otpview === "recover" ? 2 : 4}></Grid>
                        <Grid  item xs={12} md={otpview === "recover" ? 8 : 4}>
                            <center>
                                <div style={{height:'90%',width:'85%',justifyContent:'center',marginBottom:15,alignSelf:'center'}}>
                                    {otpview !== "recover"
                                        ?<Typography variant="h4" style={{fontWeight:'bold',color:'#b33939',textAlign:'left'}}>WIS Account Login</Typography>
                                        :<Typography variant="h4" style={{fontWeight:'bold',color:'#b33939',textAlign:'left'}}>Account Recovery</Typography>
                                    }
                                    <Divider style={{marginBottom:15,marginTop:15,width:'100%'}}/>
                                    {otpview === ""
                                            ?<form onSubmit={handleRequet}>
                                                    <StudentOTP/>
                                                    <Button type="submt" variant="contained" color="primary" style={{width:'100%',marginTop:20,height:50}} size="large">
                                                        Next
                                                    </Button>
                                                    <Typography style={{marginTop:10,color:'#636e72',textAlign:'left'}}>
                                                        Can't remember your Student no.?
                                                        <span style={{color:'#0984e3',marginLeft:5,cursor:'pointer'}} onClick={()=>setotpview('recover')}>
                                                            Click here to recover your account.
                                                        </span>
                                                    </Typography>
                                            </form>
                                        :otpview === "recover" 
                                            ?<>
                                            <form onSubmit={handleConfirmation}>
                                                <AccountRecover/>
                                                <Button type="submt" variant="contained" color="primary" style={{width:'100%',marginTop:20,height:50}} size="large">
                                                    Submit
                                                </Button>
                                                <Typography style={{marginTop:10,color:'#636e72',textAlign:'left'}}>
                                                    Already have a Student no.?
                                                    <span style={{color:'#0984e3',marginLeft:5,cursor:'pointer'}} onClick={()=>setotpview("")}>
                                                        Click here to login your account.
                                                    </span>
                                                </Typography>
                                            </form>
                                            </>
                                            :<>
                                                <Grid container spacing={1} >
                                                    <Grid item xs={12} md={12}><TextField style={{ visibility: 'hidden' }} size="large" disabled /></Grid>
                                                    <Grid item xs={12} md={12} >
                                                        <Typography style={{fontWeight:'bold',color:'#4b4b4b',fontSize:20,textAlign:'left'}}>Email Verification Code</Typography>
                                                        <OutlinedInput
                                                            id="outlined-adornment-weight"
                                                            value={insertedTOP}
                                                            size="large"
                                                            style={{ width: '100%' }}
                                                            onChange={handleChange()}
                                                            endAdornment={<InputAdornment onClick={() =>{
                                                                if(resendIdentificator === false){
                                                                    setdisplayLoad(true)
                                                                    sentOTP()
                                                                }
                                                            }} style={{ cursor: 'pointer'}} position="end">
                                                                {displayLoad === true
                                                                    ?<span style={{fontWeight:'bold',color:'#222f3e'}}>Loading...</span>
                                                                    :<>
                                                                        {resendIdentificator === false 
                                                                            ?<span style={{fontWeight:'bold',color:'#b33939'}}>Send code</span>
                                                                            :<span style={{fontWeight:'bold',color:'#576574'}}>Send code ({countdown})</span>
                                                                        }
                                                                    </>
                                                                }
                                                                </InputAdornment>}
                                                            aria-describedby="outlined-weight-helper-text"
                                                            inputProps={{
                                                                'aria-label': 'weight',
                                                            }}
                                                            labelWidth={0}
                                                        />
                                                        <Typography style={{color:'#636e72',fontSize:15,textAlign:'left',marginTop:5}}>Enter the 6-digit code sent to {password_}</Typography>
                                                    </Grid>
                                                </Grid>
                                                <Button onClick={() => submitCode()} type="submt" variant="contained" color="primary" style={{ width: '100%', marginTop: 20,height:50 }} size="large">
                                                    Submit
                                                </Button>
                                            </>
                                    }
                                </div>
                            </center>
                        </Grid>
                        <Grid  item xs={12} md={otpview === "recover" ? 2 : 4}></Grid>
                    </Grid>
                   
                </DialogContent>
                <DialogActions/>
            </Dialog>
        
            <Dialog
                fullScreen={fullScreen}
                open={displayHistory}
                onClose={handleHistoryClose}
                aria-labelledby="responsive-dialog-title">
                <DialogTitle id="responsive-dialog-title">{"Document request history"}</DialogTitle>
                <DialogContent>
                    <Divider style={{backgroundColor:'#f7be68',marginBottom:20,height:5}}/>
                    {studentHistory.length > 0 &&
                        <Paper variant="outlined">
                        <TableContainer className={classes.container}>
                            <Table stickyHeader style={{ whiteSpace: "nowrap" }}  >
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{backgroundColor:'#b33939',color:'#fff'}} align="left">Student No.</TableCell>
                                    <TableCell style={{backgroundColor:'#b33939',color:'#fff'}} align="left">Name</TableCell>
                                    <TableCell style={{backgroundColor:'#b33939',color:'#fff'}} align="left">Department</TableCell>
                                    <TableCell style={{backgroundColor:'#b33939',color:'#fff'}} align="left">Degree</TableCell>
                                    <TableCell style={{backgroundColor:'#b33939',color:'#fff'}} align="left">Applied for</TableCell>
                                    <TableCell style={{backgroundColor:'#b33939',color:'#fff'}} align="left">Tor type</TableCell>
                                    <TableCell style={{backgroundColor:'#b33939',color:'#fff'}} align="left">Certificate type</TableCell>
                                    <TableCell style={{backgroundColor:'#b33939',color:'#fff'}} align="left">Claim type</TableCell>
                                    <TableCell style={{backgroundColor:'#b33939',color:'#fff'}} align="left">Status</TableCell>
                                    <TableCell style={{backgroundColor:'#b33939',color:'#fff'}} align="left">Date request</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {studentHistory.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row,index) => {
                                    let fullname = row.fname +' '+ row.mname +' '+row.fname
                                    let colorStatus = "#84817a"
                                    if(row.status === "Approved"){
                                        colorStatus = "#218c74"
                                    }else if(row.status === "Released"){
                                        colorStatus = "#227093"
                                    }else if(row.status === "Denied"){
                                        colorStatus = "#b33939"
                                    }
                                    return<TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                        <TableCell align="left">{row.studnum}</TableCell>
                                        <TableCell align="left">{fullname}</TableCell>
                                        <TableCell align="left">{row.department}</TableCell>
                                        <TableCell align="left">{row.degree}</TableCell>
                                        <TableCell align="left">
                                            {JSON.parse(row.appliedFor).map((row2,index2)=>{
                                            return<p key={index2}>{row2}</p>
                                            })}
                                        </TableCell>
                                        <TableCell align="left">{row.tor_type === "Not Applicable" ? 'N/A' : row.tor_type}</TableCell>
                                        <TableCell align="left">{row.cert_type === "Not Applicable" ? 'N/A' : row.cert_type}</TableCell>
                                        <TableCell align="left">{row.claimtype}</TableCell>
                                        <TableCell align="left" style={{backgroundColor:colorStatus,color:'#fff'}}>{row.status}</TableCell>
                                        <TableCell align="left">{row.req_date_added}</TableCell>
                                    </TableRow>
                                })}
                            </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            count={studentHistory.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                        </Paper>
                    }
                   
                </DialogContent>
                <DialogActions>
                    
                </DialogActions>
            </Dialog>               
            
            {/* recovery confirmation */}
            <Dialog
                open={displayConfirmation}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description" >
                <DialogTitle id="alert-dialog-title">{"Confirmation"}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Note: Your application for this request might take days to be approve. Account credentials will be sent to your email.
                    <Typography style={{textAlign:'left',marginTop:10}}> Please click Submit to continue.</Typography>
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>setdisplayConfirmation(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={()=>{
                        CheckExisting()
                    }} color="primary" autoFocus>
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}