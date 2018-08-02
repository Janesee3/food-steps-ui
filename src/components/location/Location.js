import React, { Component } from 'react';
import AllLocations from './AllLocations';


class LocationComponent extends Component {
    constructor() {
        super()
        this.state = {
            dummylocations: [{ lat: 1, lng: 1 }, { lat: 2, lng: 2 }, { lat: 3, lng: 3 }, { lat: 4, lng: 4 }]
        }
    }

    render() {
        return (
            <div>
                Hello from Locations Router
                <AllLocations />
            </div>
        );
    }
}

export default LocationComponent;

