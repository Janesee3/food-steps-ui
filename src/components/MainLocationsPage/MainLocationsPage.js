import React, { Component } from "react";
import LocationsList from "../LocationsList/LocationsList";
import { seedData } from "../UserLocationsPage/seedData";
import GoogleApiWrapper from "./Map";
import "./MainLocationsPage.css";

/* global google */ 

let googleMap;
// let google;

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
      nearbyLocations: [],
      mapReady: false
    };
  }

  componentDidMount() {
    this.setState({
      userLocations: seedData
    });
    console.log("component did mount!");
      navigator.geolocation.getCurrentPosition(this.onCurrentLocationFetched);
  }

  onCurrentLocationFetched = position => {
    this.setState({
      userCurrentPostion: {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      },
      isCurrentLocationFetched: true
    });
    this.reverseGeocodeLocation(this.state.userCurrentPostion);
    this.searchNearbyLocation();
  };

  // Given an location (containing lat and long), returns an array of
  // possible geocoded addresses nearby
  reverseGeocodeLocation = location => {
    google = window.google;
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location }, (results, status) => {
      console.log("Unfiltered results ", results);
      this.getUsableLocations(results, 'formatted_address', ",");
    });
  };

  getUsableLocations = (locations, address, character) => {
    const results = locations.filter(location => {
      const formattedAddress = location[address];
      return formattedAddress.includes(character); // Take only the addresses with commas
    });
    console.log("Filtered results ",address, results);
    return results;
  };

  // First, we will fetch user's current location
  // Once that is done, we have the lat long
  // Using this lat long, we reverse geocode it, and we get an array
  // of addresses for this lat long

  // The first result in the array, is probably the closest match
  // Using this closest address match, we take its lat long, and
  // run the searchNearbyLocations on it
  // This will give us a list of nearby places

  getMap = (mapProps, map) => {
    googleMap = map;
  }

  searchNearbyLocation = () => {
    // google = window.google;

    const service = new google.maps.places.PlacesService(googleMap);
    var request = {
      location: this.state.userCurrentPostion,
      radius: "100"
    };

    service.nearbySearch(request, this.onSearchNearbySuccess);
  };

  onSearchNearbySuccess = (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      console.log("results of searchNearby", results);
      const filteredResults = this.getUsableLocations(results, 'vicinity', " ")
      const formattedPlace = filteredResults.map((place)=>{
        return {
          address: `${place.name}, ${place.vicinity}`,
          placeId: place.place_id,
          location: {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
          }
        }
      })
      console.log("Hello",formattedPlace)
    }
  };

  

  

  render() {
    return (
      <div className="main-locations">
        <div id="map-locations-map">
          <GoogleApiWrapper
            userCurrentPostion={this.state.userCurrentPostion}
            getMap={this.getMap}
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
