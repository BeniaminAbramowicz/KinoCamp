import React from 'react';
import NavBar from '../components/NavBar'
import '../style/styles.css'
import ScreeningsPage from '../pages/ScreeningsPage';
import RegisterPage from '../pages/RegisterPage'
import LoginPage from '../pages/LoginPage'
import ProfilePage from '../pages/ProfilePage'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path="/screenings" exact component={ScreeningsPage} />
        <Route path="/registerpage" exact component={RegisterPage} />
        <Route path="/loginpage" exact component={LoginPage} />
        <Route path="/logout" exact component={LoginPage} />
        <Route path="/profile" exact component={ProfilePage} />
      </Switch>
    </Router>
  );
}

export default App
