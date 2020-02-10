const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const appRouting = express();
const db = require('./databasecfg');
const routing = require('./routing');
var session = require('express-session')

appRouting.use(bodyParser.urlencoded({extended: true}));
appRouting.use(cors());
appRouting.use(bodyParser.json());
appRouting.use(session({secret:'qwertyuiop', resave: false, saveUninitialized: true}));

db.on('error', console.error.bind(console, 'Database connection error: '));

appRouting.get('/');

appRouting.use('/api', routing);
appRouting.listen(3001, () => console.log('Express.js routing server is running'));
