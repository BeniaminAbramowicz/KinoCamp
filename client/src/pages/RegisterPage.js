import React from 'react'
import apis from '../api/index'
import RegisterComponent from '../components/RegisterComponent'

class RegisterPage extends React.Component{

    state = {errorMessage: ''}

    handleSubmit = async (userData) =>{
        await apis.registerNewUser(userData)
        .then(() => {
            this.props.history.push('/loginpage');
        })
        .catch(err => {
            this.setState({errorMessage: err.response.data});
        })   
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