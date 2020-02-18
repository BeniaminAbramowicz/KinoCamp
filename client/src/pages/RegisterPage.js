import React from 'react'
import apis from '../api/index'
import NavBar from '../components/NavBar'
import RegisterComponent from '../components/RegisterComponent'

class RegisterPage extends React.Component{

    constructor(props){
        super(props);

        this.state = {errorMessage: ''};
        this.navBarElement= React.createRef();
    }

    componentDidMount = () => {
        if(window.localStorage.getItem('auth') === 'true'){
            document.getElementsByClassName('register-form-container')[0].style.display = 'none';
            alert('You must log out first before creating new account');
            window.location.replace('/profile');
        }
    }
    
    handleSubmit = async (userData) =>{
        await apis.registerNewUser(userData)
        .then(res => {
            alert(res.data.message);
            this.props.history.push('/loginpage');
        })
        .catch(err => {
            if(err.response){
                console.log(err);
                this.setState({errorMessage: err.response.data.error});
            } else {
                window.localStorage.setItem('auth', false);
                alert('Connection to the server was lost. Session expired');
                window.location.replace('/');
            }
        })   
    }
    
    render(){
        return(
            <div>
                <NavBar ref={this.navBarElement}/>
                <div className="register-form-container">
                    <RegisterComponent errorMessage={this.state.errorMessage} onSubmit={this.handleSubmit} />
                </div>
            </div>
        )
    }
}

export default RegisterPage;