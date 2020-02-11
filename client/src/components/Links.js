import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import apis from '../api/index'

const Collapse = styled.div.attrs({
    className: 'collpase navbar-collapse',
})``

const List1 = styled.div.attrs({
    className: 'navbar-nav mr-auto',
})``

const List2 = styled.div.attrs({
    className: 'navbar-nav',
})``

const Item = styled.div.attrs({
    className: 'collpase navbar-collapse',
})``

class Links extends React.Component {

    logoutFunction = async () =>{
        apis.logoutUser()
        .then(console.log("Log out successful"))
        .catch(err => console.log(err));
    }

    render() {
        return (
            <React.Fragment>
                <Link to="/" className="navbar-brand">
                    Cinema Booking App
                </Link>
                <Collapse>
                    <List1>
                        <Item>
                            <Link to="/screenings" className="nav-link">
                                Screenings
                            </Link>
                        </Item>
                        <Item>
                            <Link to="/registerpage" className="nav-link">
                                Register
                            </Link>
                        </Item>
                    </List1>
                    <List2>
                        <Item>
                            <Link to="/profile" className="nav-link">
                                Profile
                            </Link>
                        </Item>
                        <Item>
                            <Link to="/loginpage" className="nav-link">
                                Login
                            </Link>
                        </Item>
                        <Item>
                            <Link to="/logout" className="nav-link" onClick={this.logoutFunction}>
                                Logout
                            </Link>
                        </Item>
                    </List2>
                </Collapse>
            </React.Fragment>
        )
    }
}

export default Links