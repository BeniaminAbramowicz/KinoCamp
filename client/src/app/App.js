import React from 'react';
import NavBar from '../components/NavBar'
import '../style/styles.css'
import ScreeningsPage from '../pages/ScreeningsPage';
import RegisterPage from '../pages/RegisterPage'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path="/screenings" exact component={ScreeningsPage} />
        <Route path="/registerpage" exact component={RegisterPage} />
      </Switch>
    </Router>
  );
}

export default App;
