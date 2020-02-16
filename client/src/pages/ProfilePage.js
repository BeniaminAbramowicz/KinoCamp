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
            if(err.response){
                console.log(err);
                this.setState({profileError: err.response.data.error});
                alert(this.state.profileError);
                window.location.replace('/loginpage');
            }
        })
    }

    handleSubmit = async (editUserData) =>{
        await apis.editPassword(editUserData)
        .then(res => {
            alert(res.data.message);
            this.props.history.push('/profile');
        })
        .catch(err => {
            if(err.response){
                this.setState({editError: err.response.data.error});
            }
        });   
    }

    render(){
        return(
            this.state.profileError === '' && <div className="outer-profile-container"><ProfileDataComponent errorMessage={this.state.editError} userData={this.state.userData} onSubmit={this.handleSubmit}/></div>
        )
    }
}

export default Profile