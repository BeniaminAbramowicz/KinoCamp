import React from 'react'
import NavBar from '../components/NavBar'

class NotFoundPage extends React.Component{
    
    constructor(props){
        super(props);
        
        this.navBarElement = React.createRef();
    }
    
    render(){
        return(
            <div>
                <NavBar ref={this.navBarElement}/>
                <div className="not-found-container">
                    <h1 id="not-found-message"><code>{window.location.pathname}</code> page address was not found</h1>
                </div>
            </div>
        )
    }
}

export default NotFoundPage;