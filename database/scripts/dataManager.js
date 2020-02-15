const Model =  require('./model');
const bcrypt = require('bcrypt');
const validation = require('./validation');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const secret = 'rr3r45r3534frety54645y45y45y4yy54';

async function getUserByEmail(email){
    const user = await Model.User.findOne({email: email})
    return user;
}

async function getUsersId(){
    const users = await Model.User.find()
    .select({_id_: 1});
    return users;
}

async function getMoviesId(){
    const movies = await Model.Movie.find()
    .select({_id_: 1});
    return movies;
}

async function saveScreening(cinemaHall,movie,screeningDate){
    const screening = new Model.Screening({
        cinemaHall: cinemaHall,
        movie : movie,
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

async function getUserById(req, res){
    if(req.session.testing){
        await Model.User.findOne({_id: jwt.decode(req.session.testing).userId})
        .select({username: 1, email: 1, name: 1, surname: 1})
        .then((user) => {
            return res.status(200).send(user);
        })
        .catch(err => {
            return res.status(500).send(err + " | Server failed to fetch data");
        });
    } else {
        return res.status(401).json({error: 'You must be logged in to view profile'});
    } 
}

async function getScreenings(req, res){
    await Model.Screening.find().populate('movie')
    .then(screeningsList => {
        return res.status(200).json(screeningsList);
    }).catch(err => {
        return res.status(500).json({errorMessage: 'There was an error when attempting to get data from the server'});
    });
}

async function saveBooking(req, res){
    const screeningData = await Model.Screening.findOne({_id: req.body.screening});
    let finalPrice = 0;
    if(req.body.amountOfSeats !== req.body.bookedSeats.length){
        finalPrice = req.body.bookedSeats.length * screeningData.cinemaHall.priceForSeats;
    } else {
        finalPrice = req.body.totalPrice;
    }
    for(var i = 0; i < req.body.bookedSeats.length; i++){
        if(screeningData.cinemaHall.seats[req.body.bookedSeats[i].row - 1][req.body.bookedSeats[i].seat - 1]){
            return res.status(400).send();
        }
    }

    const booking = new Model.Booking({
        screening: req.body.screening,
        user: req.body.user,
        totalPrice: finalPrice,
        seats: req.body.bookedSeats,
    });
    const result = await booking.save();
    console.log(result);

    const userForEmail = await Model.User.findOne({_id: req.body.user});

    async function main(){

        let testAccount = await nodemailer.createTestAccount();

        let transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false,
            auth: {
            user: testAccount.user,
            pass: testAccount.pass
            }
        });

          await transporter.sendMail({
            from: '"Cinema Booking App" <cinemabookingapp@example.com>',
            to: "example@example.com",
            subject: "Reservation number " + result._id,
            html: "<h2> Movie: " + screeningData.movie.title + "</h2>"
            + "<h4>Date: " + screeningData.date + "</h4>" 
            + "<h4>Ticket(s) total price: " + finalPrice + "</h4>"
            + "<h4>Seats count: " + req.body.bookedSeats.length + "</h4>"
          });
    }
    main().catch(console.error);

    return res.status(200).send();
}

async function saveUser(req, res){
    const validationError = validation.registerUserValidation(req.body);
    if(validationError.hasOwnProperty("error")) return res.status(400).json({error: validationError.error.message});
    const userByMail = await Model.User.findOne({email: req.body.email});
    if(userByMail) return res.status(400).send('User already registered');
    const userByNickname = await Model.User.findOne({username: req.body.username});
    if(userByNickname) return res.status(400).send('User already registered');

    const user = new Model.User({
        username: req.body.username,
        email: req.body.email,
        name: req.body.name,
        surname: req.body.surname,
        password: req.body.password,
    })

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);      
    await user.save();
    return res.status(200).send();
}

async function loginUser(req, res){
    await Model.User.findOne({username: req.body.username})
    .then(async (user) => {
        if(!user) return res.status(400).send('Username or password incorrect');

        await bcrypt.compare(req.body.password, user.password)
        .then((isCorrect) => {
            if(!isCorrect) return res.status(400).send('Username or password incorrect');
            const token = jwt.sign({username: req.body.username, userId: user._id}, secret, {expiresIn: "1h"});
            req.session.testing = token;
            return res.status(201).json({message: 'You have been logged in'});
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({error: 'Server error'});
        });  
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({error: 'Server error'});
    });
}

async function logoutUser(req, res){
    await req.session.destroy();
    return res.status(200).send("Session ended");
}

async function updateUserData(req, res){
    const validationError = validation.updateUserValidation(req.body)
    if(validationError.hasOwnProperty("error")) return res.status(400).json({error: validationError.error.message});
    if(req.body.repeatPassword !== req.body.newPassword) return res.status(400).json({error: 'Passwords in both fields do not match'})
    await Model.User.findOne({_id: jwt.decode(req.session.testing).userId})
    .then(async (user) => {
        const salt = await bcrypt.genSalt(10);
        if(!salt) return res.status(500).json({error: 'Server error'});
        const newHashedPassword = await bcrypt.hash(req.body.newPassword, salt);
        if(!newHashedPassword) return res.status(500).json({error: 'Server error'});
        user.password = newHashedPassword;
        try {
            await user.save();
            return res.status(200).json({message: 'Password change successful'});
        } catch {
            console.log(err);
            return res.status(500).json({error: 'Server error'});
        }
    })
    .catch(err => {
        console.log(err);
        return res.status(500).send('Server error');
    });
}

exports.getUserById = getUserById;
exports.logoutUser = logoutUser;
exports.loginUser = loginUser;
exports.saveBooking = saveBooking;
exports.getScreenings = getScreenings;
exports.getUsersId = getUsersId;
exports.getUserByEmail = getUserByEmail;
exports.saveUser = saveUser;
exports.saveCinemaHall = saveCinemaHall;
exports.saveMovie = saveMovie;
exports.saveScreening = saveScreening;
exports.getMoviesId = getMoviesId;
exports.updateUserData = updateUserData;





