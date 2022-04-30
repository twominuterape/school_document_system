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
export default function ReviewView({warningadmiss}) {
    const classes = useStyles();
    const helperTestClasses = helperTextStyles();
    const History = useHistory()
    const [refreshs, setrefreshs] = React.useState(false);
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
        {type:'CITCS'},
        {type:'COE'},
        {type:'CTE'},
        {type:'CTHM'},
        {type:'SEBA'},
    ]);

    const [admissionType, setadmissionType] = React.useState([
        {type:'Junior High School Report Card (JHS Form 138)'},
        {type:'Senior High School Report Card (SHS Form 138)'},
        {type:'Transcript of Records (for transferees)'},
    ]);
    const [age, setAge] = React.useState('');
    const theme = useTheme();
    const Dispatch = useDispatch();
    const fullScreen = useMediaQuery(theme.breakpoints.down('xl'));
    const [admissionVal, setadmissionVal] = React.useState('Junior High School Report Card (JHS Form 138)');
    const ApplyFor = useSelector(state => state.reqDocsReducer.appliedFor)
    const Selected_tor = useSelector(state => state.reqDocsReducer.tor_type)
    const student_Input = useSelector(state => state.reqDocsReducer.studentDetails)
    const Selected_Cert = useSelector(state => state.reqDocsReducer.cert_type)

    const onChange = (event) => {
        Dispatch({
            type:'passStudForm',
            studentdetails:{
                [event.target.name]: event.target.value
            },
        })
    };

    const handleGraduate = (event) => {
        Dispatch({
            type:'passStudForm',
            studentdetails:{
                'gradStatus': event.target.value
            },
        })
    };

    const handleDepartment = (event) => {
        Dispatch({
            type:'passStudForm',
            studentdetails:{
                'department': event.target.value
            },
        })
    };


    const handleAdmission = (event) => {
        if(student_Input.admission === event.target.name){
            Dispatch({
                type:'passStudForm',
                studentdetails:{
                    'admission': ""
                },
            })
        }else{
            Dispatch({
                type:'passStudForm',
                studentdetails:{
                    'admission': event.target.name
                },
            })
        }
      };

    useEffect(()=>{
        console.log(docstype)
    },[])
    return (
        <Grid container spacing={1} >
            <Grid item xs={12} md={3} ></Grid>
            <Grid item xs={12} md={6} >
                <Typography variant="h4" >Review Student/Alumni Information:</Typography>
                <Typography  style={{textAlign:'left',color:'#2f3640',fontSize:16}}> Please check the details below if inputted correctly.</Typography>
                
                <Grid container spacing={1} style={{marginTop:10}}>
                    <Grid item xs={12} md={12} >
                        <FormControl style={{ width: '100%' }}>
                            <Typography style={{ color: '#786fa6', fontSize: 15,fontWeight:'500'}}>Student Number: </Typography>
                            <TextField
                            inputProps={{ style: { color:"#2f3542"} }}
                            style={{width:'100%',backgroundColor:'#c8d6e5'}}
                            size={'small'}
                            id="outlined-helperText"
                            disabled
                            value={student_Input.studnum}
                            variant="outlined"
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4} style={{marginTop:10}}>
                        <FormControl style={{ width: '100%' }}>
                            <Typography style={{ color: '#786fa6', fontSize: 15,fontWeight:'500'}}>Last Name: </Typography>
                            <TextField
                            inputProps={{ style: { color:"#2f3542"} }}
                            style={{width:'100%',backgroundColor:'#c8d6e5'}}
                            size={'small'}
                            id="outlined-helperText"
                            disabled
                            value={student_Input.lname}
                            variant="outlined"
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4} style={{marginTop:10}}>
                        <FormControl style={{ width: '100%' }}>
                            <Typography style={{ color: '#786fa6', fontSize: 15,fontWeight:'500'}}>First Name: </Typography>
                            <TextField
                            inputProps={{ style: { color:"#2f3542"} }}
                            style={{width:'100%',backgroundColor:'#c8d6e5'}}
                            size={'small'}
                            id="outlined-helperText"
                            value={student_Input.fname}
                            disabled
                            name="fname"
                            variant="outlined"
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4} style={{marginTop:10}} >
                        <FormControl style={{ width: '100%' }}>
                            <Typography style={{ color: '#786fa6', fontSize: 15,fontWeight:'500'}}>Middle Name: </Typography>
                            <TextField
                             inputProps={{ style: { color:"#2f3542"} }}
                            style={{width:'100%',backgroundColor:'#c8d6e5'}}
                            size={'small'}
                            id="outlined-helperText"
                            value={student_Input.mname}
                            disabled
                            name="mname"
                            variant="outlined"/>
                        </FormControl>
                        
                    </Grid>
                    <Grid item xs={12} md={12} style={{marginTop:10}} >
                        <FormControl style={{ width: '100%' }}>
                            <Typography style={{ color: '#786fa6', fontSize: 15,fontWeight:'500'}}>Entry Year & Semester: </Typography>
                            <TextField
                             inputProps={{ style: { color:"#2f3542"} }}
                            style={{width:'100%',backgroundColor:'#c8d6e5'}}
                            size={'small'}
                            id="outlined-helperText"
                            value={student_Input.entry_year}
                            disabled
                            name="entry_year"
                            variant="outlined"/>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={12} style={{marginTop:10}}>
                        <FormControl style={{ width: '100%' }}>
                            <Typography style={{ color: '#786fa6', fontSize: 15,fontWeight:'500'}}>Last Attendance at WIS: </Typography>
                            <TextField
                                 inputProps={{ style: { color:"#2f3542"} }}
                            style={{width:'100%',backgroundColor:'#c8d6e5'}}
                                size={'small'}
                                id="outlined-helperText"
                                value={student_Input.last_attn}
                                disabled
                                name="last_attn"
                                variant="outlined" />
                        </FormControl>
                        
                    </Grid>
                    <Grid item xs={12} md={12} style={{marginTop:10}}>
                        <FormControl style={{ width: '100%' }}>
                            <Typography style={{ color: '#786fa6', fontSize: 15,fontWeight:'500'}}>Graduate/Undergraduate?: </Typography>
                            <TextField
                             inputProps={{ style: { color:"#2f3542"} }}
                            style={{width:'100%',backgroundColor:'#c8d6e5'}}
                            size={'small'}
                            id="outlined-helperText"
                            value={student_Input.gradStatus}
                            disabled
                            variant="outlined"/>
                        </FormControl>
                        
                    </Grid>
                    <Grid item xs={12} md={12} style={{marginTop:10}}>
                        <FormControl style={{ width: '100%' }}>
                            <Typography style={{ color: '#786fa6', fontSize: 15,fontWeight:'500'}}>Year Graduated: </Typography>
                            <TextField
                                 inputProps={{ style: { color:"#2f3542"} }}
                            style={{width:'100%',backgroundColor:'#c8d6e5'}}
                                size={'small'}
                                id="outlined-helperText"
                                disabled
                                value={student_Input.year_graduated}
                                name="year_graduated"
                                variant="outlined"/>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={12} style={{marginTop:10}}>
                        <FormControl style={{ width: '100%' }}>
                            <Typography style={{ color: '#786fa6', fontSize: 15,fontWeight:'500'}}>Department: </Typography>
                            <TextField
                                 inputProps={{ style: { color:"#2f3542"} }}
                            style={{width:'100%',backgroundColor:'#c8d6e5'}}
                                size={'small'}
                                id="outlined-helperText"
                                disabled
                                value={student_Input.department}
                                variant="outlined"/>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={12} style={{marginTop:10}}>
                        <FormControl style={{ width: '100%' }}>
                            <Typography style={{ color: '#786fa6', fontSize: 15,fontWeight:'500'}}>Degree Program: </Typography>
                            <TextField
                                 inputProps={{ style: { color:"#2f3542"} }}
                            style={{width:'100%',backgroundColor:'#c8d6e5'}}
                                size={'small'}
                                id="outlined-helperText"
                                disabled
                                value={student_Input.degree}
                                name="degree"
                                variant="outlined"/>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={12} style={{marginTop:10}}>
                        <FormControl style={{ width: '100%' }}>
                            <Typography style={{ color: '#786fa6', fontSize: 15,fontWeight:'500'}}>Major: </Typography>
                            <TextField
                                 inputProps={{ style: { color:"#2f3542"} }}
                            style={{width:'100%',backgroundColor:'#c8d6e5'}}
                                size={'small'}
                                id="outlined-helperText"
                                disabled
                                value={student_Input.major}
                                variant="outlined"/>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={12} style={{marginTop:10}}>
                        <FormControl style={{ width: '100%' }}>
                            <Typography style={{ color: '#786fa6', fontSize: 15,fontWeight:'500'}}>Permanent Address: </Typography>
                            <TextField
                                 inputProps={{ style: { color:"#2f3542"} }}
                                 style={{width:'100%',backgroundColor:'#c8d6e5'}}
                                value={student_Input.address}
                                name="address"
                                id="outlined-multiline-static"
                                multiline
                                disabled
                                rows={3}
                                variant="outlined"/>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={7} style={{marginTop:10}}>
                        <FormControl style={{ width: '100%' }}>
                            <Typography style={{ color: '#786fa6', fontSize: 15,fontWeight:'500'}}>Elementary School: </Typography>
                            <TextField
                                inputProps={{ style: { color:"#2f3542"} }}
                                style={{width:'100%',backgroundColor:'#c8d6e5'}}
                                size={'small'}
                                value={student_Input.elem_school}
                                name="elem_school"
                                disabled
                                id="outlined-helperText"
                                variant="outlined"/>
                        </FormControl>
                       
                    </Grid>
                    <Grid item xs={12} md={5} style={{marginTop:10}}>
                        <FormControl style={{ width: '100%' }}>
                            <Typography style={{ color: '#786fa6', fontSize: 15,fontWeight:'500'}}>Year Graduated (Elementary): </Typography>
                            <TextField
                                 inputProps={{ style: { color:"#2f3542"} }}
                            style={{width:'100%',backgroundColor:'#c8d6e5'}}
                                size={'small'}
                                value={student_Input.elem_year}
                                id="outlined-helperText"
                                name="elem_year"
                                disabled
                                variant="outlined"/>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={7} style={{marginTop:10}}>
                        <FormControl style={{ width: '100%' }}>
                            <Typography style={{ color: '#786fa6', fontSize: 15,fontWeight:'500'}}>High School: </Typography>
                            <TextField
                                 inputProps={{ style: { color:"#2f3542"} }}
                            style={{width:'100%',backgroundColor:'#c8d6e5'}}
                                size={'small'}
                                id="outlined-helperText"
                                value={student_Input.high_school}
                                name="high_school"
                                disabled
                                variant="outlined"/>
                        </FormControl>
                       
                    </Grid>
                    <Grid item xs={12} md={5} style={{marginTop:10}}>
                        <FormControl style={{ width: '100%' }}>
                            <Typography style={{ color: '#786fa6', fontSize: 15,fontWeight:'500'}}>Year Graduated (High School): </Typography>
                            <TextField
                                 inputProps={{ style: { color:"#2f3542"} }}
                            style={{width:'100%',backgroundColor:'#c8d6e5'}}
                                size={'small'}
                                id="outlined-helperText"
                                value={student_Input.high_year}
                                name="high_year"
                                disabled
                                variant="outlined"/>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={12} style={{marginTop:10}}>
                        <FormControl style={{ width: '100%' }}>
                            <Typography style={{ color: '#786fa6', fontSize: 15,fontWeight:'500'}}>Tertiary: (If Transferee): </Typography>
                            <TextField
                                 inputProps={{ style: { color:"#2f3542"} }}
                            style={{width:'100%',backgroundColor:'#c8d6e5'}}
                                size={'small'}
                                id="outlined-helperText"
                                value={student_Input.tertiary}
                                name="tertiary"
                                disabled
                                variant="outlined"/>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={12} style={{marginTop:10}}>
                        <FormControl style={{ width: '100%' }}>
                            <Typography style={{ color: '#786fa6', fontSize: 15,fontWeight:'500'}}>Basis of Admission: </Typography>
                            <TextField
                                 inputProps={{ style: { color:"#2f3542"} }}
                            style={{width:'100%',backgroundColor:'#c8d6e5'}}
                                size={'small'}
                                id="outlined-helperText"
                                disabled
                                value={student_Input.admission}
                                variant="outlined"/>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} md={6} style={{marginTop:10}}>
                        <FormControl style={{ width: '100%' }}>
                            <Typography style={{ color: '#786fa6', fontSize: 15,fontWeight:'500'}}>Contact Number: </Typography>
                            <TextField
                             inputProps={{ style: { color:"#2f3542"} }}
                            style={{width:'100%',backgroundColor:'#c8d6e5'}}
                            size={'small'}
                            id="outlined-helperText"
                            value={student_Input.contact}
                            variant="outlined"
                            disabled/>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6} style={{marginTop:10}}>
                        <FormControl style={{ width: '100%' }}>
                            <Typography style={{ color: '#786fa6', fontSize: 15,fontWeight:'500'}}>Email Address: </Typography>
                            <TextField
                                 inputProps={{ style: { color:"#2f3542"} }}
                            style={{width:'100%',backgroundColor:'#c8d6e5'}}
                                size={'small'}
                                disabled
                                id="outlined-helperText"
                                value={student_Input.email}
                                variant="outlined"/>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={12} style={{marginTop:10}}>
                        <FormControl style={{ width: '100%' }}>
                            <Typography style={{ color: '#786fa6', fontSize: 15,fontWeight:'500'}}>Applied Documents: </Typography>
                            <ul>
                                {ApplyFor.map((val,index)=>{
                                    return<li key={index}>{val}</li>
                                })}
                            </ul>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl style={{ width: '100%' }}>
                            <Typography style={{ color: '#786fa6', fontSize: 15,fontWeight:'500'}}>Transcript of Records (TOR) purpose: </Typography>
                            <TextField
                            inputProps={{ style: { color:"#2f3542"} }}
                            style={{width:'100%',backgroundColor:'#c8d6e5'}}
                            size={'small'}
                            disabled
                            id="outlined-helperText"
                            value={Selected_tor}
                            variant="outlined"/>
                        </FormControl>
                     
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl style={{ width: '100%' }}>
                            <Typography style={{ color: '#786fa6', fontSize: 15,fontWeight:'500'}}>Type of certification: </Typography>
                            <TextField
                            inputProps={{ style: { color:"#2f3542"} }}
                            style={{width:'100%',backgroundColor:'#c8d6e5'}}
                            size={'small'}
                            disabled
                            id="outlined-helperText"
                            value={Selected_Cert}
                            variant="outlined"/>
                        </FormControl>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} md={3}> </Grid>
        </Grid>
    );
}