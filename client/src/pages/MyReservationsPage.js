import React from 'react'
import apis from '../api/index'
import NavBar from '../components/NavBar'
import MyReservationsComponent from '../components/MyReservationsComponent'

class MyReservations extends React.Component{

    constructor(){
        super();

        this.state = {reservationsData: [], reservationsType: 'active'};
        this.handleChange = this.handleChange.bind(this);
        this.navBarElement = React.createRef();
    }

    componentDidMount = async () => {
        await apis.getUserReservations()
        .then(res => {
            this.setState({reservationsData: res.data.reservationsList});
        })
        .catch(err => {
            if(err.response){
                if(err.response.data.loginFlag === false){
                    window.localStorage.setItem('auth', false);
                    this.navBarElement.current.changeNavAuth();
                }
                alert(err.response.data.error);
                window.location.replace('/loginpage');
            } else {
                window.localStorage.setItem('auth', false);
                alert('Connection to the server was lost. Session expired');
                window.location.replace('/');
            }
        });
    }

    handleChange = (event) => {
        this.setState({reservationsType: event.target.value});
    }

    render(){
        return(
            <div>
                <NavBar ref={this.navBarElement}/>
                <div className="my-reservations-component">
                    <div className="inner-reservations-component">
                        <select onChange={this.handleChange} className="form-control">
                            <option value="active">Active</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="archived">Archived</option>
                        </select>
                        <MyReservationsComponent reservationsType={this.state.reservationsType} reservationsData={this.state.reservationsData}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default MyReservations;