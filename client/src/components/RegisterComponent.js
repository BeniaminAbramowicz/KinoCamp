import React from 'react'

class RegisterForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {username: '', email: '', password: ''};

        this.usernameChange = this.usernameChange.bind(this);
        this.emailChange = this.emailChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    usernameChange(event){
        this.setState({username: event.target.value});
    }

    emailChange(event){
        this.setState({email: event.target.value});
    }

    passwordChange(event){
        this.setState({password: event.target.value});
    }

    handleSubmit(event){
        event.preventDefault();
        this.props.onSubmit(this.state)
    }

    render(){
        return(
            <div className="register-form">
                <h2>Register form</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Username:
                        <input type="text" value={this.state.username} onChange={this.usernameChange} />
                    </label>
                    <label>
                        Email:
                        <input type="text" value={this.state.email} onChange={this.emailChange} />
                    </label>
                    <label>
                        Password:
                        <input type="password" value={this.state.password} onChange={this.passwordChange} />
                    </label>
                    <button type="submit" className="btn btn-primary" value="Register">Register</button>
                </form> 
           </div>
        )
    }
}

export default RegisterForm