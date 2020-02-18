import React from 'react'
import apis from '../api/index'
import NavBar from '../components/NavBar'
import ScreeningsComponent from '../components/ScreeningsComponent'

class ScreeningsPage extends React.Component{

    constructor(props){
        super(props);

        this.state = { screenings: [], errorMessage: '' };
        this.navBarElement = React.createRef();
    }
   
    componentDidMount = async () => {
        await apis.getAllScreenings()
        .then(res => {
            if(res.data.loginFlag === false){
                window.localStorage.setItem('auth', false);
                this.navBarElement.current.changeNavAuth();
            }
            this.setState({screenings: res.data.screeningsList});
        })
        .catch(err => {
            if(err.response){
                if(err.response.data.loginFlag === false){
                    window.localStorage.setItem('auth', false);
                    this.navBarElement.current.changeNavAuth();
                }
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
        return (
            <div>
                <NavBar ref={this.navBarElement}/>
                <ScreeningsComponent screeningsList={this.state.screenings} errorMessage={this.state.errorMessage}/>
            </div>
        )
    }
}

export default ScreeningsPage;