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
import ProofView from './proofPayment'
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
    const [docstype, setdocstype] = React.useState([
        {type:'Diploma'},
        {type:'Transcript of Records (TOR)'},
        {type:'Certification'},
        {type:'Transfer Credentials'},
        {type:'CAV Credentials'},
        {type:'Certified True Copy of Document'},
    ]);

    const [state, setState] = React.useState({
        checkedA: true,
        checkedB: true,
        checkedF: true,
        checkedG: true,
      });

    const [torType, settorType] = React.useState([
        {type:'Personal Copy'},
        {type:'Employment'},
        {type:'Graduate School'},
        {type:'Transfer Credentials'},
        {type:'Scholarship Application'},
        {type:'Transfer / Evaluation'},
        {type:'Lisensure Examination'},
        {type:'Others'},
        {type:'Not Applicable'},
    ]);

    const [certificationType, setcertificationType] = React.useState([
        {type:'General Weighted Average (GWA)'},
        {type:'Enrollment'},
        {type:'Graduation'},
        {type:'Good Moral Character (for Licensure Exam)'},
        {type:'Good Moral Character (for Transfer)'},
        {type:'Eligibility to Transfer (Undergraduate)'},
        {type:'Eligibility to Transfer (for Graduate School)'},
        {type:'English as Medium of Instruction'},
        {type:'Not Applicable'},
    ]);
    const [age, setAge] = React.useState('');
    const [FormCount, setFormCount] = React.useState(0);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('xl'));

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleNext = (e) => {
        e.preventDefault()
        setFormCount(FormCount+1)
    };

    useEffect(()=>{
        console.log(docstype)
    },[])
    return (
        <React.Fragment>
            <Container>
                <Breadcrumbs aria-label="breadcrumb" gutterBottom>
                    <Link color="inherit" href="/">Home Page</Link>
                    <Typography color="textPrimary">Student List</Typography>
                </Breadcrumbs>
                <Grid  spacing={1} >
                    <Grid  item xs={12} md={12}>
                        <StaticDialog/>
                    </Grid>
                </Grid>
                {/* <hr style={{borderTop:'5px dashed #f7be68',marginTop:10,marginBottom:10}}/> */}
                <Divider style={{backgroundColor:'#f7be68',marginTop:10,marginBottom:20,height:5}}/>
                {/* <Grid  spacing={1} style={{marginBottom:15}}>
                    <Grid  item xs={12} md={12}>
                            <img src={Wisimage} style={{width:'100%',height:140}} />
                    </Grid>
                </Grid> */}
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
                            <DocsView/>
                        }
                        {FormCount === 1 &&
                            <StudentView/>
                        }
                        {FormCount === 2 &&
                            <ProofView />
                        }
                        <Grid container spacing={1} style={{marginTop:10}}>
                            <Grid item xs={12} md={3} ></Grid>
                            <Grid item xs={12} md={6} >
                                <MobileStepper
                                variant="progress"
                                steps={5}
                                position="static"
                                activeStep={FormCount}
                                className={classes.root}
                                nextButton={
                                    <Button size="small" type="submit"  disabled={FormCount === 3}> Next
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
                                    }} disabled={FormCount === 0}>
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
        </React.Fragment>
    );
}