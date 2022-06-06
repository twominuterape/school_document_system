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
import { DropzoneArea } from 'material-ui-dropzone'
import FormHelperText from '@material-ui/core/FormHelperText';
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
export default function DocsPg({warning}) {
    const classes = useStyles();
    const History = useHistory()
    const [refreshs, setrefreshs] = React.useState(false);
    const [openCertified, setopenCertified] = React.useState(false);
    // const [docstype, setdocstype] = React.useState([
    //     {type:'Diploma',price:'45'},
    //     {type:'Transcript of Records (TOR)',price:'195'},
    //     {type:'Certification',price:'145'},
    //     {type:'Transfer Credentials',price:'485'},
    //     {type:'CAV Credentials',price:'250'},
    //     {type:'Certified True Copy of Document',price:'30'},
    // ]);

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
    const [selectedTor, setselectedTor] = React.useState('');
    const [selectedCert, setselectedCert] = React.useState('');
    const [appliedCheck, setappliedCheck] = React.useState([]);
    const [files, setfiles] = React.useState([]);

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('xl'));
    const Dispatch = useDispatch();

    const ApplyFor = useSelector(state => state.reqDocsReducer.appliedFor)
    const Selected_tor = useSelector(state => state.reqDocsReducer.tor_type)
    const Selected_Cert = useSelector(state => state.reqDocsReducer.cert_type)
    const CertifiedFiles = useSelector(state => state.reqDocsReducer.certifiedCopy)

    const documentCat = useSelector(state => state.reqDocsReducer.documentCat)
    const torCat = useSelector(state => state.reqDocsReducer.torCat)
    const CertifiedCat = useSelector(state => state.reqDocsReducer.certificationCat)
    

    const handleApply = (event) => {
        let appliedArray = ApplyFor
        const currentIndex = appliedArray.findIndex(x => String(x).toUpperCase() === String(event.target.name).toUpperCase())
        if(currentIndex === -1){
            appliedArray.push(event.target.name)
            Dispatch({
                type:'passApply',
                applyDocs:appliedArray,
            })
            setrefreshs(!refreshs)
        }else{
            appliedArray.splice(currentIndex, 1);
            setrefreshs(!refreshs)
            Dispatch({
                type:'passApply',
                applyDocs:appliedArray,
            })
        }
    };

    const handleChangeTor = (event) => {
        Dispatch({
            type:'passTor',
            tor_selected:event.target.value,
        })
    };

    const handleChangeCertificate = (event) => {
        Dispatch({
            type:'passCert',
            cert_selected:event.target.value,
        })
    };

    const handleClose = () => {
        setfiles([])
        setopenCertified(false);
    };

    const handleChangeFile = (files) => {
        setfiles(files)
    }

    const handleDelete = () => {
        Dispatch({
            type:'passCertified',
            certifiedImage:[],
        })
        setfiles([])
    };

    useEffect(()=>{
    },[])
    return (
        <Grid container spacing={1} >
            <Grid item xs={12} md={3} ></Grid>
            <Grid item xs={12} md={6} >
                <Typography variant="h4" >Document(s) Applied for:</Typography>
                {warning === true &&
                    <Card  style={{width:'100%',backgroundColor:'rgba(179, 57, 57,.9)',marginTop:10,marginBottom:10}}>
                        <CardContent >
                            <Typography style={{fontSize:16,marginTop:5,color:'#f5f6fa'}} >This section is required. Please select a document</Typography>
                        </CardContent>
                    </Card>
                }
                
                <Typography  style={{textAlign:'left',color:'#2f3640',fontSize:16}}> Please select the type(s) of document you are requesting by clicking on the appropriate checkbox(es). * </Typography>
                <FormControl component="fieldset" required={true}>
                    <FormGroup>
                        {/* {docstype.map((value,index)=>{
                            return<FormControlLabel
                            key={index}
                            control={<Checkbox checked={ApplyFor.findIndex(x => String(x).toUpperCase() === String(value.type).toUpperCase()) !== -1} onChange={handleApply} name={value.type} />}
                            label={value.type}/>
                        })} */}
                            {documentCat.map((value,index)=>{
                            return<FormControlLabel
                            key={index}
                            control={<Checkbox checked={ApplyFor.findIndex(x => String(x).toUpperCase() === String(value.option_name).toUpperCase()) !== -1} onChange={handleApply} name={value.option_name} />}
                            label={value.option_name}/>
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
                    value={Selected_tor}
                    onChange={handleChangeTor}
                    label="Age"
                    >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {torCat.map((value,index)=>{
                        return<MenuItem value={value.option_name} key={index}>{value.option_name}</MenuItem>
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
                    value={Selected_Cert}
                    onChange={handleChangeCertificate}
                    label="Age"
                    >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {CertifiedCat.map((value,index)=>{
                        return<MenuItem value={value.option_name} key={index}>{value.option_name}</MenuItem>
                    })}
                    {/* {certificationType.map((value,index)=>{
                        return<MenuItem value={value.type} key={index}>{value.type}</MenuItem>
                    })} */}
                    </Select>
                </FormControl>
                <Divider style={{marginTop:10}}/>
                <Typography  style={{textAlign:'left',color:'#2f3640',fontSize:16,marginTop:10}}> If you're applying for a Certified True Copy of document, please attach the clear scanned copy here</Typography>
                <Button
                    onClick={()=>setopenCertified(true)}
                    style={{marginTop:10}}
                    variant="contained"
                    color="default"
                    className={classes.button}
                    startIcon={<CloudUploadIcon />}>
                    Attach file
                </Button>
                <Typography>{CertifiedFiles.length > 0 ? CertifiedFiles[0].name : ""}</Typography>

                <Dialog
                    fullWidth={"sm"}
                    open={openCertified}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
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
                            initialFiles={CertifiedFiles}
                            showPreviewsInDropzone={true}/>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={()=>{
                         Dispatch({
                            type:'passCertified',
                            certifiedImage:files,
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