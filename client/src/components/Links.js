import React from 'react'
import apis from '../api/index'
import Logo from '../components/Logo'


class Links extends React.Component {

    logoutFunction = async () =>{
        await apis.logoutUser()
        .then(() => {
            window.localStorage.setItem('auth', false);
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
                        <li className="nav-item">
                            <a href="/registerpage" className="nav-link">
                                Register
                            </a>
                        </li>
                    </ul>
                    <ul id="nav-logout" className="navbar-nav navbar-inner"> 
                        <li className="nav-item">
                            <a href="/myreservations" className="nav-link">
                                My Reservations
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="/profile" className="nav-link">
                                Profile
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="/loginpage" className="nav-link" onClick={this.logoutFunction}>
                                Logout
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="/loginpage" className="nav-link">
                                Login
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default Links