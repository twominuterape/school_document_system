import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
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
import { useParams,useHistory } from "react-router-dom";

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
export default function LoginPg() {
  const classes = useStyles();
  const History = useHistory()
  return (
    <React.Fragment>
      <Container>
        <div style={{ width: '100%', height: '100%',  }}>
          <div  style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', flexDirection: 'row' }}>
            <div  style={{width:'55%',height:300}}>
              <Grid container>
                <Grid item xs={7}>
                  <Card style={{height: 300, width: '100%',borderRadius:0}}>
                    <CardContent>
                      <div style={{ backgroundColor: '#fff', borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}>
                        <Typography variant="h4">Login</Typography>
                        <Typography variant="subtitle1" gutterBottom>Sign In to your account</Typography>
                        <div style={{marginTop:'10%'}}>
                        <FormControl style={{ width: '100%', }}>
                          <TextField
                            label="Username"
                            id="outlined-size-small"
                            variant="outlined"
                            size="small"
                            InputProps={{
                              startAdornment: <InputAdornment position="end">
                                <IconButton aria-label="toggle password visibility" edge="start">
                                  <AccountCircle />
                                </IconButton>
                              </InputAdornment>
                            }} />
                        </FormControl>
                        <FormControl style={{ width: '100%',marginTop:15 }} >
                          <TextField
                            label="Password"
                            id="outlined-size-small"
                            variant="outlined"
                            size="small"
                            InputProps={{
                              startAdornment: <InputAdornment position="end">
                                <IconButton aria-label="toggle password visibility" edge="start">
                                  <AccountCircle />
                                </IconButton>
                              </InputAdornment>
                            }} />
                        </FormControl>
                        <Button
                          onClick={()=>{
                            History.push('/wis')
                          }}
                          size='small' variant="contained"
                          style={{
                            backgroundColor: "#4b6584",
                            color: "white",
                            alignSelf: 'flex-start',
                            marginTop: 10,
                            marginRight: 5,
                            height: 40
                          }}
                          className={classes.button}>Logasdasdsin</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={5}>
                  <Card style={{height: 300, width: '100%',backgroundColor: '#b33939',borderRadius:0}}>
                    <CardContent>
                      <div style={{borderTopRightRadius:10,borderBottomRightRadius:10 }}>
                      </div>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
}