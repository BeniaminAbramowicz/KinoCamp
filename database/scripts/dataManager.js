const mongoose = require('mongoose');
const Model =  require('./model');
const bcrypt = require('bcrypt');

mongoose.connect('mongodb://localhost/KinoCamp')
.then(()=> console.log('Ceonnected succesfully'))
.catch(err => console.error('Could not connect to MongoDB', err));

// pobieranie id filmow z bazy danych
async function getMoviesId(){
    const movies = await Model.Movie.find()
    .select({_id_: 1});
    return movies;
}

//pobieranie id sal kinowych z bazy danych
async function getCinemaHallsId(){
    cinemaHalls = await Model.CinemaHall.find()
    .select({_id :1});
    return cinemaHalls;
}

// zapisywanie seansu
async function saveScreening(cinemaHallId,movieId,screeningDate){
    const screening = new Model.Screening({
        cinemaHallId: cinemaHallId,
        movieId : movieId,
        date : screeningDate
    });
    const result = await screening.save();
    console.log(result);
}

//zapisywanie filmu
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

// zapisywanie sali kinowej
async function saveCinemaHall(cinemaHallObj){
    const cinemaHall = new Model.CinemaHall({
        name: cinemaHallObj.name,
        rows: cinemaHallObj.rows,
        prizeForSeats: cinemaHallObj.prizeForSeats
    })
    const result = await cinemaHall.save();
    console.log(result);
}

// zapisywanie usera
const saveUser = async function(userObj){
    const user = new Model.User({
        name: userObj.name,
        email: userObj.email,
        password: userObj.password,
    })
    
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password,salt);      // hashowanie hasła
    const result = await user.save();
    console.log(result);
}

exports.saveUser = saveUser;
exports.saveCinemaHall = saveCinemaHall;
exports.saveMovie = saveMovie;
exports.saveScreening = saveScreening;
exports.getCinemaHallsId = getCinemaHallsId;
exports.getMoviesId = getMoviesId;



