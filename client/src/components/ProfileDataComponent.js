import React from 'react'

class ProfileData extends React.Component{

    constructor(props){
        super(props);
        this.state = { newPassword: '', repeatPassword: ''};
        this.newPasswordChange = this.newPasswordChange.bind(this);
        this.repeatPasswordChange = this.repeatPasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
                <hr />
                <div>
                    <h4><p><b>Username: </b>{this.props.userData.username}</p></h4>
                    <h4><p><b>Name: </b>{this.props.userData.name}</p></h4>
                    <h4><p><b>Surname: </b>{this.props.userData.surname}</p></h4>
                    <h4><p><b>E-mail address: </b>{this.props.userData.email}</p></h4>
                </div>
            </div>
            <hr />
            <div className="edit-data-form">
                <div className='form-header'>
                    <h5>Change password form </h5>
                    {this.props.errorMessage ? <div><p id="edit-data-form-error">{this.props.errorMessage}</p></div> : null}
                </div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        New password <span className="form-requirement">(Must be at least 6 characters long, contain at least one big letter, one small letter and a number)</span>:
                        <input type="password" value={this.state.newPassword} onChange={this.newPasswordChange} />
                    </label>
                    <label>
                        Repeat password:
                        <input type="password" value={this.state.repeatPassword} onChange={this.repeatPasswordChange} />
                    </label>
                    <button type="submit" className="btn btn-primary" value="login">Change password</button>
                </form> 
            </div>
        </div>
        )
    }
}

export default ProfileData