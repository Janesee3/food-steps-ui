import React, { Component } from 'react';
import { Button } from 'antd';
import LocationSuggestionList from "../LocationSuggestionList/LocationSuggestionList"
import LocationFormContainer from '../LocationFormContainer/LocationFormContainer';


class AddLocationWizard extends Component {
    constructor() {
        super()
        this.state = {
            isFormVisible: false,
        }
    }

    toggleFormVisibility = () => {
        this.setState({
            isFormVisible: !this.state.isFormVisible
        })
    }

    render() {
        return (
            <div>
                <div id="map-locations-list">
                    <Button type='primary' onClick={this.toggleFormVisibility} >{this.state.isFormVisible ? "Back" : "Choose Location"} </Button>
                    {this.state.isFormVisible ?
                        <LocationFormContainer isLoggedInUser={this.props.isLoggedInUser} /> :
                        <LocationSuggestionList
                            nearbyLocations={this.props.nearbyLocations}
                            onLocationSelected={this.props.onLocationSelected} />

                    }
                </div>

            </div>
        );
    }
}

export default AddLocationWizard;
