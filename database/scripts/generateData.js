const dataManager = require('./dataManager');
const fetch = require('node-fetch');


// funkcja generująca po 4 seanse, różnych filmów na cały tydzień
async function generateScreenings(){
    const moviesId = await dataManager.getMoviesId();                       
    const cinemaHallsId = await dataManager.getCinemaHallsId();             
    const screeningDate = new Date(2020,1,1)        
                            
    for(let day = 0; day < 7 ; day++ ){
        screeningDate.setDate(screeningDate.getDate() + 1)                  //nastepny dzien
        for(let i = 0 ;i < cinemaHallsId.length ; i++){
            screeningDate.setHours(9)                                       // kazdego dnia filmy od tej samej godziny  
            for(let j = 0 ; j < moviesId.length; j++){
                screeningDate.setHours(screeningDate.getHours() + 2);       //filmy co dwie godziny 
                await dataManager.saveScreening(cinemaHallsId[i],moviesId[j],screeningDate)
                
            }
        }
    }   
}

async function generateBooking(){
    const usersId = await dataManager.getUsersId();                       
    const screeningsId = await dataManager.getCinemaHallsId();                   
                            
    for(let usersCounter = 0; usersCounter < usersId.length ; usersCounter++ ){
        for(let screeningsCounter = 0 ;i < screeningsId.length ; screeningsCounter++){
             dataManager.saveBooking()
                
            }
        }
    }   
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
getDataFromJSON("https://raw.githubusercontent.com/BeniaminAbramowicz/KinoCamp/michal/database/dataFiles/users.json");
//generateScreenings();




