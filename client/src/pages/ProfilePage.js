import React from 'react'
import NavBar from '../components/NavBar'
import ProfileDataComponent from '../components/ProfileDataComponent'
import apis from '../api/index'

class Profile extends React.Component{

    constructor(props){
        super(props);

        this.state = {userData: {}, profileError: '', editError: ''};
        this.navBarElement = React.createRef();
    }
    componentDidMount = async () => {
        await apis.getUserProfile()
        .then(res => {
            if(res.data.loginFlag === false){
                window.localStorage.setItem('auth', false);
                this.navBarElement.current.changeNavAuth();
            }
            this.setState({userData: res.data});
        })
        .catch(err => {
            if(err.response){
                if(err.response.data.loginFlag === false){
                    window.localStorage.setItem('auth', false);
                    this.navBarElement.current.changeNavAuth();
                    window.location.replace('/loginpage');
                }
                console.log(err);
                this.setState({profileError: err.response.data.error});
                alert(this.state.profileError);
                window.location.replace('/loginpage');
            } else {
                window.localStorage.setItem('auth', false);
                alert('Connection to the server was lost. Session expired');
                window.location.replace('/');
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
                if(err.response.data.loginFlag === false){
                    window.localStorage.setItem('auth', false);
                    this.navBarElement.current.changeNavAuth();
                }
                this.setState({editError: err.response.data.error});
            }
        });   
    }

    render(){
        return(
            <div>
                <NavBar ref={this.navBarElement}/>
                {this.state.profileError === '' && <div className="outer-profile-container"><ProfileDataComponent errorMessage={this.state.editError} userData={this.state.userData} onSubmit={this.handleSubmit}/></div>}
            </div>
        )
    }
}

export default Profile;