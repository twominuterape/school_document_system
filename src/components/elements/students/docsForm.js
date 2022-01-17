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

import FormHelperText from '@material-ui/core/FormHelperText';
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
export default function LoginPg() {
    const classes = useStyles();
    const History = useHistory()
    const [refreshs, setrefreshs] = React.useState(false);
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
    const [selectedTor, setselectedTor] = React.useState('');
    const [selectedCert, setselectedCert] = React.useState('');
    const [appliedCheck, setappliedCheck] = React.useState([]);

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('xl'));

    const handleApply = (event) => {
        const currentIndex = appliedCheck.findIndex(x => String(x).toUpperCase() === String(event.target.name).toUpperCase())
        if(currentIndex === -1){
            appliedCheck.push(event.target.name)
            setrefreshs(!refreshs)
        }else{
            appliedCheck.splice(currentIndex, 1);
            setrefreshs(!refreshs)
        }
    };

    const handleChangeTor = (event) => {
        setselectedTor(event.target.value);
    };

    const handleChangeCertificate = (event) => {
        setselectedCert(event.target.value);
    };

    useEffect(()=>{
        console.log(docstype)
    },[])
    return (
        <Grid container spacing={1} >
            <Grid item xs={12} md={3} ></Grid>
            <Grid item xs={12} md={6} >
                <Typography variant="h4" >Document(s) Applied for:</Typography>
                <Typography  style={{textAlign:'left',color:'#2f3640',fontSize:16}}> Please select the type(s) of document you are requesting by clicking on the appropriate checkbox(es). * </Typography>
                <FormControl component="fieldset" required={true}>
                    <FormGroup >
                        {docstype.map((value,index)=>{
                            return<FormControlLabel
                            key={index}
                            control={<Checkbox checked={appliedCheck.findIndex(x => String(x).toUpperCase() === String(value.type).toUpperCase()) !== -1} onChange={handleApply} name={value.type} />}
                            label={value.type}/>
                        })}
                    </FormGroup>
                </FormControl>
                <Divider style={{marginTop:10}}/>
                <Typography  style={{textAlign:'left',color:'#2f3640',fontSize:16,marginTop:10}}> If you're applying for a Transcript of Records (TOR), please identify the purpose. *</Typography>
                <FormControl variant="outlined" className={classes.formControl} style={{width:'100%',marginTop:10}}size={"small"} required={true}>
                    <InputLabel id="demo-simple-select-outlined-label">-Choose-</InputLabel>
                    <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={selectedTor}
                    onChange={handleChangeTor}
                    label="Age"
                    >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {torType.map((value,index)=>{
                        return<MenuItem value={value.type} key={index}>{value.type}</MenuItem>
                    })}
                    </Select>
                </FormControl>
                <Divider style={{marginTop:10}}/>
                <Typography  style={{textAlign:'left',color:'#2f3640',fontSize:16,marginTop:10}}> If you're applying for a Certification, please specify the type. *</Typography>
                <FormControl variant="outlined" className={classes.formControl} style={{width:'100%',marginTop:10}}size={"small"} required={true}>
                    <InputLabel id="demo-simple-select-outlined-label">-Choose-</InputLabel>
                    <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={selectedCert}
                    onChange={handleChangeCertificate}
                    label="Age"
                    >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {certificationType.map((value,index)=>{
                        return<MenuItem value={value.type} key={index}>{value.type}</MenuItem>
                    })}
                    </Select>
                </FormControl>
                <Divider style={{marginTop:10}}/>
                <Typography  style={{textAlign:'left',color:'#2f3640',fontSize:16,marginTop:10}}> If you're applying for a Certified True Copy of document, please attach the clear scanned copy here</Typography>
                <Button
                    style={{marginTop:10}}
                    variant="contained"
                    color="default"
                    className={classes.button}
                    startIcon={<CloudUploadIcon />}>
                    Attach file
                </Button>
            </Grid>
            <Grid item xs={12} md={3}> </Grid>
        </Grid>
    );
}