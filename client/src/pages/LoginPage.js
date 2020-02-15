import React from 'react'
import apis from '../api/index'
import LoginComponent from '../components/LoginComponent'

class LoginPage extends React.Component{

    constructor(props){
        super(props);
        this.state = {errorMessage: ''};

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = async (userData) =>{
        await apis.loginUser(userData).then((res) => {
            alert(res.data.message);
            this.props.history.push('/');
        }).catch(err => {
            if(err.response){
                console.log(err);
                this.setState({errorMessage: err.response.data});
            }
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