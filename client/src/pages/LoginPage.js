import React from 'react'
import apis from '../api/index'
import LoginComponent from '../components/LoginComponent'

class LoginPage extends React.Component{

    state = {
        errorMessage: ''
    }

    handleSubmit = async (userData) =>{
        await apis.loginUser(userData).then((res) => {
            alert(res.data.message);
            this.props.history.push('/');
        }).catch(err => {
            this.setState({errorMessage: err.response.data});
        })
    }

    render(){
        return (
            <div className="login-form-container">
                <LoginComponent errorMessage={this.state.errorMessage} onSubmit={this.handleSubmit}></LoginComponent>
            </div>
        )
    }
}

export default LoginPage