const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const appRouting = express();
const db = require('./databasecfg');
const routing = require('./routing');
const cookieParser = require('cookie-parser');
const session = require('express-session');

appRouting.use(bodyParser.urlencoded({extended: true}));
appRouting.use(bodyParser.json());
appRouting.use(cookieParser());
appRouting.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
appRouting.use(session({
    secret: 'test',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 3600000, httpOnly: true, sameSite: "strict", path: "/"}
}))

db.on('error', console.error.bind(console, 'Database connection error: '));

appRouting.get('/');
appRouting.use('/api', routing);

appRouting.listen(3001, () => console.log('Express.js routing server is running'));
