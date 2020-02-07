const mongoose = require('mongoose');
const Model =  require('./model');
const bcrypt = require('bcrypt');

mongoose.connect('mongodb://localhost/KinoCamp')
.then(()=> console.log('Ceonnected succesfully'))
.catch(err => console.error('Could not connect to MongoDB', err));


async function getUserByEmail(email){
    const user = await Model.User.findOne({email: email})
    return user;
}

async function getUsersId(){
    const users = await Model.User.find()
    .select({_id_: 1});
    return users;
}

async function getScreeningsId(){
    const screenings = await Model.Screening.find()
    .select({_id_: 1});
    return screenings;
}

async function getMoviesId(){
    const movies = await Model.Movie.find()
    .select({_id_: 1});
    return movies;
}


async function getCinemaHalls(){
    cinemaHalls = await Model.CinemaHall.find();
    return cinemaHalls;
}


async function saveScreening(cinemaHall,movieId,screeningDate){
    const screening = new Model.Screening({
        cinemaHall: cinemaHall,
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


const saveUser = async function(userObj){
    const user = new Model.User({
        name: userObj.name,
        email: userObj.email,
        password: userObj.password,
    })
    
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password,salt);      
    const result = await user.save();
    console.log(result);
}

exports.getScreeningsId = getScreeningsId;
exports.getUsersId = getUsersId;
exports.getUserByEmail = getUserByEmail;
exports.saveUser = saveUser;
exports.saveCinemaHall = saveCinemaHall;
exports.saveMovie = saveMovie;
exports.saveScreening = saveScreening;
exports.getCinemaHalls = getCinemaHalls;
exports.getMoviesId = getMoviesId;





