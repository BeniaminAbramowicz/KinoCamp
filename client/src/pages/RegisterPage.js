import React from 'react'
import apis from '../api/index'
import RegisterComponent from '../components/RegisterComponent'

class RegisterPage extends React.Component{

    handleSubmit(data){
        apis.registerNewUser(data);
    }
    
    render(){
        return(
            <div className="register-form-container">
                <RegisterComponent onSubmit={this.handleSubmit} />
            </div>
        )
    }
}

export default RegisterPage