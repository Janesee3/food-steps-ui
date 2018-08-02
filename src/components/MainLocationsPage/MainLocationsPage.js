import React, { Component } from "react";
import LocationsList from "../LocationsList/LocationsList";
import { seedData } from "../UserLocationsPage/seedData"
import GoogleApiWrapper from './Map'

class MainLocationsPage extends Component {
  constructor() {
    super();
    this.state = {
      userLocations: []
    }
  }
  async componentDidMount() {
    this.setState({
      userLocations: seedData
    })
  }

  render() {
    return (
      <div className="main-locations">
        <div id="map-locations-map">
          <GoogleApiWrapper />
        </div>
        <div id="map-locations-list">
          <LocationsList userLocations={this.state.userLocations} />
        </div>
      </div>
    );
  }
}

export default MainLocationsPage;
