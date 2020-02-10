import React from 'react'
import apis from '../api/index'
import RegisterComponent from '../components/RegisterComponent'

class RegisterPage extends React.Component{

    state = {
        errorMessage: ''
    }

    handleSubmit(data){
        apis.registerNewUser(data).catch(err => this.setState({errorMessage: err}));
    }
    
    render(){
        return(
            <div className="register-form-container">
                <RegisterComponent errorMessage={this.state.errorMessage} onSubmit={this.handleSubmit} />
            </div>
        )
    }
}

export default RegisterPage