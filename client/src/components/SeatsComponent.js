import React from 'react'

class Seats extends React.Component{
    constructor(props){
        super(props);
        this.seatsInRow = this.props.seatsInRow;
        this.seatsToReserve = [];
    }

    render(){
        const seatsList = this.seatsInRow.map((seat, index) => {
            return(
            <div onClick={(event) => this.props.reserveSeat(index + 1, event, this.props.rowIndex)} key={index * 2} seatnumber={index + 1} className={!seat ? "free-seat" : "reserved-seat"}></div>
            );
        });
        return(
            <div rownumber={this.props.rowIndex}>
                {seatsList}
            </div>
        )
    }
}

export default Seats