import React from 'react'
import Logo from '../components/Logo'
import apis from '../api/index'

class NavBar extends React.Component {
    constructor(){
        super();

        this.state = {auth: window.localStorage.getItem('auth')};
    }

    changeNavAuth = () => {
        this.setState({auth: false});
    }

    logoutFunction = async () =>{
        await apis.logoutUser()
        .then(() => {
            window.localStorage.setItem('auth', false);
            this.setState({auth: 'false'});
        })
        .catch(err => {
            console.log(err);
        });
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark main-navbar">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <Logo />
                    <a href="/" className="navbar-brand">
                        Cinema Booking App
                    </a>
                    <ul className="navbar-nav navbar-inner">
                        <li className="nav-item">
                            <a href="/screenings" className="nav-link">
                                Screenings
                            </a>
                        </li>
                        {this.state.auth === 'false' || this.state.auth === false ?
                        <li className="nav-item">
                            <a href="/registerpage" className="nav-link">
                                Register
                            </a>
                        </li> : null}
                    </ul>
                    <ul id="nav-logout" className="navbar-nav navbar-inner"> 
                        {this.state.auth === 'true' || this.state.auth === true?
                        <li className="nav-item">
                            <a href="/myreservations" className="nav-link">
                                My Reservations
                            </a>
                        </li> : null}
                        {this.state.auth === 'true' || this.state.auth === true?
                        <li className="nav-item">
                            <a href="/profile" className="nav-link">
                                Profile
                            </a>
                        </li> : null}
                        {this.state.auth === 'true' || this.state.auth === true ?
                        <li className="nav-item">
                            <a href="/loginpage" className="nav-link" onClick={this.logoutFunction}>
                                Logout
                            </a>
                        </li> : null}
                        {this.state.auth === 'false' || this.state.auth === false ?
                        <li className="nav-item">
                            <a href="/loginpage" className="nav-link">
                                Login
                            </a>
                        </li> : null}
                    </ul>
                </div>
            </nav>
        )
    }
}

export default NavBar