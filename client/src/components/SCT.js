import React from 'react'

const ScreeningsToRender = props =>{
    const scrs = props.screeningsList.map(({_id, date, cinemaHall, movie}) => {
        
        let theDate = new Date(date);
        let day = theDate.getDate();
        let month = theDate.getMonth();
        let hours = theDate.getHours();
        let year = theDate.getFullYear();
        let minutes = theDate.getMinutes();

        return (
            <div key={_id} className="screeningsElement">
                <h2>{movie.title}</h2>
                <hr></hr>
                <div id="mainInfo">
                    <h6>Date: {day < 10 ? `0${day}` : day}.{month < 10 ? `0${month}` : month}.{year}</h6>
                    <h6>Time: {hours < 10 && hours !==0 ? `0${hours - 1}` : hours === 0 ? '23' : hours - 1}:{minutes < 10 ? `0${minutes}` : minutes}</h6>
                    <h6>Duration: {movie.runningTime} minutes</h6>
                    <h6>Cinema Hall: {cinemaHall.name}</h6>
                </div>
                <div id="movieDescription">{movie.description}</div>
                <div id="additionalInfo">
                    <table>
                        <tbody>
                            <tr>
                                <td>{movie.ageRestriction}</td>
                                <td>Genre: {movie.genre}</td>
                                <td>Director: {movie.director}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div id="reservation">
                    <button className="makeReservation">Make reservation</button>
                </div>
            </div>
        );
    });
    return <div className="screeningsContainer">{scrs}</div>
}

export default ScreeningsToRender