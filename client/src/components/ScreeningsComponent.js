import React from 'react'

const ScreeningsToRender = props =>{
    const scrs = props.screeningsList.map(({_id, date, cinemaHall, movie}) => {
        
        let theDate = new Date(date);
        let day;
        let month;
        let hours = theDate.getHours();
        let minutes;
        if(theDate.getDate() < 10){
            day = '0' +  theDate.getDate(); 
        } else {
            day = theDate.getDate(); 
        }
        if(theDate.getMonth() < 10){
            month = '0' +  theDate.getMonth(); 
        } else {
            month = theDate.getMonth(); 
        }
        if(theDate.getHours() < 10 && theDate.getHours() !== 0){
            hours = '0' +(theDate.getHours() - 1);
        } else if(theDate.getHours() === 0){
            hours = '23';
        } else {
            hours = theDate.getHours() - 1;
        }
        if(theDate.getMinutes() < 10){
            minutes = '0' + theDate.getMinutes();
        } else {
            minutes = theDate.getMinutes();
        }
        
        let year = theDate.getFullYear();
        
        return (
            <div key={_id} className="screeningsElement">
                <h2>{movie.title}</h2>
                <hr></hr>
                <div id="mainInfo">
                    <h6>Date: {day}.{month}.{year}</h6>
                    <h6>Time: {hours}:{minutes}</h6>
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