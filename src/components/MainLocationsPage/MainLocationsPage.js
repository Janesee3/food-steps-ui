import React, { Component } from "react";
import LocationsList from "../LocationsList/LocationsList";
import { seedData } from "../UserLocationsPage/seedData";
import GoogleApiWrapper from "./Map";
import "./MainLocationsPage.css";

class MainLocationsPage extends Component {
  constructor() {
    super();
    this.state = {
      userLocations: [],
      userCurrentPostion: {
        // hardcoded initial loc
        lat: 1.2,
        lng: 103
      },
      isCurrentLocationFetched: false,
      nearbyLocations: []
    };
  }
  componentDidMount() {
    this.setState({
      userLocations: seedData
    });
    console.log("component did mount!");
    navigator.geolocation.getCurrentPosition(this.onCurrentLocationFetched);
  }

  // Given an location (containing lat and long), returns an array of
  // possible geocoded addresses nearby
  reverseGeocodeLocation = location => {
    const google = window.google;
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location }, function(results, status) {
      console.log(results);
      return results;
    });
  };

  onCurrentLocationFetched = position => {
    this.setState({
      userCurrentPostion: {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      },
      isCurrentLocationFetched: true
    });
    this.reverseGeocodeLocation(this.state.userCurrentPostion);
  };

  render() {
    return (
      <div className="main-locations">
        <div id="map-locations-map">
          <GoogleApiWrapper
            userCurrentPostion={this.state.userCurrentPostion}
          />
        </div>
        <div id="map-locations-list">
          <LocationsList userLocations={this.state.userLocations} />
        </div>
      </div>
    );
  }
}

export default MainLocationsPage;
