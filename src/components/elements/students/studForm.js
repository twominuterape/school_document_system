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
export default function StudentView() {
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
                <Typography variant="h4" >Student/Alumni Information:</Typography>
                <Typography  style={{textAlign:'left',color:'#2f3640',fontSize:16}}> Please fill-out the required information correctly.</Typography>
                <Grid container spacing={1} style={{marginTop:10}}>
                    <Grid item xs={12} md={12} >
                        <TextField
                            style={{width:'100%',color:'green'}}
                            size={'small'}
                            id="outlined-helperText"
                            required={true}
                            FormHelperTextProps={{ classes: helperTestClasses }}
                            label="Student Number:"
                            color="green"
                            helperText="Please enter your student number in this format: C201234"
                            variant="outlined"
                            />
                    </Grid>
                    <Grid item xs={12} md={4} style={{marginTop:10}}>
                        <TextField
                            style={{width:'100%'}}
                            size={'small'}
                            id="outlined-helperText"
                            required={true}
                            label="Last Name:"
                            variant="outlined"
                            />
                    </Grid>
                    <Grid item xs={12} md={4} style={{marginTop:10}}>
                        <TextField
                            style={{width:'100%'}}
                            size={'small'}
                            id="outlined-helperText"
                            required={true}
                            label="First Name:"
                            variant="outlined"
                            />
                    </Grid>
                    <Grid item xs={12} md={4} style={{marginTop:10}} >
                        <TextField
                        style={{width:'100%'}}
                            size={'small'}
                            id="outlined-helperText"
                            required={true}
                            label="Middle Name:"
                            variant="outlined"
                            />
                    </Grid>
                    <Grid item xs={12} md={12} style={{marginTop:10}} >
                        <TextField
                        style={{width:'100%'}}
                            size={'small'}
                            id="outlined-helperText"
                            required={true}
                            FormHelperTextProps={{ classes: helperTestClasses }}
                            label="Entry Year & Semester:"
                            helperText="Please follow this format: AY 2020-2021, 1st Semester"
                            variant="outlined"
                            />
                    </Grid>
                    <Grid item xs={12} md={12} style={{marginTop:10}}>
                        <TextField
                            style={{width:'100%'}}
                            size={'small'}
                            id="outlined-helperText"
                            required={true}
                            FormHelperTextProps={{ classes: helperTestClasses }}
                            label="Last Attendance at WIS:"
                            helperText="Please follow this format: AY 2020-2021, 1st Semester"
                            variant="outlined"
                            />
                    </Grid>
                    <Grid item xs={12} md={12} style={{marginTop:10}}>
                        <FormControl variant="outlined" className={classes.formControl} style={{ width: '100%' }} size={"small"} required={true}>
                            <InputLabel id="demo-simple-select-outlined-label">Graduate/Undergraduate? </InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={age}
                                onChange={handleChangeTor}
                                label="Graduate/Undergraduate? ">
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {certificationType.map((value, index) => {
                                    return <MenuItem value={value.type} key={index}>{value.type}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={12} style={{marginTop:10}}>
                        <TextField
                            style={{width:'100%'}}
                            size={'small'}
                            id="outlined-helperText"
                            required={true}
                            label="Year Graduated:"
                            FormHelperTextProps={{ classes: helperTestClasses }}
                            helperText="For undergraduate applicants, please indicate N/A"
                            variant="outlined"
                            />
                    </Grid>
                    <Grid item xs={12} md={12} style={{marginTop:10}}>
                        <TextField
                            style={{width:'100%'}}
                            size={'small'}
                            id="outlined-helperText"
                            required={true}
                            FormHelperTextProps={{ classes: helperTestClasses }}
                            label="Degree Program: "
                            helperText="Please write your course in this format: BS Information Technology (BSIT)"
                            variant="outlined"
                            />
                    </Grid>
                    <Grid item xs={12} md={12} style={{marginTop:10}}>
                        <TextField
                            style={{width:'100%'}}
                            size={'small'}
                            id="outlined-helperText"
                            required={true}
                            label="Major: "
                            FormHelperTextProps={{ classes: helperTestClasses }}
                            helperText="For degree programs without specialization/major, please indicate N/A"
                            variant="outlined"
                            />
                    </Grid>
                    <Grid item xs={12} md={12} style={{marginTop:10}}>
                        <FormControl variant="outlined" className={classes.formControl} style={{ width: '100%' }} size={"small"} required={true}>
                            <InputLabel id="demo-simple-select-outlined-label">Department: </InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={age}
                                onChange={handleChangeTor}
                                label="Graduate/Undergraduate? ">
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {departmenttype.map((value, index) => {
                                    return <MenuItem value={value.type} key={index}>{value.type}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={12} style={{marginTop:10}}>
                        <TextField
                            style={{ width: '100%' }}
                            required={true}
                            id="outlined-multiline-static"
                            label="Permanent Address:"
                            multiline
                            rows={3}
                            variant="outlined"/>
                    </Grid>
                    <Grid item xs={12} md={7} style={{marginTop:10}}>
                        <TextField
                            style={{ width: '100%' }}
                            size={'small'}
                            required={true}
                            id="outlined-helperText"
                            label="Elementary School:"
                            variant="outlined"/>
                    </Grid>
                    <Grid item xs={12} md={5} style={{marginTop:10}}>
                        <TextField
                            style={{width:'100%'}}
                            size={'small'}
                            id="outlined-helperText"
                            required={true}
                            label="Year Graduated (Elementary): "
                            variant="outlined"
                            />
                    </Grid>
                    <Grid item xs={12} md={7} style={{marginTop:10}}>
                        <TextField
                            style={{width:'100%'}}
                            size={'small'}
                            id="outlined-helperText"
                            required={true}
                            label="High School: "
                            variant="outlined"
                            />
                    </Grid>
                    <Grid item xs={12} md={5} style={{marginTop:10}}>
                        <TextField
                            style={{width:'100%'}}
                            size={'small'}
                            id="outlined-helperText"
                            required={true}
                            label="Year Graduated (High School): "
                            variant="outlined"
                            />
                    </Grid>
                    <Grid item xs={12} md={12} style={{marginTop:10}}>
                        <TextField
                            style={{width:'100%'}}
                            size={'small'}
                            id="outlined-helperText"
                            required={true}
                            label="Tertiary: (If Transferee)"
                            variant="outlined"
                            />
                    </Grid>
                    <Grid item xs={12} md={12} style={{marginTop:10}}>
                        <FormControl component="fieldset" required={true}>
                            <FormLabel component="legend">Basis of Admission</FormLabel>
                            <RadioGroup aria-label="gender" name="gender1" value={admissionVal} onChange={handleAdmission}>
                                <FormControlLabel value="Junior High School Report Card (JHS Form 138)" control={<Radio />} label="Junior High School Report Card (JHS Form 138)" />
                                <FormControlLabel value="Senior High School Report Card (SHS Form 138)" control={<Radio />} label="Senior High School Report Card (SHS Form 138)" />
                                <FormControlLabel value="Transcript of Records (for transferees)" control={<Radio />} label="Transcript of Records (for transferees)" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6} style={{marginTop:10}}>
                        <TextField
                            style={{width:'100%'}}
                            size={'small'}
                            id="outlined-helperText"
                            required={true}
                            label="Contact Number: "
                            variant="outlined"
                            />
                    </Grid>
                    <Grid item xs={12} md={6} style={{marginTop:10}}>
                        <TextField
                            style={{width:'100%'}}
                            size={'small'}
                            id="outlined-helperText"
                            required={true}
                            label="Email Address: "
                            variant="outlined"
                            />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} md={3}> </Grid>
        </Grid>
    );
}