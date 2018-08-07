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

  fetchPlaces(mapProps, map) {
    const { google } = mapProps;
    const geocoder = new google.maps.Geocoder();
    const infowindow = new google.maps.InfoWindow();
    const latlng = { lat: 1.2834, lng: 103.8607 };
    geocoder.geocode({ location: latlng }, function(results, status) {
      if (status === "OK") {
        if (results[0]) {
          map.setZoom(11);
          var marker = new google.maps.Marker({
            position: latlng,
            map: map
          });
          infowindow.setContent(
            results[0].formatted_address +
              "lat: " +
              results[0].geometry.location.lat()
          );
          infowindow.open(map, marker);
          console.log("locations", results);
        } else {
          window.alert("No results found");
        }
      } else {
        window.alert("Geocoder failed due to: " + status);
      }
    });
  }
  
  render() {
    return (
      <div className="main-locations">
        <div id="map-locations-map">
          <GoogleApiWrapper fetchPlaces={this.fetchPlaces}/>
        </div>
        <div id="map-locations-list">
          <LocationsList userLocations={this.state.userLocations} />
        </div>
      </div>
    );
  }
}

export default MainLocationsPage;
