const express = require('express');
const dataManager = require('./database/scripts/dataManager');
const router = express.Router();

router.get('/screenings', dataManager.getScreenings);
router.get('/registerpage');
router.post('/register', dataManager.saveUser);
router.get('/profile', dataManager.getUserById);
router.put('/edituser', dataManager.updatePassword);
router.post('/login', dataManager.loginUser);
router.get('/logout', dataManager.logoutUser);
router.get('/loginpage');
router.post('/createreservation', dataManager.saveBooking);
router.post('/myreservations', dataManager.getUserReservations);
router.put('/cancelreservation', dataManager.cancelReservation);
router.get('/checksession', dataManager.checkSession);

module.exports = router;