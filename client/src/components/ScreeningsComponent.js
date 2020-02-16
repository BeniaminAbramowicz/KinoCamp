import React from 'react'
import ReservationComponent from './ReservationComponent'

const ScreeningsToRender = props =>{
    const [modalOpened, setModalOpened] = React.useState(false);
    const [chosenScreening, setChosenScreening] = React.useState();

    const openDetails = (id, date, cinemaHall, movie) => {
        let screeningToDisplay = {id: id, date: date, cinemaHall: cinemaHall, movie: movie};
        setChosenScreening(screeningToDisplay);
        setModalOpened(true);
    }

    const closeDetails = () => {
        const resWindow = document.getElementsByClassName('reservation-element')[0];
        resWindow.classList.add('close-transition');
        setTimeout(() => {setModalOpened(false)}, 270);  
    }

    const scrs = props.screeningsList.map(({_id, date, cinemaHall, movie}) => {
        
        let theDate = new Date(date);
        let day = theDate.getDate();
        let month = theDate.getMonth();
        let hours = theDate.getHours();
        let year = theDate.getFullYear();
        let minutes = theDate.getMinutes();
        let dateToPass = {day: day, month: month, year: year, hours: hours, minutes: minutes};

        return (
            <div key={_id} onClick={() => openDetails(_id, dateToPass, cinemaHall, movie)} className="screenings-element">
                <div className="movie-image">
                    <img src={require(`../images/${movie.picture}`)} width="100%" height="auto" alt="spiderman-poster"/>
                </div>
                <div className="screening-info">
                    <h2>{movie.title}</h2>
                    <hr></hr>
                    <h6>Date: {day < 10 ? `0${day}` : day}.{month < 10 ? `0${month + 1}` : month + 1}.{year}</h6>
                    <h6>Time: {hours < 10 && hours !==0 ? `0${hours - 1}` : hours === 0 ? '23' : hours - 1}:{minutes < 10 ? `0${minutes}` : minutes}</h6>
                </div>
            </div>
        );
    });
    return <div className="screenings-container">{scrs}{modalOpened ? <ReservationComponent chosenReservation={chosenScreening} closeDetails={closeDetails} /> : null}</div>
}

export default ScreeningsToRender