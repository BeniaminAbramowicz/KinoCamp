import React from 'react'

class MainPage extends React.Component{
    render(){
        return(
            <div className="main-page-container">
                <h1>Welcome to Cinema Booking App (BAME group - Coders Camp)</h1>
                <br /><br />
                <h1>We used these technologies/programming languages/libraries for our project</h1>
                <div className="main-page-images">
                    <div><img src={require('../images/node.png')} alt="node"/></div>
                    <div><img src={require('../images/express.png')} alt="express"/></div>
                    <div><img src={require('../images/JS_logo.png')} alt="js"/></div>
                    <div><img src={require('../images/mongodb.png')} alt="mongo"/></div>
                    <div><img src={require('../images/react.png')} alt="react"/></div>
                    <div><img src={require('../images/Github.png')} alt="github"/></div>
                </div>        
            </div>
        )
    }

}

export default MainPage;