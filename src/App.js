import React, { useEffect } from 'react';
import './App.css';
// import MainNav from './components/mainNavigation'
// import PendingForm from './components/pendingForm'
// import NewApplicationForm from './components/newApplicationForm'
// import LoadingScreen from './components/splash/loadingscreen'
import Routing from './components/navigation/router'
import Loginpg from './components/loginpg/login'
import {
  HashRouter ,
  Route,
  useParams,
  Router,  
  Redirect
} from "react-router-dom";

function App() {
  return (
    <HashRouter>
    {/* <Navigation/> */}
      {/* <Route exact path="/:user_id" component={LoadingScreen} /> */}
      <Route exact path="/" component={Loginpg} />
      <Route  path="/wis" component={Routing} />
      {/* <Route path="/pendingform" component={MainNav} />
      <Route path="/NewApplicationForm" component={NewApplicationForm} /> */}
    </HashRouter>
  );
}

export default App; 