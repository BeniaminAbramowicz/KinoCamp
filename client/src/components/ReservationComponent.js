import React from 'react'
import Rows from './RowsComponent'
import apis from '../api/index'

class ReservationWindow extends React.Component{

    constructor(props){
        super(props);
        this.id = this.props.chosenReservation.id;
        this.date = this.props.chosenReservation.date;
        this.cinemaHall = this.props.chosenReservation.cinemaHall;
        this.movie = this.props.chosenReservation.movie;
    }

    createReservation = async(totalPrice, reservedSeats, amountOfSeats) => {
        const reservationData = {screening: this.id, user: '5e4189c656f06f42d8f51afc', totalPrice: totalPrice, bookedSeats: reservedSeats, amountOfSeats: amountOfSeats};
        await apis.createReservation(reservationData)
        .catch(err => {
            console.log(err);
        })
    }

    render(){
        return (
            <div key={this.id} className="reservation-element">
                <div id="close-button" onClick={this.props.closeDetails} className="close-reservation">X</div><span className="close-text">Close reservation window</span>
                <div>
                    <h2>{this.movie.title}</h2>
                    <hr></hr>
                    <div id="mainInfo">
                        <h6>Date: {this.date.day < 10 ? `0${this.date.day}` : this.date.day}.{this.date.month < 10 ? `0${this.date.month}` : this.date.month}.{this.date.year}</h6>
                        <h6>Time: {this.date.hours < 10 && this.date.hours !==0 ? `0${this.date.hours - 1}` : this.date.hours === 0 ? '23' : this.date.hours - 1}:{this.date.minutes < 10 ? `0${this.date.minutes}` : this.date.minutes}</h6>
                        <h6>Duration: {this.movie.runningTime} minutes</h6>
                        <h6>Cinema Hall: {this.cinemaHall.name}</h6>
                    </div>
                    <div id="movieDescription">{this.movie.description}</div>
                    <div id="additionalInfo">
                        <table>
                            <tbody>
                                <tr>
                                    <td>{this.movie.ageRestriction}</td>
                                    <td>Genre: {this.movie.genre}</td>
                                    <td>Director: {this.movie.director}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <hr></hr>
                </div>
                <div id="reservation-legend">
                    <span>Free seats</span>
                    <div></div>
                    <span>Reserved seats</span>
                    <div></div>
                    <span>Seats to be reserved by You</span>
                    <div></div>
                </div>
                <hr></hr>
                <Rows createReservation={this.createReservation} cinemaHallLayout={this.cinemaHall.seats} seatPrice={this.cinemaHall.priceForSeats}/>
            </div>
        )
    }
}

export default ReservationWindow