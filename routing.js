const express = require('express');
const dataManager = require('./database/scripts/dataManager');
const router = express.Router();

router.put('/profile/edit/:id', dataManager.updateUserData);

module.exports = router;