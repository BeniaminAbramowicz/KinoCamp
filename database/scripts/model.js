const mongoose = require('mongoose');

// model filmu
const Screening = mongoose.model('Screening',new mongoose.Schema({
    cinemaHallId: mongoose.Schema.Types.ObjectId,
    movieId: mongoose.Schema.Types.ObjectId,
    date: Date
}));

//model sali kinowej
const CinemaHall = mongoose.model('Hall', new mongoose.Schema({
    name:String,
    rows:[{ 
            row:[
                {isEmpty:Boolean}
            ]
    }],
    prizeForSeats:Number
}));
// model senasu
const Movie = mongoose.model('Movie', new mongoose.Schema({
    title: String,
    genre: String,
    runningTime: Number,
    director:String,
    ageRestriction: Number
}));

const User = mongoose.model('User', new mongoose.Schema({
    name:{
        type:String,
        required: true,
        minlength: 6,
        maxlength:20
    },
    email:{
        type:String,
        required: true,
        minlength: 6,
        maxlength:100,
        unique:true
    },
    email:{
        type:String,
        required: true,
        minlength: 6,
        maxlength:1024,
    }
}))

exports.Movie = Movie;
exports.CinemaHall = CinemaHall;
exports.Screening = Screening;