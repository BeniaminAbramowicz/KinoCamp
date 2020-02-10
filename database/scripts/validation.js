const dataManager = require('./dataManager')
const bcrypt = require('bcrypt')
const Joi = require('@hapi/joi')
const Model = require('./model')

// funkcja służąca do autentykacji użytkownika, sprawdza 
//czy istnieje użytkownik o taki emailu, a nasteonie czy hasło sie zgadza
async function authenticateUser(userToAuth){
    let user = await dataManager.getUserByEmail(userToAuth.email);    
        if(!user)                   
            return false;
    let validPassword = await bcrypt.compare(userToAuth.password,user.password);
        if(!validPassword)
            return false;
    return true;
}

function registerUserValidation(user){
    const regexpw= /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    const regexmail= /[^@]+@[^\.]+\..+/;
    const schema = Joi.object({
        username: Joi.string().min(6).max(20).required(),
        email: Joi.string().min(7).max(100).required().pattern(regexmail),
        name: Joi.string().min(2).max(100).required(),
        surname: Joi.string().min(2).max(100).required(),
        password: Joi.string().min(6).pattern(regexpw)
    });
    return schema.validate(user);
}

module.exports.validateUser = authenticateUser;
module.exports.registerUserValidation = registerUserValidation;