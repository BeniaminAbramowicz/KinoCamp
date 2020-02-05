const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: String,
    genre: String,
    runningTime: Number,
    director:String,
    ageRestriction: Number
});

const cinemaHallSchema = new mongoose.Schema({
    name:String,
    rows:[{ 
            row:[
                {isEmpty:Boolean}
            ]
    }],
    prizeForSeats:Number
});

const screeningSchema = new mongoose.Schema({
    cinemaHallId: mongoose.Schema.Types.ObjectId,
    movieId: mongoose.Schema.Types.ObjectId,
    date: Date
});

const Movie = mongoose.model('Movie', movieSchema);
const CinemaHall = mongoose.model('Hall', cinemaHallSchema);
const Screening = mongoose.model('Screening', screeningSchema);

exports.Movie = Movie;
exports.CinemaHall = CinemaHall;
exports.Screening = Screening;


