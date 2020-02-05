const mongoose = require('mongoose');
const Model =  require('./schema');

mongoose.connect('mongodb://localhost/KinoCamp')
.then(()=> console.log('Ceonnected succesfully'))
.catch(err => console.error('Could not connect to MongoDB', err));

async function getMoviesId(){
    const movies = await Model.Movie.find()
    .select({_id_: 1});
    return movies;
}
async function getCinemaHallsId(){
    cinemaHalls = await Model.CinemaHall.find()
    .select({_id :1});
    return cinemaHalls;
}

async function saveScreening(cinemaHallId,movieId,screeningDate){
    const screening = new Model.Screening({
        cinemaHallId: cinemaHallId,
        movieId : movieId,
        date : screeningDate
    });
    const result = await screening.save();
    console.log(result);
}

async function saveMovie(movieObj){
    const movie = new Model.Movie({
        title: movieObj.title,
        genre: movieObj.genre,
        runningTime: movieObj.runningTime,
        director: movieObj.author,
        ageRestriction: movieObj.ageRestriction
    })
    const result = await movie.save();
    console.log(result);
}

async function saveCinemaHall(cinemaHallObj){
    const cinemaHall = new Model.CinemaHall({
        name: cinemaHallObj.name,
        rows: cinemaHallObj.rows,
        prizeForSeats: cinemaHallObj.prizeForSeats
    })
    const result = await cinemaHall.save();
    console.log(result);
}

exports.saveCinemaHall = saveCinemaHall;
exports.saveMovie = saveMovie;
exports.saveScreening = saveScreening;
exports.getCinemaHallsId = getCinemaHallsId;
exports.getMoviesId = getMoviesId;



