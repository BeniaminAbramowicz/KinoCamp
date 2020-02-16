import React from 'react'

class LoginForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {username: '', password: ''};

        this.usernameChange = this.usernameChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    usernameChange(event){
        this.setState({username: event.target.value});
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
            <div className="login-form">
                <h2>Login form</h2>
                {this.props.errorMessage && <p id="register-form-error">{this.props.errorMessage}</p>}
                <form onSubmit={this.handleSubmit}>
                <label>
                    Username:
                    <input type="text" value={this.state.username} onChange={this.usernameChange} />
                </label>
                <label>
                    Password:
                    <input type="password" value={this.state.password} onChange={this.passwordChange} />
                </label>
                <button type="submit" className="btn btn-primary" value="login">Login</button>
                </form> 
            </div>
        )
    }
}

export default LoginForm