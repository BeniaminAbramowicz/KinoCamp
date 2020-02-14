import React from 'react'
import apis from '../api/index'
import ScreeningsComponent from '../components/ScreeningsComponent'

class ScreeningsPage extends React.Component{

    state = { screenings: [], errorMessage: '' };

    componentDidMount = async () => {
        await apis.getAllScreenings()
        .then(res => {
            this.setState({screenings: res.data});
        })
        .catch(err => {
            this.setState({errorMessage: err.response.data});
        })   
    }

    render(){
        return (
                <ScreeningsComponent screeningsList={this.state.screenings} errorMessage={this.state.errorMessage}/>
        )
    }
}

export default ScreeningsPage