import React, { Component } from "react";
import { Button } from "antd";
import LocationSuggestionList from "../LocationSuggestionList/LocationSuggestionList";
import LocationFormContainer from "../LocationFormContainer/LocationFormContainer";
import SignInRequired from "../SignInRequired/SignInRequired";

class AddLocationWizard extends Component {
  constructor() {
    super();
    this.state = {
      isLocationSelectorVisible: true // TODO: Change to false later when onclick is linked
    };
  }

  toggleFormVisibility = () => {
    this.setState({
      isLocationSelectorVisible: !this.state.isLocationSelectorVisible
    });
  };

  render() {
    return this.props.isLoggedInUser ? (
      this.state.isLocationSelectorVisible ? (
        <div>
          <Button type="primary" onClick={this.toggleFormVisibility}>
            Choose Location
          </Button>
          <Button onClick={this.props.toggleForm}>Back</Button>
          <LocationSuggestionList
            nearbyLocations={this.props.nearbyLocations}
            onLocationSelected={this.props.onLocationSelected}
          />
        </div>
      ) : (
        <div>
          <Button onClick={this.toggleFormVisibility}>Back</Button>
          <LocationFormContainer isLoggedInUser={this.props.isLoggedInUser} />
        </div>
      )
    ) : (
      <SignInRequired />
    );
  }
}

export default AddLocationWizard;
