# Cinema Booking App

MERN web application for cinema seats booking service

## General info

This is the final project for Coders Camp web developer tutorial. Application simulates a seats booking service for screenings in a cinema. Application provides an e-ticket system as a QR code.

## Technologies

- JavaScript (ES 15/16/17/18)
- Node.js 12.13.0
- React 16.12.0
- MongoDB 4.2.2
- Express.js 4.17.1
- jQuery 3.2.1
- Bootstrap 4
- HTML5/CSS

## Features

- Browsing screenings for next 10 days and detailed description of each movie
- Making a reservation (reservation only available for logged users)
- Cancelling reservation (only if there is more than 30 minutes left to screening)
- Registering new user's account
- Login session secured with Json Web Token
- User's profile data and password changing form
- "My reservations" page with active, cancelled and past reservations of a user
- E-ticket. Making reservation creates an unique ticket number that is later used for creating QR code sent to user's email along with reservations informations. 

### To Do:

- Admin panel for managing screenings, movies and confirmation of recieving/reading a QR code ticket (changing resrvation status to realised/archived)
- Code refactor to include Redux and functional components with hooks
- Screenings pagination
- More server side validation for user forms to avoid potential XSS attacks
- CSRF tokens

## Setup

To run this project: 

- Install it locally using npm 
- Set up environmental variables PORT, SESSION_SECRET (a string that will protect session by hashing it using provided string), HASH_SECRET (JWT hash string), USER_EMAIL, USER_PASSWORD (credentials of an email in gmail service used to send reservations info and e-ticket to users)
- You need to have installed MongoDB database and run it (Additionally use MongoDB Compass for user interface and create "kinocamp" database as well as collections: users, movies, screenings, bookings)
- For test data there are json files that You can import in Compass. Use those with "compass" prefix in file names as the other ones are formatted and won't be accepted by Compass

```
$ npm install
$ export PORT=3001
$ export SESSION_SECRET='yoursessionstring'
$ export HASH_SECRET='yourhashstringforjwt'
$ export USER_EMAIL='gmailadress'
$ export USER_PASSWORD='gmailpassword'
```
In first terminal run

```
npm start
```

In second terminal run

```
cd client
npm start
```

In third terminal run

```
mongod
```


