import React from 'react'

class MainPage extends React.Component{

    render(){
        return(
            <div className="main-page-container">
                <h1>Welcome to Cinema Booking App (BAME group - Coders Camp)</h1>
                <br /><br />
                <h1>We used these technologies/programming languages/libraries for our project</h1>
                <div className="main-page-images">
                    <img src={require('../images/node.png')} width="200px" height="auto" alt="node"/>
                    <img src={require('../images/express.png')} width="200px" height="auto" alt="express"/>
                    <img src={require('../images/JS_logo.png')} width="200px" height="auto" alt="js"/>
                    <img src={require('../images/mongodb.png')} width="200px" height="auto" alt="mongo"/>
                    <img src={require('../images/react.png')} width="200px" height="auto" alt="react"/>
                    <img src={require('../images/Github.png')} width="200px" height="auto" alt="github"/>
                </div>        
            </div>
        )
    }

}

export default MainPage;