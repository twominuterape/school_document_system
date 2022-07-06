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
export default function     StudentView({studentSelfData,warningadmiss}) {
    const classes = useStyles();
    const helperTestClasses = helperTextStyles();
    const History = useHistory()
    const [refreshs, setrefreshs] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    // const [docstype, setdocstype] = React.useState([
    //     {type:'Diploma'},
    //     {type:'Transcript of Records (TOR)'},
    //     {type:'Certification'},
    //     {type:'Transfer Credentials'},
    //     {type:'CAV Credentials'},
    //     {type:'Certified True Copy of Document'},
    // ]);

    const [state, setState] = React.useState({
        checkedA: true,
        checkedB: true,
        checkedF: true,
        checkedG: true,
      });

    // const [torType, settorType] = React.useState([
    //     {type:'Personal Copy'},
    //     {type:'Employment'},
    //     {type:'Graduate School'},
    //     {type:'Transfer Credentials'},
    //     {type:'Scholarship Application'},
    //     {type:'Transfer / Evaluation'},
    //     {type:'Lisensure Examination'},
    //     {type:'Others'},
    //     {type:'Not Applicable'},
    // ]);

    // const [certificationType, setcertificationType] = React.useState([
    //     {type:'General Weighted Average (GWA)'},
    //     {type:'Enrollment'},
    //     {type:'Graduation'},
    //     {type:'Good Moral Character (for Licensure Exam)'},
    //     {type:'Good Moral Character (for Transfer)'},
    //     {type:'Eligibility to Transfer (Undergraduate)'},
    //     {type:'Eligibility to Transfer (for Graduate School)'},
    //     {type:'English as Medium of Instruction'},
    //     {type:'Not Applicable'},
    // ]);

    // const [departmenttype, setdepartmenttype] = React.useState([
    //     {type:'CAS'},
    //     {type:'CITCS'},
    //     {type:'COE'},
    //     {type:'CTE'},
    //     {type:'CTHM'},
    //     {type:'SEBA'},
    // ]);

    // const [admissionType, setadmissionType] = React.useState([
    //     {type:'Junior High School Report Card (JHS Form 138)'},
    //     {type:'Senior High School Report Card (SHS Form 138)'},
    //     {type:'Transcript of Records (for transferees)'},
    // ]);
    const [age, setAge] = React.useState('');
    const theme = useTheme();
    const Dispatch = useDispatch();
    const fullScreen = useMediaQuery(theme.breakpoints.down('xl'));
    const [admissionVal, setadmissionVal] = React.useState('Junior High School Report Card (JHS Form 138)');

    const availableCourses = useSelector(state => state.studData.availableCourse)
    const availableDepartment = useSelector(state => state.studData.availableDept)

    const student_Input = useSelector(state => state.reqDocsReducer.studentDetails)
    const admissionCat = useSelector(state => state.reqDocsReducer.admissionCat)

    const onChange = (event) => {
        Dispatch({
            type:'passStudForm',
            studentdetails:{
                [event.target.name]: String(event.target.value).toUpperCase()
            },
        })
    };

    const handleGraduate = (event) => {
        let yearGrad = ''
        yearGrad = event.target.value === 'Undergraduate' ? 'N/A' : ''
            Dispatch({
                type:'passStudForm',
                studentdetails:{
                    'gradStatus': event.target.value,
                    'year_graduated':yearGrad
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

    const handleCourses = (event) => {
        Dispatch({
            type:'passStudForm',
            studentdetails:{
                'degree': event.target.value
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

    const initialInputed=()=>{
        Dispatch({
            type:'passStudForm',
            studentdetails:{
                'studnum': String(studentSelfData[0]?.schoolId).toUpperCase(),
                'fname': String(studentSelfData[0]?.firstName).toUpperCase(),
                'lname': String(studentSelfData[0]?.lastName).toUpperCase(),
                'mname': String(studentSelfData[0]?.middleName).toUpperCase(),
            },
        })
    }  

    useEffect(()=>{
        initialInputed()
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
                            value={student_Input.studnum}
                            name="studnum"
                            onChange={onChange}
                            FormHelperTextProps={{ classes: helperTestClasses }}
                            label="Student Number:"
                            color="green"
                            helperText="Please enter your student number in this format: C201234"
                            variant="outlined"
                            disabled
                            />
                    </Grid>
                    <Grid item xs={12} md={4} style={{marginTop:10}}>
                        <TextField
                            style={{width:'100%'}}
                            size={'small'}
                            value={String(student_Input.lname).toLocaleUpperCase()}
                            onChange={onChange}
                            name="lname"
                            id="outlined-helperText"
                            required={true}
                            label="Last Name:"
                            variant="outlined"
                            disabled
                            />
                    </Grid>
                    <Grid item xs={12} md={4} style={{marginTop:10}}>
                        <TextField
                            style={{width:'100%'}}
                            size={'small'}
                            id="outlined-helperText"
                            required={true}
                            value={String(student_Input.fname).toLocaleUpperCase()}
                            onChange={onChange}
                            name="fname"
                            label="First Name:"
                            variant="outlined"
                            disabled
                            />
                    </Grid>
                    <Grid item xs={12} md={4} style={{marginTop:10}} >
                        <TextField
                        style={{width:'100%'}}
                            size={'small'}
                            required={true}
                            value={String(student_Input.mname).toLocaleUpperCase()}
                            onChange={onChange}
                            name="mname"
                            label="Middle Name:"
                            variant="outlined"
                            disabled
                            />
                    </Grid>
                    <Grid item xs={12} md={12} style={{marginTop:10}} >
                        <TextField
                        style={{width:'100%'}}
                            size={'small'}
                            id="outlined-helperText"
                            required={true}
                            value={String(student_Input.entry_year).toLocaleUpperCase()}
                            onChange={onChange}
                            name="entry_year"
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
                            value={String(student_Input.last_attn).toLocaleUpperCase()}
                            onChange={onChange}
                            name="last_attn"
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
                                value={student_Input.gradStatus}
                                onChange={handleGraduate}
                                label="Graduate/Undergraduate? ">
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value="Graduate">Graduate</MenuItem>
                                <MenuItem value="Undergraduate">Undergraduate</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={12} style={{marginTop:10}}>
                        <TextField
                            disabled={student_Input.gradStatus === 'Undergraduate' ? true : false}
                            style={{width:'100%'}}
                            size={'small'}
                            id="outlined-helperText"
                            required={true}
                            value={String(student_Input.year_graduated).toLocaleUpperCase()}
                            onChange={onChange}
                            name="year_graduated"
                            label="Year Graduated:"
                            FormHelperTextProps={{ classes: helperTestClasses }}
                            helperText="For undergraduate applicants, please indicate N/A"
                            variant="outlined"
                            />
                    </Grid>
                    <Grid item xs={12} md={12} style={{marginTop:10}}>
                        <FormControl variant="outlined" className={classes.formControl} style={{ width: '100%' }} size={"small"} required={true}>
                            <InputLabel id="demo-simple-select-outlined-label">Department: </InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={student_Input.department}
                                onChange={handleDepartment}>
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {availableDepartment.map((value, index) => {
                                    return <MenuItem value={value.dept_name} key={index}>{value.dept_name}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={12} style={{marginTop:10}}>
                        <FormControl variant="outlined" className={classes.formControl} style={{ width: '100%' }} size={"small"} required={true}>
                            <InputLabel id="demo-simple-select-outlined-label">Degree Program: </InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={student_Input.degree}
                                onChange={handleCourses}>
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {availableCourses.map((value, index) => {
                                    return <MenuItem value={value.course_name} key={index}>{value.course_name}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                        {/* <TextField
                            style={{width:'100%'}}
                            size={'small'}
                            id="outlined-helperText"
                            required={true}
                            value={student_Input.degree}
                            onChange={onChange}
                            name="degree"
                            FormHelperTextProps={{ classes: helperTestClasses }}
                            label="Degree Program: "
                            helperText="Please write your course in this format: BS Information Technology (BSIT)"
                            variant="outlined"
                            /> */}
                    </Grid>
                    <Grid item xs={12} md={12} style={{marginTop:10}}>
                        <TextField
                            style={{width:'100%'}}
                            size={'small'}
                            id="outlined-helperText"
                            required={true}
                            value={String(student_Input.major).toLocaleUpperCase()}
                            onChange={onChange}
                            name="major"
                            label="Major: "
                            FormHelperTextProps={{ classes: helperTestClasses }}
                            helperText="For degree programs without specialization/major, please indicate N/A"
                            variant="outlined"
                            />
                    </Grid>
                    <Grid item xs={12} md={12} style={{marginTop:10}}>
                        <TextField
                            style={{ width: '100%' }}
                            required={true}
                            value={String(student_Input.address).toLocaleUpperCase()}
                            onChange={onChange}
                            name="address"
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
                            value={String(student_Input.elem_school).toLocaleUpperCase()}
                            required={true}
                            onChange={onChange}
                            name="elem_school"
                            id="outlined-helperText"
                            label="Elementary School:"
                            variant="outlined"/>
                    </Grid>
                    <Grid item xs={12} md={5} style={{marginTop:10}}>
                        <TextField
                            style={{width:'100%'}}
                            size={'small'}
                            value={String(student_Input.elem_year).toLocaleUpperCase()}
                            id="outlined-helperText"
                            required={true}
                            onChange={onChange}
                            name="elem_year"
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
                            value={String(student_Input.high_school).toLocaleUpperCase()}
                            onChange={onChange}
                            name="high_school"
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
                            value={String(student_Input.high_year).toLocaleUpperCase()}
                            onChange={onChange}
                            name="high_year"
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
                            value={String(student_Input.tertiary).toLocaleUpperCase()}
                            onChange={onChange}
                            name="tertiary"
                            label="Tertiary: (If Transferee)"
                            variant="outlined"
                            />
                    </Grid>
                    <Grid item xs={12} md={12} style={{marginTop:10}}>
                        <Divider style={{marginBottom:10}}/>
                       
                        <FormControl component="fieldset" required={true}>
                            <FormLabel component="legend">Basis of Admission</FormLabel>
                            <FormGroup>
                                {/* {admissionType.map((value,index)=>{
                                    return<FormControlLabel
                                    key={index}
                                    control={<Checkbox checked={String(student_Input.admission).toUpperCase() === String(value.type).toUpperCase() ? true : false} onChange={handleAdmission} name={value.type} />}
                                    label={value.type}/>
                                })} */}
                                 {admissionCat.map((value,index)=>{
                                    return<FormControlLabel
                                    key={index}
                                    control={<Checkbox checked={String(student_Input.admission).toUpperCase() === String(value.option_name).toUpperCase() ? true : false} onChange={handleAdmission} name={value.option_name} />}
                                    label={value.option_name}/>
                                })}
                            </FormGroup>
                        </FormControl>
                        {warningadmiss === true &&
                            <Card  style={{width:'100%',backgroundColor:'rgba(179, 57, 57,.9)',marginTop:10,marginBottom:10}}>
                                <CardContent >
                                    <Typography style={{fontSize:16,marginTop:5,color:'#f5f6fa'}} >Admission section is required. </Typography>
                                </CardContent>
                            </Card>
                        }
                        <Divider style={{marginTop:10}}/>
                    </Grid>

                    <Grid item xs={12} md={6} style={{marginTop:10}}>
                        <TextField
                            style={{width:'100%'}}
                            size={'small'}
                            id="outlined-helperText"
                            required={true}
                            value={String(student_Input.contact).toLocaleUpperCase()}
                            onChange={onChange}
                            name="contact"
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
                            value={String(student_Input.email).toLocaleUpperCase()}
                            onChange={onChange}
                            name="email"
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