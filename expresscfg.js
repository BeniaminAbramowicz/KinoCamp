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
const sessionSecret = process.env.SESSION_SECRET;
appRouting.use(session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 3600000, httpOnly: true, sameSite: "strict", path: "/"}
}))

db.on('error', console.error.bind(console, 'Database connection error: '));

appRouting.get('/screenings');
appRouting.use('/api', routing);

const port = process.env.PORT || 3001;
appRouting.listen(port, () => console.log('Express.js routing server is running on port ' + port));