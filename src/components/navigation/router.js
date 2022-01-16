import React, { useEffect } from 'react';
import clsx from 'clsx';
// import '../../src/App.css';
import {
    HashRouter as Router,
    Route,
    useParams,
    Redirect
} from "react-router-dom";
import Navigation from '../navigation/navigation'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Routes from './routes'
import { useSelector, useDispatch } from 'react-redux'
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));
export default function LoginPg() {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    console.log('hehehe')
    return <div className="App">
        <Router>
            <div className={classes.root}>
                <Navigation />
                <div style={{width:'100%',marginTop:80}}>
                    {/* <div className={classes.drawerHeader} /> */}
                    {Routes.map((value, index) => {
                        return <Route key={index} exact={value.exact} path={value.path} component={value.component} />
                    })}
                </div>
            </div>
        </Router>
    </div>
}
