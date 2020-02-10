const Model =  require('./model');
const bcrypt = require('bcrypt'), SALT_WORK_FACTOR = 10;

async function getUserByEmail(email){
    const user = await Model.User.findOne({email: email})
    return user;
}

async function getUsersId(){
    const users = await Model.User.find()
    .select({_id_: 1});
    return users;
}

async function getScreenings(req, res){
    const screeningsList = await Model.Screening.find().populate('movie');
    console.log(screeningsList);
    return res.json(screeningsList);
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


async function saveScreening(cinemaHall,movie,screeningDate){
    const screening = new Model.Screening({
        cinemaHall: cinemaHall,
        movie : movie,
        date : screeningDate
    });
    const result = await screening.save();
    console.log(result);
}

async function saveBooking(userId,screeningId,bookedseats){
    const booking = new Model.Booking({
        screeningId: screeningId,
        userId: userId,
        seats: bookedseats,
    });
    const result = await booking.save();
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


async function saveUser(req, res){
    const user = new Model.User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    })
    
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    user.password = await bcrypt.hash(user.password, salt);      
    await user.save();
    return res.status(200).send();
}

updateUserData = async (req, res) => {
    const body = req.body;

    if(!body){
        return res.status(400).json({
            success: false,
            error: 'Bad request',
        })
    }

    Model.User.find({email: req.params.email}, (err, user) =>{
        if(err){
            return res.status(404).json({
                err,
                message: 'User not found',
            })
        }

        user.name = body.name;
        user.email = body.email;
        user.password = body.password;
        user.save()
        .then(() => {
            return res.status(200).json({
                success: true,
                id: user._id,
                message: 'User data updated',
            })
        }).catch(error => {
            return res.status(404).json({
                error,
                message: 'User data failed to update',
            })
        })
    })
}

async function loginUser(req, res){
    const username = req.body.username;
    const password = req.body.password;

    await models.User.findOne({username: username, password: password}, function(err, user){
        if(err){
            console.log(err);
            return res.status(500).send();
        }

        if(!user){
            return res.status(400).send();
        }
        req.session.user = user._id;
        return res.status(200).send("test");
    })
}

async function logoutUser(req, res){
    req.session.destroy();
    return res.status(200).send();
}

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
exports.getCinemaHalls = getCinemaHalls;
exports.getMoviesId = getMoviesId;
exports.updateUserData = updateUserData;





