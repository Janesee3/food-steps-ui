import React, { Component } from 'react';
import LocationsLists from '../LocationsList/LocationsList'

class UserLocationsPage extends Component {
    constructor() {
        super()
        this.state = {
            userLocations: [{ description: "Description", jane: "Title", sahil: "content" }, { description: "Description", jane: "Title", sahil: "content" }]
        }
    }

    async componentDidMount() {
        const response = await fetch('https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo');
        const userLocationData = await response.json()
        // console.log("UserLocations Data", userLocationData)
        this.setState({
            userLocations: userLocationData.results
        })
    }


    render() {
        console.log("saifhaif", this.state.userLocations)
        return (
            <div>
                <LocationsLists userLocations={this.state.userLocations}/>
            </div>
        );
    }
}

export default UserLocationsPage;
