import React from 'react';
import { Router } from 'express';
import { NavBar } from '../components'

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
