import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

const Collapse = styled.div.attrs({
    className: 'nav',
})``

const List = styled.ul``

const Item = styled.li.attrs({
    className: 'nav-link',
})``


class Links extends Component {
    render() {
        return (
            <React.Fragment>
                <Collapse>
                    <List className>
                        <Item>
                            <Link>
                                Cinema Camp
                            </Link>
                        </Item>
                        <Item>
                            <Link to="/" >
                                Home
                            </Link>
                        </Item>
                        <Item>
                            <Link to="/whatson" >
                                What's On
                            </Link>
                        </Item>
                        <Item>
                            <Link to="/schedule" >
                                Schedule
                            </Link>
                        </Item>
                        <Item>
                            <Link to="/reservation" >
                                Reservation
                            </Link>
                        </Item>
                        <Item className="right">
                            <Link to="/register"  >
                                Register
                            </Link>
                        </Item>
                        <Item className="right">
                            <Link to="/login" >
                                Login
                            </Link>
                        </Item>
                        
                    </List>
                </Collapse>
            </React.Fragment>
        )
    }
}

export default Links;