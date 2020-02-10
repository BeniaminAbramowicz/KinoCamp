const mongoose = require('mongoose');

const Booking = mongoose.model('Booking',new mongoose.Schema({
    screeningId: mongoose.Schema.Types.ObjectId,
    userId: mongoose.Schema.Types.ObjectId,
    seats:[{
        row:Number,
        seat:Number
    }],
    status:{
        type: String,
        enum:['active','canceled'],
        default: 'active'
    }
}));

const CinemaHallSchema = new mongoose.Schema({
    name:{
        type:String,
        enum:['A','B']
    },
    seats:[[Boolean]],
    prizeForSeats:Number
});

const CinemaHall = mongoose.model('CinemaHall', CinemaHallSchema);

const Screening = mongoose.model('Screening',new mongoose.Schema({
    cinemaHall: CinemaHallSchema,
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie'},
    date: Date
}));

const Movie = mongoose.model('Movie', new mongoose.Schema({
    title: String,
    genre: String,
    runningTime: Number,
    description: String,
    director:String,
    ageRestriction:{
        type:Number,
        enum: [0,7,12,16,18]
    }
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