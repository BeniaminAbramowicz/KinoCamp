import React from 'react';
import { Router } from 'express';
import { NavBar } from '../components'
import '../style/styles.css'

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        {/* <Route path="/screenings" exact component={ScreeningsList} /> */}
      </Switch>
    </Router>
  );
}

export default App;
