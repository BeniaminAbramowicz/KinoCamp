import React from 'react'
import apis from '../api/index'
import MyReservationsComponent from '../components/MyReservationsComponent'

class MyReservations extends React.Component{

    constructor(){
        super();
        this.state = {reservationsData: [], errorMessage: '', reservationsType: 'active'};
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount = async () => {
        await apis.getUserReservations()
        .then(res => {
            this.setState({reservationsData: res.data});
        })
        .catch(err => {
            if(err.response){
                this.setState({errorMessage: err.response.data.error});
                alert(this.state.errorMessage);
                this.props.history.push('/loginpage');
            }
        });
    }

    handleChange = (event) => {
        this.setState({reservationsType: event.target.value});
    }

    render(){
        return(
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
        )
    }
}

export default MyReservations;