import React, { useEffect } from 'react';
import '../../../App.css'
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

import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';

import AccountTreeIcon from '@material-ui/icons/AccountTree';
import Introduction from './introduction'
import { useParams, useHistory } from "react-router-dom";
// import StudentList from './studentList'
import { makeStyles,withStyles } from '@material-ui/core/styles';
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

const Accordion = withStyles({
    root: {
      border: '1px solid rgba(0, 0, 0, .125)',
      boxShadow: 'none',
      '&:not(:last-child)': {
        borderBottom: 0,
      },
      '&:before': {
        display: 'none',
      },
      '&$expanded': {
        margin: 'auto',
      },
    },
    expanded: {},
  })(MuiAccordion);

const AccordionSummary = withStyles({
    root: {
      backgroundColor: 'rgba(0, 0, 0, .03)',
      borderBottom: '1px solid rgba(0, 0, 0, .125)',
      marginBottom: -1,
      minHeight: 56,
      '&$expanded': {
        minHeight: 56,
      },
    },
    content: {
      '&$expanded': {
        margin: '12px 0',
      },
    },
    expanded: {},
  })(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
    },
  }))(MuiAccordionDetails);

export default function Issuance({handleClickOpen}) {
    const classes = useStyles();
    const History = useHistory()
    const [expanded, setExpanded] = React.useState('panel1');
    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
      };
    return (
        <Grid container spacing={2} >
            <Grid container item xs={12} md={4}>
                <div style={{width:'100%'}}>  
                    <Typography style={{textAlign:'left',color:'#4b4b4b',fontSize:16}}><b>The Office of the Registrar is responsible for the following :</b></Typography>
                    <Accordion square expanded={false} >
                        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" style={{backgroundColor:'#f7f7f7'}}>
                            <Typography style={{textAlign:'left',fontSize:15}}>Transcript of Records</Typography>
                        </AccordionSummary>
                    </Accordion>
                    <Accordion square expanded={false} >
                        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header" style={{backgroundColor:'#f7f7f7'}}>
                        <Typography style={{textAlign:'left',fontSize:15}}>Diploma or Certificates for non-degree programs </Typography>
                        </AccordionSummary>
                    </Accordion>
                    <Accordion square expanded={false}>
                        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header" style={{backgroundColor:'#f7f7f7'}}>
                        <Typography style={{textAlign:'left',fontSize:15}}>Copy of Grades/Scholastic Records/Class Cards</Typography>
                        </AccordionSummary>
                    </Accordion>
                    <Accordion square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header" style={{backgroundColor:'#f7f7f7'}}>
                        <Typography style={{textAlign:'left',fontSize:15}}>Transfer Credentials</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <ul>
                                <li style={{textAlign:'left',fontSize:15}}>Certificate of Eligibility to Transfer  </li>
                                <li style={{textAlign:'left',fontSize:15}}>Copy of Grades</li>
                                <li style={{textAlign:'left',fontSize:15}}>Certificate of Good Moral Character </li>
                                <li style={{textAlign:'left',fontSize:15}}>Transcript of Records </li>
                                <li style={{textAlign:'left',fontSize:15}}>Notice of Passing</li>
                                <li style={{textAlign:'left',fontSize:15}}>Permit to Cross-Enroll</li>
                            </ul>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion square expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header" style={{backgroundColor:'#f7f7f7'}}>
                        <Typography style={{textAlign:'left',fontSize:15}}>Certifications</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <ul style={{marginTop:10}}>
                                <li style={{textAlign:'left',fontSize:15}}>Certification of Graduation</li>
                                <li style={{textAlign:'left',fontSize:15}}>Certification of Enrollment</li>
                                <li style={{textAlign:'left',fontSize:15}}>Certification of Grades</li>
                                <li style={{textAlign:'left',fontSize:15}}>Certification of Honors</li>
                                <li style={{textAlign:'left',fontSize:15}}>Certification of Good Moral Character </li>
                                <li style={{textAlign:'left',fontSize:15}}>Certification of Grading System</li>
                                <li style={{textAlign:'left',fontSize:15}}>Certification of Course Description</li>
                                <li style={{textAlign:'left',fontSize:15}}>Certification of Medium of Instruction</li>
                            </ul>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion square expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header" style={{backgroundColor:'#f7f7f7'}}>
                        <Typography style={{textAlign:'left',fontSize:15}}>Student Forms</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <ul>
                                <li style={{textAlign:'left',fontSize:15}}>Student Document Application Form </li>
                                <li style={{textAlign:'left',fontSize:15}}>Completion Form </li>
                                <li style={{textAlign:'left',fontSize:15}}>Adding/Dropping Form </li>
                                <li style={{textAlign:'left',fontSize:15}}>Changing Form</li>
                                <li style={{textAlign:'left',fontSize:15}}>Shifting Form </li>
                                <li style={{textAlign:'left',fontSize:15}}>Leave of Absence Form</li>
                                <li style={{textAlign:'left',fontSize:15}}>Exit Form</li>
                                <li style={{textAlign:'left',fontSize:15}}>Student Clearance</li>
                            </ul>
                        </AccordionDetails>
                    </Accordion>
                 
                </div>
            </Grid>
            <Grid container item xs={12} md={8}>
                <Introduction handleClickOpen={handleClickOpen}/>
            </Grid>
        </Grid>
    );
}