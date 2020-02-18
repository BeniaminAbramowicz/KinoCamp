import React from 'react'
import Rows from './RowsComponent'
import apis from '../api/index'

class ReservationWindow extends React.Component{

    constructor(props){
        super(props);
        this.state = {errorMessage: ''};
        this.id = this.props.chosenReservation.id;
        this.date = this.props.chosenReservation.date;
        this.cinemaHall = this.props.chosenReservation.cinemaHall;
        this.movie = this.props.chosenReservation.movie;
    }

    createReservation = async (totalPrice, reservedSeats, amountOfSeats) => {
        console.log(reservedSeats);
        const reservationData = {screening: this.id, totalPrice: totalPrice, bookedSeats: reservedSeats, amountOfSeats: amountOfSeats};
        await apis.createReservation(reservationData)
        .then(res => {
            alert(res.data.message);
            window.location.replace('/myreservations');
        })
        .catch(err => {
            if(err.response){
                if(err.response.data.loginFlag === false){
                    window.localStorage.setItem('auth', false);
                    alert(err.response.data.error);
                    window.location.replace('/loginpage');
                }
                console.log(err.response.data.error);
                this.setState({errorMessage: err.response.data.error});
            }
        })
    }

    render(){
        return (
            <div className="reservation-element">
                <div id="movie-title">
                    <h2>{this.movie.title}</h2><div onClick={this.props.closeDetails} className="close-reservation">X</div>
                </div>
                <div>
                    <hr></hr>
                    <div id="main-info">
                        <h6>Date: {this.date.day < 10 ? `0${this.date.day}` : this.date.day}.{this.date.month < 10 ? `0${this.date.month}` : this.date.month}.{this.date.year}</h6>
                        <h6>Time: {this.date.hours < 10 && this.date.hours !==0 ? `0${this.date.hours - 1}` : this.date.hours === 0 ? '23' : this.date.hours - 1}:{this.date.minutes < 10 ? `0${this.date.minutes}` : this.date.minutes}</h6>
                        <h6>Duration: {this.movie.runningTime} minutes</h6>
                        <h6>Cinema Hall: {this.cinemaHall.name}</h6>
                    </div>
                    <div id="movie-description">{this.movie.description}</div>
                    <div id="additional-info">
                        <table>
                            <tbody>
                                <tr>
                                    <td>Rating: {this.movie.ageRestriction}</td>
                                    <td>Genre: {this.movie.genre}</td>
                                    <td>Director: {this.movie.director}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <hr></hr>
                </div>
                {window.localStorage.getItem('auth') === 'true' ?
                <div>
                    <div id="reservation-legend">
                        <span>Free seats</span>
                        <div></div>
                        <span>Reserved seats</span>
                        <div></div>
                        <span>Seats to be reserved by You</span>
                        <div></div>
                    </div>
                    <hr></hr>
                    {this.state.errorMessage && <p>{this.state.errorMessage}</p>}
                    <Rows createReservation={this.createReservation} cinemaHallLayout={this.cinemaHall.seats} seatPrice={this.cinemaHall.priceForSeats}/>
                </div> : null}
            </div>
        )
    }
}

export default ReservationWindow