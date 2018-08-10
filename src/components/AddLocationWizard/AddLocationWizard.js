import React, { Component } from 'react';
import { Button } from 'antd';
import LocationSuggestionList from "../LocationSuggestionList/LocationSuggestionList"

class AddLocationWizard extends Component {
    constructor(){
        super()
        this.state={

        }
    }
    render() {
        return (
            <div>
                <div id="map-locations-list">
                    <Button type='primary'> Choose Location </Button>
                    <LocationSuggestionList 
                    nearbyLocations={this.props.nearbyLocations} 
                    onLocationSelected={this.props.onLocationSelected}/>
                </div>

            </div>
        );
    }
}

export default AddLocationWizard;
