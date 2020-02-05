const mongoose = require('mongoose');

// schemat filmu
const movieSchema = new mongoose.Schema({
    title: String,
    genre: String,
    runningTime: Number,
    director:String,
    ageRestriction: Number
});
//schemat sali kinowej
const cinemaHallSchema = new mongoose.Schema({
    name:String,
    rows:[{ 
            row:[
                {isEmpty:Boolean}
            ]
    }],
    prizeForSeats:Number
});
//schemat seansu
const screeningSchema = new mongoose.Schema({
    cinemaHallId: mongoose.Schema.Types.ObjectId,
    movieId: mongoose.Schema.Types.ObjectId,
    date: Date
});

// tworzenie modeli na podstawie odpowiednich schematów
const Movie = mongoose.model('Movie', movieSchema);
const CinemaHall = mongoose.model('Hall', cinemaHallSchema);
const Screening = mongoose.model('Screening', screeningSchema);

exports.Movie = Movie;
exports.CinemaHall = CinemaHall;
exports.Screening = Screening;


