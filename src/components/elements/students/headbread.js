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
import { useDispatch,useSelector } from 'react-redux'
import { useParams, useHistory } from "react-router-dom";
import DeleteIcon from '@material-ui/icons/Delete';
import StorageIcon from '@material-ui/icons/Storage';
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
export default function HeadBread({handleHistory}) {
    const classes = useStyles();
    const History = useHistory()
    const studentHistory = useSelector(state => state.studData.histories)
    return (
        <Grid container spacing={1} style={{marginBottom:10}}>
            <Grid container item xs={12} md={8}>
                <Breadcrumbs aria-label="breadcrumb" gutterBottom>
                    <Link color="inherit" href="/">Document Portal</Link>
                    <Typography color="textPrimary">Index</Typography>
                </Breadcrumbs>
            </Grid>
            <Grid container item xs={12} md={4}>
                <div style={{display:'flex',width:'100%',justifyContent:'flex-end'}}>
                    {studentHistory.length > 0 &&
                    <   Button variant="outlined" color="primary" onClick={handleHistory}> TRANSACTION HISTORY </Button>
                    }
                </div>
            </Grid>
        </Grid>
    );
}