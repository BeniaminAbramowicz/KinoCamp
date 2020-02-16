import React from 'react'

class NotFoundPage extends React.Component{

    render(){
        return(
            <div className="not-found-container">
                <h1 id="not-found-message"><code>{window.location.pathname}</code> page address was not found</h1>
            </div>
        )
    }
}

export default NotFoundPage;