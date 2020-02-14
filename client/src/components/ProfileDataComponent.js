import React from 'react'

class ProfileData extends React.Component{

    constructor(props){
        super(props);
        this.state = {newUsername: '', newEmail: '', newName: '', newSurname: '', newPassword: '', repeatPassword: ''};
        this.newUsernameChange = this.newUsernameChange.bind(this);
        this.newEmailChange = this.newEmailChange.bind(this);
        this.newNameChange = this.newNameChange.bind(this);
        this.newSurnameChange = this.newSurnameChange.bind(this);
        this.newPasswordChange = this.newPasswordChange.bind(this);
        this.repeatPasswordChange = this.repeatPasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    newUsernameChange(event){
        this.setState({newUsername: event.target.value});
    }

    newEmailChange(event){
        this.setState({newEmail: event.target.value});
    }

    newNameChange(event){
        this.setState({newName: event.target.value});
    }

    newSurnameChange(event){
        this.setState({newSurname: event.target.value});
    }

    newPasswordChange(event){
        this.setState({newPassword: event.target.value});
    }

    repeatPasswordChange(event){
        this.setState({repeatPassword: event.target.value});
    }

    handleSubmit(event){
        event.preventDefault();
        this.props.onSubmit(this.state)
    }

    render(){
        return(
        <div className="profile-container">
            <div className="profile-data">
                <h2>Profile Data</h2>
                <hr/>
                <div>
                    <span><b>Username: </b>{this.props.userData.username}</span>
                    <span><b>Name: </b>{this.props.userData.name}</span>
                    <span><b>Surname: </b>{this.props.userData.surname}</span>
                    <span><b>E-mail address: </b>{this.props.userData.email}</span>
                </div>
            </div>
            <hr/>
            <div className="edit-data-form">
                <h6>Edit your data (Fill in data fields that you want to change): </h6>
                {this.props.errorMessage && <p id="edit-data-form-error">{this.props.errorMessage}</p>}
                <form onSubmit={this.handleSubmit}>
                    <label>
                        New username <span className="form-requirement">(Must be at least 6 characters long)</span>:
                        <input type="text" value={this.state.newUsername} onChange={this.newUsernameChange} />
                    </label>
                    <label>
                        New name <span className="form-requirement">(Must be at least 2 characters long)</span>:
                        <input type="text" value={this.state.newName} onChange={this.newNameChange} />
                    </label>
                    <label>
                        New surname <span className="form-requirement">(Must be at least 2 characters long)</span>:
                        <input type="text" value={this.state.newSurname} onChange={this.newSurnameChange} />
                    </label>
                    <label>
                        New e-mail address <span className="form-requirement">(Must be at least 7 characters long)</span>:
                        <input type="email" value={this.state.newEmail} onChange={this.newEmailChange} />
                    </label>
                    <label>
                        New password <span className="form-requirement">(Must be at least 6 characters long, contain at least one big letter, one small letter and a number)</span>:
                        <input type="password" value={this.state.newPassword} onChange={this.newPasswordChange} />
                    </label>
                    <label>
                        Repeat password:
                        <input type="password" value={this.state.repeatPassword} onChange={this.repeatPasswordChange} />
                    </label>
                    <button type="submit" className="btn btn-primary" value="login">Edit data</button>
                </form> 
            </div>
        </div>
        )
    }
}

export default ProfileData