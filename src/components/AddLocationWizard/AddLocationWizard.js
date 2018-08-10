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
                    {this.state.isFormVisible ?
                        <div>
                            <Button onClick={this.toggleFormVisibility} >Back</Button>
                            <LocationFormContainer isLoggedInUser={this.props.isLoggedInUser} />
                        </div> :
                        <div>
                            <Button type='primary' onClick={this.toggleFormVisibility} > Choose Location </Button>
                            <Button onClick={this.props.toggleForm} >Back</Button>
                            <LocationSuggestionList
                                nearbyLocations={this.props.nearbyLocations}
                                onLocationSelected={this.props.onLocationSelected} />
                        </div>
                    }
                </div>

            </div>
        );
    }
}

export default AddLocationWizard;
