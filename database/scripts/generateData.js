const dataManager = require('./dataManager');

// funkcja generująca po 4 seanse, różnych filmów na cały tydzień
async function generateScreenings(){
    const moviesId = await dataManager.getMoviesId();                       // pobieram liste id filmów
    const cinemaHallsId = await dataManager.getCinemaHallsId();             // pobieram liste id sal kinowych
    const screeningDate = new Date(2020,1,1)                                // ustawiam date początkową
    for(let day = 0; day < 7 ; day++ ){
        screeningDate.setDate(screeningDate.getDate() + 1)                  //nastepny dzien
        for(let i = 0 ;i < cinemaHallsId.length ; i++){
            screeningDate.setHours(9)                                       // kazdego dnia filmy od tej samej godziny  
            for(let j = 0 ; j < moviesId.length; j++){
                screeningDate.setHours(screeningDate.getHours() + 3);       //filmy co trzy godziny 
                await dataManager.saveScreening(cinemaHallsId[i],moviesId[j],screeningDate)
                
            }
        }
    }   
}

// funkcja czytające z pliku o formacie JSON i przekazujaca obiekty do zapisania
const  getDataFromJSON = async function(url){
    // pobieram dane
    await fetch(url)
    .then(res =>{
        return res.json();
    }).then(data => {
        data.map((object) =>{
            saveData(object);       //każdy obiekt zapisuje do bazy
        });
    });
}

// funkcja przekazujaca dane do odpowiedniej funkcji zapisującej w zależności od tego czym jest obiekt(sala kinowa, film itd.)
const saveData = async function(object){
    if(object.name != undefined)        //objekt to sala kinowa
        dataManager.saveCinemaHall(object);
    else if(object.title != undefined)
        dataManager.saveMovie(object);  // obiekt jest filmem
}



