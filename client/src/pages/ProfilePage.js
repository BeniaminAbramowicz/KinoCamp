import React from 'react'
import ProfileDataComponent from '../components/ProfileDataComponent'
import apis from '../api/index'

class Profile extends React.Component{

    state = {userData: {}, profileError: '', editError: ''};

    componentDidMount = async () => {
        await apis.getUserProfile()
        .then(res => {
            this.setState({userData: res.data});
        })
        .catch(err => {
            this.setState({profileError: err.response.data.error});
        })
    }

    handleSubmit = async (editUserData) =>{
        await apis.editUserData(editUserData)
        .then(res => {
            alert(res.data.message);
            this.props.history.push('/profile');
        })
        .catch(err => {
            this.setState({editError: err.response.data.error});
        });   
    }

    render(){
        return(
            this.state.profileError === '' ? <ProfileDataComponent errorMessage={this.state.editError} userData={this.state.userData} onSubmit={this.handleSubmit}/> : <h2 id="response-error">{this.state.profileError}</h2>
        )
    }
}

export default Profile