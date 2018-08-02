import React, { Component } from 'react';
import LocationsLists from '../LocationsList/LocationsList'
import { seedData } from './seedData'

const URL = "https://localhost:3000/locations/user/5b62eb31c0f5b0551cced58f"
const URL2 = "https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo"

class UserLocationsPage extends Component {
    constructor() {
        super()
        this.state = {
            userLocations: [{ description: "Description", jane: "Title", sahil: "content" }, { description: "Description", jane: "Title", sahil: "content" }]
        }
    }

    async componentDidMount() {
        // const response = await fetch(URL);
        // const userLocationData = await response.json()
        // console.log("UserLocations Data", userLocationData)
        this.setState({
            userLocations: seedData
        })
    }


    render() {
        console.log("saifhaif", this.state.userLocations)
        return (
            <div>
                <LocationsLists userLocations={this.state.userLocations} detailed={true} />
            </div>
        );
    }
}

export default UserLocationsPage;
