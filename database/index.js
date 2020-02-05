const mongoose = require('mongoose');
const fetch = require('node-fetch');

mongoose.connect('mongodb://localhost/KinoCamp')
    .then(()=> console.log('Ceonnected succesfully'))
    .catch(err => console.error('Could not connect to MongoDB', err));









   