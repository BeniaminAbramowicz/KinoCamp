const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const appRouting = express();
const db = require('./databasecfg');

appRouting.use(bodyParser.urlencoded({extended: true}));
appRouting.use(cors());
appRouting.use(bodyParser.json());

db.on('error', console.error.bind(console, 'Database connection error: '));

appRouting.get('/', (req, res) => {
    res.send('Main page');
});

appRouting.listen(3001, () => console.log('Express.js routing server is running'));