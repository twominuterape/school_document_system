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

    const [departmenttype, setdepartmenttype] = React.useState([
        {type:'CAS'},
        {type:'CITS'},
        {type:'COE'},
        {type:'CTE'},
        {type:'CTHM'},
        {type:'SEBA'},
    ]);
    const [age, setAge] = React.useState('');
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('xl'));
    const [admissionVal, setadmissionVal] = React.useState('Junior High School Report Card (JHS Form 138)');


    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };


    const handleChangeTor = (event) => {
        setAge(event.target.value);
    };

    const handleAdmission = (event) => {
        setadmissionVal(event.target.value);
      };

    useEffect(()=>{
        console.log(docstype)
    },[])
    return (
        <Grid container spacing={1} >
            <Grid item xs={12} md={3} ></Grid>
            <Grid item xs={12} md={6} >
                <Typography variant="h4" >Proof of Payment:</Typography>
                <Typography  style={{textAlign:'left',color:'#2f3640',fontSize:16}}> Proof of Payment for the Requested Document(s)</Typography>
                <Grid container spacing={1} style={{marginTop:10}}>
                    <Grid item xs={12} md={12} >
                        <Button
                        style={{marginTop:10}}
                        variant="contained"
                        color="default"
                        className={classes.button}
                        startIcon={<CloudUploadIcon />}>
                        Attach file
                        </Button>   
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} md={3}> </Grid>
        </Grid>
    );
}