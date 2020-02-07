const dataManager = require('./dataManager');
const fetch = require('node-fetch');


// funkcja generująca po 4 seanse, różnych filmów na cały tydzień
async function generateScreenings(){
    const moviesId = await dataManager.getMoviesId();                       
    const cinemaHalls = await dataManager.getCinemaHalls();             
    const screeningDate = new Date(2020,1,1)          
    for(let day = 0; day < 7 ; day++ ){
        screeningDate.setDate(screeningDate.getDate() + 1)                  //nastepny dzien
        for(let i = 0 ;i < cinemaHalls.length ; i++){
            screeningDate.setHours(9)                                       // kazdego dnia filmy od tej samej godziny  
            for(let j = 0 ; j < moviesId.length; j++){
                screeningDate.setHours(screeningDate.getHours() + 2);       //filmy co dwie godziny 
                await dataManager.saveScreening(cinemaHalls[i],moviesId[j],screeningDate)
            }
        }
    }   
}

// funkcja generujaca rezerwacje kazdego użytkownika na kazdy seans
async function generateBooking(){
    const usersId = await dataManager.getUsersId();                       
    const screenings = await dataManager.getScreenings();                   
                            
    for(let usersCounter = 0; usersCounter < usersId.length ; usersCounter++ ){
        for(let screeningsCounter = 0 ;screeningsCounter < screenings.length ; screeningsCounter++){
            let seats = getRandomSeats(screenings[screeningsCounter].cinemaHall.name);
            dataManager.saveBooking(usersId[usersCounter], screenings[screeningsCounter].id,seats);
        }
    }
}

// funkcja generujaca tablice z losowo wybranymi miejscami do rezerwacji
function getRandomSeats(cinemaHallName){
    let hallSize;
    let seatsNumber;
    let rowNumber;
    if(cinemaHallName === 'A') 
        hallSize = 7;
    else  
        hallSize = 5;
    row = randomInt(0,hallSize);
    seatsNumber = randomInt(1,hallSize);
    let seats = new Array(seatsNumber);
    for(let i = 0 ; i < seatsNumber; i++){
        seats[i] = {row :row, seat: i}; 
    }
    return seats
}

function randomInt(min,max) {
	return min + Math.floor((max- min) * Math.random());
}


// funkcja czytające z pliku o formacie JSON i przekazujaca obiekty do zapisania
const  getDataFromJSON = async function(url){
    await fetch(url)
    .then(res =>{
        return res.json();
    }).then(data => {
        data.map((object) =>{
            saveData(object);       
        });
    });
}

// funkcja przekazujaca dane do odpowiedniej funkcji zapisującej w zależności od tego czym jest obiekt(sala kinowa, film itd.)
const saveData = async function(object){
    if(object.rows != undefined)        
        await dataManager.saveCinemaHall(object);
    else if(object.title != undefined)
        await dataManager.saveMovie(object);  
    else if(object.password != undefined)
        await dataManager.saveUser(object);
}

//getDataFromJSON("https://raw.githubusercontent.com/BeniaminAbramowicz/KinoCamp/master/database/dataFiles/movies.json");
//getDataFromJSON("https://raw.githubusercontent.com/BeniaminAbramowicz/KinoCamp/master/database/dataFiles/hall.json");
//getDataFromJSON("https://raw.githubusercontent.com/BeniaminAbramowicz/KinoCamp/michal/database/dataFiles/users.json");
//generateScreenings();
generateBooking();




