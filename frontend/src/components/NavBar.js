import React, {Component} from 'react';
import styled from 'styled-components';

// import Logo from './Logo';
import Links from './Links';

const Container = styled.div.attrs({
    className: 'nav',
})``

const Nav = styled.nav.attrs({
    className: 'nav',
    
})`
    margin-bottom:20px;
`

class NavBar extends Component {
    render() {
        return(
            <div>
            <Container>
                <Nav>
                    {/* <Logo /> */}
                    <Links />
                </Nav>
            </Container>
            </div>
        )
    }
}

export default NavBar;