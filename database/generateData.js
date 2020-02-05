const dataManager = require('./dataManager');

async function generateScreenings(){
    const moviesId = await dataManager.getMoviesId();
    const cinemaHallsId = await dataManager.getCinemaHallsId();
    const screeningDate = new Date(2020,1,1)
    console.log(cinemaHallsId);
    console.log(screeningDate);
    console.log(moviesId);

    for(let day = 0; day < 7 ; day++ ){
        screeningDate.setDate(screeningDate.getDate() + 1)
        for(let i = 0 ;i < cinemaHallsId.length ; i++){
            screeningDate.setHours(9)
            for(let j = 0 ; j < moviesId.length; j++){
                screeningDate.setHours(screeningDate.getHours() + 3);
                await dataManager.saveScreening(cinemaHallsId[i],moviesId[j],screeningDate)
                
            }
        }
    }   
}

generateScreenings();


// funkcja zapisująca do bazy danych filmy z przykładowego pliku
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

const saveData = async function(object){
    if(object.name != undefined)        //objekt to sala kinowa
        dataManager.saveCinemaHall(object);
    else if(object.title != undefined)
        dataManager.saveMovie(object);              // obiekt jest filmem
}



