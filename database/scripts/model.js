const mongoose = require('mongoose');

const Booking = mongoose.model('Booking',new mongoose.Schema({
    screeningId: mongoose.Schema.Types.ObjectId,
    userId: mongoose.Schema.Types.ObjectId,
    status: String
}));

const CinemaHallSchema = new mongoose.Schema({
    name:String,
    rows:[{ 
            row:[
                {isEmpty:Boolean}
            ]
    }],
    prizeForSeats:Number
});

const CinemaHall = mongoose.model('cinemaHall', CinemaHallSchema);

const Screening = mongoose.model('Screening',new mongoose.Schema({
    cinemaHall: CinemaHallSchema,
    movieId: mongoose.Schema.Types.ObjectId,
    date: Date
}));

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
    password:{
        type:String,
        required: true,
        minlength: 6,
        maxlength:1024,
    }
}))

exports.Movie = Movie;
exports.CinemaHall = CinemaHall;
exports.Screening = Screening;
exports.User = User;
exports.Booking = Booking;