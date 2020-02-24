import React from 'react'
import Seats from './SeatsComponent'

class Rows extends React.Component{

    constructor(props){
        super(props);
        this.seatPrice = this.props.seatPrice;
        this.rows = this.props.cinemaHallLayout;
        this.seatsToReserve = [];
        this.reserveSeat = this.reserveSeat.bind(this);
        this.state = {numberOfSeats: 0};
    }
    
    reserveSeat(st, event, row){
        if(event.target.className === "user-reserved-seat" && this.seatsToReserve.find(x => x.row === row && x.seat === st)){
            event.target.className = "free-seat";
            let helperArray = this.seatsToReserve; 
            helperArray.splice(helperArray.findIndex(x => x.row === row && x.seat === st), 1);
            this.seatsToReserve = helperArray;
            let currentSeats = this.state.numberOfSeats;
            currentSeats--;
            this.setState({numberOfSeats: currentSeats});
        } else if(event.target.className === "reserved-seat" && this.rows[row-1][st-1]){

        } else {
            event.target.className = "user-reserved-seat";
            let helperArray = this.seatsToReserve;
            let helperArray2 = helperArray.concat({row: row, seat: st});
            this.seatsToReserve = helperArray2;
            let currentSeats = this.state.numberOfSeats;
            currentSeats++;
            this.setState({numberOfSeats: currentSeats});
        }
    }

    render(){
        const rowsList = this.rows.map((row, index) => {
            return(
            <Seats reserveSeat={this.reserveSeat} key={index === 0 ? index + 1 : index + 2} seatsInRow={row} rowIndex={index + 1} />
            );
        });
        return(
            <div className="rows-layout">
                {rowsList}
                <span>Number of seats reserved by You: {this.state.numberOfSeats} | Total price: {this.state.numberOfSeats === 0 ? '0 PLN' : `${this.state.numberOfSeats >= 3 ? this.seatPrice * this.state.numberOfSeats * 0.9 : this.seatPrice * this.state.numberOfSeats} PLN`}</span>
                <div id="reservation">
                    <button onClick={() => this.props.createReservation(this.state.numberOfSeats >= 3 ? this.seatPrice * this.state.numberOfSeats * 0.9 : this.seatPrice * this.state.numberOfSeats, this.seatsToReserve, this.state.numberOfSeats)} className="btn btn-primary">Make reservation</button>
                </div>
            </div>
        )
    }
}

export default Rows