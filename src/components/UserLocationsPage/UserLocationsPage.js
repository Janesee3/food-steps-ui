import React, { Component } from 'react';
import LocationsLists from '../LocationsList/LocationsList'
// import { seedData } from './seedData'

const URL = "http://localhost:3000/locations/user/"
// const URL2 = "https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo"

class UserLocationsPage extends Component {
    constructor() {
        super()
        this.state = {
            userLocations: []
        }
    }

    async componentDidMount() { 
        const response = await fetch(URL, {
            credentials: 'include'
        });
        const userLocationData = await response.json()
        console.log("UserLocations Data", userLocationData)
        this.setState({
            userLocations: userLocationData
        })
    }


    render() {
        // console.log("saifhaif", this.state.userLocations)
        return (
            <div>
                <LocationsLists userLocations={this.state.userLocations} detailed={true} />
            </div>
        );
    }
}

export default UserLocationsPage;
