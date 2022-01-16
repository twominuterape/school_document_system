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
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { useParams, useHistory } from "react-router-dom";
import Wisimage from '../../assets/westmead.jpeg'

// import StudentList from './studentList'
import { makeStyles } from '@material-ui/core/styles';
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
export default function Introduction({handleClickOpen}) {
    const classes = useStyles();
    const History = useHistory()
    return (
        <div>
            <img src={Wisimage} style={{width:'100%',height:140}} />
            <Card  style={{width:'100%',}}>
            <CardContent >
                <Typography variant="h5" style={{textAlign:'left',color:'#4b4b4b'}}><b>ONLINE DOCUMENT APPLICATION PORTAL</b></Typography>
                <hr style={{borderTop:'5px dashed #f7be68',marginTop:10,marginBottom:10}}/>
                <Typography  style={{textAlign:'left',color:'#5c5c5c',fontSize:14}}>
                    <b>
                    This is an online document request portal for college students/alumni of 
                    Westmead International School ONLY. Please refer to the following general guidelines:
                    </b>
                </Typography>
                <ol style={{marginTop:10}}>
                    <li style={{textAlign:'left',fontSize:14}}>
                        To those who will be requesting for documents, make sure to settle any outstanding 
                        balance on your account before proceeding with the document application process.  
                    </li>
                    <li style={{textAlign:'left',fontSize:14}}>
                        Fill-out all the required information correctly and pay the total fees in any of 
                        the WIS-accredited banks based on the cost per requested document indicated below for your request to be processed:
                        <ul style={{marginTop:10}}>
                            <li style={{textAlign:'left',fontSize:14}}>Diploma & TOR (Personal Copy) -- P45.00</li>
                            <li style={{textAlign:'left',fontSize:14}}>
                                TOR (for specific purpose) -- P195 (1 page) ; P345 (2 pages) ;
                                P495 (3 pages) ; P645 (4 pages)
                            </li>
                            <li style={{textAlign:'left',fontSize:14}}>Certifications (per type) -- P145.00</li>
                            <li style={{textAlign:'left',fontSize:14}}>Complete CAV Credentials -- P250.00</li>
                            <li style={{textAlign:'left',fontSize:14}}>Transfer Credentials -- P485.00</li>
                            <li style={{textAlign:'left',fontSize:14}}>Certified True Copy of Document -- P30.00 (per type of document with max of 2 copies per document)</li>
                        </ul>
                    </li>
                    <li style={{textAlign:'left',fontSize:14,marginTop:10}}>Do not forget to attach a copy of your proof of payment for verification purposes. </li>
                    <li style={{textAlign:'left',fontSize:14}}>
                        An email containing your Reference Number and Claim Stub will be sent to the email 
                        address that you indicated in this document application portal upon verification of the application details and the proof of payment.
                    </li>
                    <li style={{textAlign:'left',fontSize:14}}>You can pickup your requested document(s) 5-7 working days after the verification period from 1PM to 4PM only.</li>
                    <li style={{textAlign:'left',fontSize:14}}>Present your printed Claim Stub, indicating your reference number and claiming date, when claiming the requested document(s).</li>
                    <li style={{textAlign:'left',fontSize:14}}>
                        In case the requester is not available to personally claim his/her requested document(s), 
                        an authorization letter, I.D. of requester and I.D. of his/her authorized representative must be presented together with the Claiming Stub.
                    </li>
                    <li style={{textAlign:'left',fontSize:14}}>
                        Pay directly thru any of the following WIS-accredited banks or via GCash:<br/>
                        Bank Name: Bank of Commerce (BOC)<br/>
                        Account Name: Westmead International School Inc.<br/>
                        Account Number: 027-00-001272-1<br/>
                        <br/>
                        Bank Name: Banco de Oro (BDO)<br/>
                        Account Name: Westmead International School Inc.<br/>
                        Account Number: 012598000438
                    </li>
                </ol>
                <div style={{width:'100%',display:'flex',justifyContent:'flex-end'}}>
                    <Button 
                        onClick={handleClickOpen}
                        variant="contained" 
                        color="primary"
                        startIcon={<AssignmentIcon />}>
                        Next
                    </Button>
                </div>
                
            </CardContent>
        </Card>
        </div>
    );
}