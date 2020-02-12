import React from 'react'

class RegisterForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {username: '', email: '', name: '', surname: '', password: ''};

        this.usernameChange = this.usernameChange.bind(this);
        this.emailChange = this.emailChange.bind(this);
        this.nameChange = this.nameChange.bind(this);
        this.surnameChange = this.surnameChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    usernameChange(event){
        this.setState({username: event.target.value});
    }

    emailChange(event){
        this.setState({email: event.target.value});
    }

    nameChange(event){
        this.setState({name: event.target.value});
    }

    surnameChange(event){
        this.setState({surname: event.target.value});
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
                {this.props.errorMessage && <p id="register-form-error">{this.props.errorMessage}</p>}
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Username <span className="register-form-requirement">(Must be at least 6 characters long)</span>:
                        <input type="text" value={this.state.username} onChange={this.usernameChange} />
                    </label>
                    <label>
                        Email <span className="register-form-requirement">(Must be at least 7 characters long)</span>:
                        <input type="email" value={this.state.email} onChange={this.emailChange} />
                    </label>
                    <label>
                        Name <span className="register-form-requirement">(Must be at least 2 characters long)</span>:
                        <input type="text" value={this.state.name} onChange={this.nameChange} />
                    </label>
                    <label>
                        Surname <span className="register-form-requirement">(Must be at least 2 characters long)</span>:
                        <input type="text" value={this.state.surname} onChange={this.surnameChange} />
                    </label>
                    <label>
                        Password <span className="register-form-requirement">(Must be at least 6 characters long, contain at least one big letter, one small letter and a number)</span>:
                        <input type="password" value={this.state.password} onChange={this.passwordChange} />
                    </label>
                    <button type="submit" className="btn btn-primary" value="Register">Register</button>
                </form> 
           </div>
        )
    }
}

export default RegisterForm