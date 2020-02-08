import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import { NavBar } from '../components';
import {WhatsOn, Schedule, Reservation, Login,  Register} from '../pages';

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path="/whatson" exact component={WhatsOn} />
        <Route path="/schedule" exact component={Schedule} />
        <Route path="/reservation" exact component={Reservation} />
        <Route path="/register" exact component={Register} />
        <Route path="/login" exact component={Login} />
      </Switch>
    </Router> 
  )
}

export default App;
