const Model =  require('./model');
const bcrypt = require('bcrypt');
const validation = require('./validation');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const hashSecret = process.env.HASH_SECRET;
const qrcode = require('qrcode');
const nodemailerEmail = process.env.USER_EMAIL;
const nodemailerPassword = process.env.USER_PASSWORD;

Date.prototype.addHours = function(hours){
    this.setHours(this.getHours() + hours);
    return this;
}

Date.prototype.addMinutes = function(minutes){
    this.setMinutes(this.getMinutes() + minutes);
    return this;
}

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
    if(req.session.token){
        jwt.verify(req.session.token, hashSecret, async function(err, decoded){
            if(err) {
                console.log(err);
                return res.status(401).json({error: 'Your session has expired. You will be redirected to login window'});
            }
            await Model.User.findOne({_id: decoded.userId})
            .select({username: 1, email: 1, name: 1, surname: 1})
            .then((user) => {
                return res.status(200).json(user);
            })
            .catch(err => {
                console.log(err);
                return res.status(500).json({error: 'Server error'});
            });
        }); 
    } else {
        return res.status(401).json({error: 'You must be logged in to view profile'});
    } 
}

async function getScreenings(req, res){
    const dateNow = new Date().toISOString().split('T')[0];
    const dateMonthAfter = new Date(new Date().setDate(new Date().getDate()+10)).toISOString().split('T')[0];
    await Model.Screening.find({date: {$gte: dateNow, $lt: dateMonthAfter}}).populate('movie')
    .then(screeningsList => {
        return res.status(200).json(screeningsList);
    }).catch(err => {
        console.log(err);
        return res.status(500).json({error: 'There was an error when attempting to get data from the server'});
    });
}

async function saveBooking(req, res){
    if(req.session.token){
        jwt.verify(req.session.token, hashSecret, async function(err, decoded){
            if(err) {
                return res.status(401).json({error: 'Your session has expired. You will be redirected to login window'});
            }
            if(req.body.amountOfSeats === 0 || req.body.bookedSeats.length === 0){
                return res.status(400).json({error: 'You have to reserve at least one seat'});
            }
            await Model.Screening.findOne({_id: req.body.screening}).populate('movie')
            .then(async (screening) => {
                let finalPrice = 0;
                if(req.body.amountOfSeats !== req.body.bookedSeats.length){
                    finalPrice = req.body.bookedSeats.length * screeningData.cinemaHall.priceForSeats;
                } else {
                    finalPrice = req.body.totalPrice;
                }
                for(var i = 0; i < req.body.bookedSeats.length; i++){
                    if(screening.cinemaHall.seats[req.body.bookedSeats[i].row - 1][req.body.bookedSeats[i].seat - 1]){
                        return res.status(400).json({error: 'Seats are already reserved'});
                    }
                }
                const uniqueCode = new Date().valueOf().toString(36) + Math.random().toString(36).substr(2);
                
                const booking = new Model.Booking({
                    screening: req.body.screening,
                    user: decoded.userId,
                    totalPrice: finalPrice,
                    seats: req.body.bookedSeats,
                    qrcode: uniqueCode
                });
                let userForEmail = '';
                try {
                    await booking.save();
                    userForEmail = await Model.User.findOne({_id: decoded.userId}).select({email: 1});
                } catch(err) {
                    console.log(err);
                    return res.status(500).json({error: 'Server error'});
                }
                let qrImg = '';
                await qrcode.toDataURL(uniqueCode)
                .then(img => {
                    qrImg = img;
                })
                .catch(err => {
                    console.log(err);
                    return res.status(500).json({error: 'Server error'});
                })

                async function main(){
                    let transporter = nodemailer.createTransport({
                        service: "gmail",
                        auth: {
                        user: nodemailerEmail,
                        pass: nodemailerPassword
                        }
                    });
        
                    await transporter.sendMail({
                        from: nodemailerEmail,
                        to: userForEmail.email,
                        subject: "Reservation number " + res._id,
                        html: `<h2>Movie: ${screening.movie.title}</h2>
                        <h4>Date: ${screening.date}</h4> 
                        <h4>Ticket(s) total price: ${finalPrice}</h4>
                        <h4>Seats count: ${req.body.bookedSeats.length}</h4>`,
                        attachments: [
                            {path: qrImg}
                        ]
                    });
                }
                main().catch(console.error);

                return res.status(200).json({message: 'Reservation has been succesfull'});
            })
            .catch(err => {
                console.log(err);
                return res.status(500).json({error: 'Server error'});
            })
        });
    } else {
        return res.status(401).json({error: 'You must be logged in to make a reservation'});
    }
}

async function getUserReservations(req, res){
    if(req.session.token){
        jwt.verify(req.session.token, hashSecret, async function(err, decoded){
            if(err) {
                console.log(err);
                return res.status(401).json({error: 'Your session has expired. You will be redirected to login window'});
            }
            await Model.Booking.find({user: decoded.userId}).populate([
                {
                    path: 'screening',
                    select: 'movie date',
                    model: 'Screening',
                    populate: {
                        path: 'movie',
                        model: 'Movie',
                        select: 'title runningTime'
                    }
                }
            ])
            .then(reservationsList => {
                let updatedList = reservationsList.map(reservation => {
                    if(reservation.screening.date.getTime() < new Date().addHours(1).addMinutes(30).getTime()){
                        reservation.status = 'archived';
                        try {
                            async () => {
                                await reservation.save();
                            }
                        } catch(err) {
                            console.log(err);
                            return res.status(500).json({error: 'Server error'});
                        }
                        return reservation;
                    } else {
                        return reservation;
                    }
                })
                return res.status(200).json(updatedList);
            }).catch(err => {
                console.log(err);
                return res.status(500).json({error: 'There was an error when attempting to get data from the server'});
            });
        });   
    } else {
        return res.status(401).json({error: 'You must be logged in to see reservations'});
    }
}

async function cancelReservation(req, res){
    if(req.session.token){
        jwt.verify(req.session.token, hashSecret, async function(err, decoded){
            if(err) {
                console.log(err);
                return res.status(401).json({error: 'Your session has expired. You will be redirected to login window'});
            }
            await Model.Booking.findOne({_id: req.body.reservationId, user: decoded.userId}).populate('screening')
            .then(async (reservation) => {
                if(reservation.screening.date.getTime() - new Date().addHours(1).getTime() <= 1800000){
                    return res.status(400).json({error: 'You can\'t cancel reservation less than 30 minutes before screening'});
                }
                reservation.status = 'cancelled';
                try {
                    await reservation.save();
                    return res.status(200).json({message: 'Reservation has been cancelled'});
                } catch(err) {
                    console.log(err);
                    return res.status(500).json({error: 'Server error'});
                }
            })
            .catch(err => {
                console.log(err);
                return res.status(500).json({error: 'Server error'});
            });
        })
    } else {
        return res.status(401).json({error: 'You must be logged in to cancel reservation'});
    }
    
}

async function saveUser(req, res){
    const validationError = validation.registerUserValidation(req.body);
    if(validationError.hasOwnProperty("error")) return res.status(400).json({error: validationError.error.message});
    let userByMail = '';
    let userByNickname = '';
    try {
        userByMail = await Model.User.findOne({email: req.body.email});
        userByNickname = await Model.User.findOne({username: req.body.username});
    } catch(err) {
        console.log(err);
        return res.status(500).json({error: 'Server error'});
    }
    if(userByMail) return res.status(400).json({error: 'User already registered'});
    if(userByNickname) return res.status(400).json({error: 'User already registered'});

    const user = new Model.User({
        username: req.body.username,
        email: req.body.email,
        name: req.body.name,
        surname: req.body.surname,
        password: req.body.password,
    })
    let salt = '';
    try {
        salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);   
        await user.save();
    } catch(err) {
        console.log(err);
        return res.status(500).json({error: 'Server error'});
    }
    return res.status(200).json({message: 'You\'ve created new account. Now you can log in'});
}

async function loginUser(req, res){
    await Model.User.findOne({username: req.body.username})
    .then(async (user) => {
        if(!user) return res.status(400).json({error: 'Username or password incorrect'});
        await bcrypt.compare(req.body.password, user.password)
        .then((isCorrect) => {
            if(!isCorrect) return res.status(400).json({error: 'Username or password incorrect'});
            const token = jwt.sign({username: req.body.username, userId: user._id}, hashSecret, {expiresIn: '1h'});
            req.session.token = token;
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

async function updatePassword(req, res){
    if(req.session.token){
        jwt.verify(req.session.token, hashSecret, async function(err, decoded){
            if(err) {
                return res.status(401).json({error: 'Your session has expired. You will be redirected to login window'});
            }
            await Model.User.findOne({_id: decoded.userId})
            .then(async (user) => {
            const validationError = validation.updateUserValidation(req.body)
            if(validationError.hasOwnProperty("error")) return res.status(400).json({error: validationError.error.message});
            if(req.body.repeatPassword !== req.body.newPassword) return res.status(400).json({error: 'Passwords in both fields do not match'});
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
        });
    } else {
        return res.status(401).json({error: 'You must be logged in to update password'});
    } 
}

exports.cancelReservation = cancelReservation;
exports.getUserReservations = getUserReservations;
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
exports.updatePassword = updatePassword;





