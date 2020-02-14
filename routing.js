const express = require('express');
const dataManager = require('./database/scripts/dataManager');
const router = express.Router();
const authUser = require('./tokenauth');


router.get('/screenings', dataManager.getScreenings);
router.get('/registerpage');
router.post('/register', dataManager.saveUser);
router.get('/profile', dataManager.getUserById);
router.put('/edituser', dataManager.updateUserData);
router.post('/login', dataManager.loginUser);
router.get('/logout', dataManager.logoutUser);
router.get('/loginpage');
router.post('/createreservation', dataManager.saveBooking);

module.exports = router;