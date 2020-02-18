import React from 'react'
import NavBar from '../components/NavBar'
import apis from '../api';

class MainPage extends React.Component{

    constructor(props){
        super(props);

        this.navBarElement = React.createRef();
    }

    componentDidMount = async () => {
        await apis.checkSession()
        .then(res => {
            if(res.data.loginFlag === false){
                window.localStorage.setItem('auth', false);
                this.navBarElement.current.changeNavAuth();
            }
        })
        .catch(err => {
            console.log(err);
        });
    }

    render(){
        return(
            <div>
                <NavBar ref={this.navBarElement}/>
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
            </div>
        )
    }

}

export default MainPage;