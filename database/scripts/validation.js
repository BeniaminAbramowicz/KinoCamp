const model = require('./model');
const dataManager = require('./dataManager')
const bcrypt = require('bcrypt');

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

//authenticateUserTest();

exports.validateUser = authenticateUser;