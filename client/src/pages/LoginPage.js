import React from 'react'
import apis from '../api/index'
import NavBar from '../components/NavBar'
import LoginComponent from '../components/LoginComponent'

class LoginPage extends React.Component{

    constructor(props){
        super(props);
        this.state = {errorMessage: ''};

        this.handleSubmit = this.handleSubmit.bind(this);
        this.navBarElement = React.createRef();
    }

    componentDidMount = async () => {
        if(window.localStorage.getItem('auth') === 'true'){
            document.getElementsByClassName('login-form-container')[0].style.display = 'none';
            alert('You are already logged in');
            window.location.replace('/profile');
        }
    }

    handleSubmit = async (userData) =>{
        await apis.loginUser(userData).then((res) => {
            window.localStorage.setItem('auth', 'true');
            alert(res.data.message);
            window.location.replace('/');
        }).catch(err => {
            if(err.response){
                console.log(err);
                this.setState({errorMessage: err.response.data.error});
            } else {
                window.localStorage.setItem('auth', 'false');
                alert('Connection to the server was lost. Session expired');
                window.location.replace('/');
            }
        })
    }

    render(){
        return (
            <div>
                <NavBar ref={this.navBarElement}/>
                <div className="login-form-container">
                    <LoginComponent errorMessage={this.state.errorMessage} onSubmit={this.handleSubmit}></LoginComponent>
                </div>
            </div>
        )
    }
}

export default LoginPage;