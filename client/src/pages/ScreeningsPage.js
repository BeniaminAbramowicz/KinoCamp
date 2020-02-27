import React from 'react'
import apis from '../api/index'
import NavBar from '../components/NavBar'
import ScreeningsPagination from '../components/ScreeningsPaginationComponent'
import ScreeningsComponent from '../components/ScreeningsComponent'

class ScreeningsPage extends React.Component{

    constructor(props){
        super(props);

        this.state = { screenings: [], passedDate: [new Date().getUTCDate(), new Date().getMonth()], errorMessage: '' };
        this.navBarElement = React.createRef();
        this.handleDataButtonClick = this.handleDataButtonClick.bind(this);
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

    handleDataButtonClick = (dayToPass, monthToPass) => {
        this.setState({passedDate: [dayToPass, monthToPass]});
    }

    render(){
        return (
            <div>
                <NavBar ref={this.navBarElement}/>
                <ScreeningsPagination handleDataButtonClick={this.handleDataButtonClick}/>
                <ScreeningsComponent screeningsList={this.state.screenings} passedDate={this.state.passedDate} errorMessage={this.state.errorMessage}/>
            </div>
        )
    }
}

export default ScreeningsPage;