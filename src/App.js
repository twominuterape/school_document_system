import React, { useEffect } from 'react';
import './App.css';
// import MainNav from './components/mainNavigation'
// import PendingForm from './components/pendingForm'
// import NewApplicationForm from './components/newApplicationForm'
// import LoadingScreen from './components/splash/loadingscreen'
import Routing from './components/navigation/router'
import Loginpg from './components/loginpg/login'
import AddDocs from './components/elements/admin/addDocs/indexDocs'
import StudentRoute from './components/navigation/student_router'
import {
  HashRouter ,
  Route,
  useParams,
  Router,  
  Redirect
} from "react-router-dom";

function App() {
  let login = localStorage.getItem('l')
  return (
    <HashRouter>
    {/* <Navigation/> */}
      {/* <Route exact path="/:user_id" component={LoadingScreen} /> */}
      {login == null?
      <Route exact path="/" component={Loginpg} />

      :
      <Route  path="/" component={Routing} />

      }
      {/* <Route  path="/wis/" component={StudentRoute} /> */}

      {/* <Route path="/pendingform" component={MainNav} />
      <Route path="/NewApplicationForm" component={NewApplicationForm} /> */}
    </HashRouter>
  );
}

export default App; 