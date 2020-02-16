import React from 'react'
import apis from '../api';

class ReservationsToRender extends React.Component{

    constructor(){
        super();
        this.state = {errorMessage: ''}
        this.handleReservationCancel = this.handleReservationCancel.bind(this);
    }

    handleReservationCancel = async (event) =>{
        if(window.confirm('Are you sure you want to cancel this reservation?')){
            console.log(event.target.value);
            await apis.cancelReservation({reservationId: event.target.value})
            .then(res => {
                alert(res.data.message);
                window.location.reload();
            })
            .catch(err => {
                if(err.response){
                    this.setState({errorMessage: err.response.data.error});
                }
            });
        }
    }

    render(){
        const reservationsList = this.props.reservationsData.map(({_id, screening, totalPrice, seats, status}) => {
            let ret = '';
            if(status === this.props.reservationsType){

                let theDate = new Date(screening.date);
                let day = theDate.getDate();
                let month = theDate.getMonth();
                let hours = theDate.getHours();
                let year = theDate.getFullYear();
                let minutes = theDate.getMinutes();
                ret = <div key={_id}>
                        <hr></hr>
                        <div id="reservation-info">
                            <h2>{screening.movie.title}</h2>
                            <h5>Date: {day < 10 ? `0${day}` : day}.{month < 10 ? `0${month}` : month}.{year}</h5>
                            <h5>Time: {hours < 10 && hours !==0 ? `0${hours - 1}` : hours === 0 ? '23' : hours - 1}:{minutes < 10 ? `0${minutes}` : minutes}</h5>
                            <h5>Duration: {screening.movie.runningTime} minutes</h5>
                            <h5>Total Price: {totalPrice} PLN</h5>
                            <h5>Status: {status}</h5>
                            <h5>Seats: <br />{seats.map((seat, index) => {
                                return (<p key={seat._id}>Seat nr {index + 1}: row {seat.row} | seat {seat.seat}</p>)
                            })}</h5>

                        </div>
                        {this.state.errorMessage && <p id="register-form-error">{this.state.errorMessage}</p>}
                        {status === 'active' && <button value={_id} onClick={this.handleReservationCancel} type="submit">Cancel reservation</button>}
                    </div>;
            }
            return ret;
        });
        return reservationsList;
    }
}

export default ReservationsToRender;