import React from 'react';
import '../style/styles.css'
import ScreeningsPage from '../pages/ScreeningsPage';
import RegisterPage from '../pages/RegisterPage'
import LoginPage from '../pages/LoginPage'
import ProfilePage from '../pages/ProfilePage'
import MyReservationsPage from '../pages/MyReservationsPage'
import NotFoundPage from '../pages/NotFoundPage'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

class App extends React.Component{
  render() {
  return(
    <Router>
      <Switch>
        <Route path="/" exact component={() => (<Redirect to="/screenings"/>)} />
        <Route path="/screenings" exact component={ScreeningsPage}/>
        <Route path="/registerpage" exact component={RegisterPage}/>
        <Route path="/loginpage" exact component={LoginPage}/>
        <Route path="/profile" exact component={ProfilePage}/>
        <Route path="/myreservations" exact component={MyReservationsPage}/>
        <Route exact component={NotFoundPage} />
      </Switch>
    </Router>
  );
  }
}

export default App
