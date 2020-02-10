const express = require('express');
const dataManager = require('./database/scripts/dataManager');
const router = express.Router();

router.get('/screenings', dataManager.getScreenings);
router.get('/registerpage');
router.post('/register', dataManager.saveUser);
router.put('/profile/edit/:id', dataManager.updateUserData);


module.exports = router;