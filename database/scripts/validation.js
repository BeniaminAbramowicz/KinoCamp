const model = require('./model');
const Joi = require('joi');

function validateUser(user){
    const schema = {
        name: Joi.string().min(6).max(20).required(),
        email: Joi.string().min(6).max(10).required().email(),
        password: Joi.string().min(6).max(1024).required(),
    }
    return Joi.validate(user,schema)
}

exports.validateUser = validateUser;