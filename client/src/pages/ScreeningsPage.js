import React from 'react'
import apis from '../api/index'
import ScreeningsComponent from '../components/ScreeningsComponent'

class ScreeningsPage extends React.Component{

    state = {screenings: [] };

    componentDidMount = async () => {
        const response = await apis.getAllScreenings();
        this.setState({screenings: response.data});
    }

    render(){
        return (
            <div>
                <ScreeningsComponent screeningsList={this.state.screenings}/>
            </div>
        )
    }
}

export default ScreeningsPage