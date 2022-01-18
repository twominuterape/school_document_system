import React, { useEffect } from 'react';
import clsx from 'clsx';
// import '../../src/App.css';
import {
    HashRouter as Router,
    Route,
    useParams,
    Redirect,
    Link as NewLink
} from "react-router-dom";
import Navigation from '../navigation/navigation'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { routes_student } from './routes'
import { useSelector, useDispatch } from 'react-redux'
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
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
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: '#fff'
        // backgroundImage: `linear-gradient(to top, #95a5a6, #636e72)`,
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
        backgroundColor: '#b64444',
        // backgroundImage: `linear-gradient(to right,#636e72,#5b6366)`,

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
        width: '100%',
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
    const theme = useTheme();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const [open, setOpen] = React.useState(true);
    return <div className="App">
        <Router>
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    elevation={1}
                    position="fixed"
                    className={classes.appBar}
                >
                    <Toolbar>
                     
                        <Typography variant="h6" noWrap style={{ fontWeight: 'bold', color: '#7f8c8d' }}>
                            Document Management System
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={false}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </div>
                    <div style={{ height: 110, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                        <AccountCircleIcon style={{ width: 80, height: 80, color: '#b23232' }} />

                    </div>
                    <Divider />
                    <List>
                        <ListItem component={NewLink} to="/wis/documents/" button >
                            <ListItemIcon > <InboxIcon style={{ color: '#fff' }} /></ListItemIcon>
                            <ListItemText primary={'Documents'} style={{ color: '#fff' }} />
                        </ListItem>
                        <ListItem button >
                            <ListItemIcon> <InboxIcon style={{ color: '#fff' }} /></ListItemIcon>
                            <ListItemText primary={'Requests'} style={{ color: '#fff' }} />
                        </ListItem>
                        {/* {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>{index % 2 === 0 ? <InboxIcon style={{color:'#fff'}} /> : <MailIcon style={{color:'#fff'}} />}</ListItemIcon>
                                <ListItemText primary={text} style={{color:'#fff'}} />
                            </ListItem>
                        ))} */}
                    </List>
                    <List style={{ marginTop: `auto` }} >
                        <Divider />
                        <ListItem button style={{ backgroundColor: '#b23232' }}>
                            <ListItemText style={{ color: '#fff' }}>Logout</ListItemText>
                            <ExitToAppIcon style={{ color: '#fff' }} />
                        </ListItem>
                        <Divider />
                    </List>
                    <Divider />

                </Drawer>
                <main
                    className={clsx(classes.content, {
                        [classes.contentShift]: open,
                    })}
                >
                     <div className={classes.drawerHeader} />
                    {routes_student.map((value, index) => {
                        return <Route key={index} exact={value.exact} path={value.path} component={value.component} />
                    })}
                </main>
            </div>
        </Router>
    </div>
}
