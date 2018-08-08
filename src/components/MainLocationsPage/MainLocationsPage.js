import React, { Component } from "react";
import LocationsList from "../LocationsList/LocationsList";
import { seedData } from "../UserLocationsPage/seedData";
import GoogleApiWrapper from "./Map";
import "./MainLocationsPage.css";

let googleMap;
let google;

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
    };
  }

  componentDidMount() {
    this.setState({
      userLocations: seedData
    });
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
    // Set time out is necessary to let window.google load before geocode and nearby functions are called
      setTimeout(()=>{
        this.reverseGeocodeLocation(this.state.userCurrentPostion);
        this.searchNearbyLocation(this.state.userCurrentPostion, 100);  
      },500)
  };

  // To format the results of google nearbySearch and reverseGeocoder
  getUsableLocations = (locations, address, seperator) => {
    const results = locations.filter(location => {
      const formattedAddress = location[address];
      return formattedAddress.includes(seperator);
    });
    return results;
  };

  formatResults = (results, address, character) => {
    const filteredResults = this.getUsableLocations(results, address, character);
    return filteredResults.map((place) => {
      return {
        address: place.name ? `${place.name}, ${place[address]}` : place[address],
        placeId: place.place_id,
        location: {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        }
      }
    })
  }
  
  onSuccessHelper = (results, status, address, seperator) => {
    let formattedPlace
    if (String(status) === 'OK') {
      formattedPlace = this.formatResults(results, address, seperator)
    }
    this.setState({
      nearbyLocations: [...this.state.nearbyLocations, ...formattedPlace]
    })
  }
  
  // First, we will fetch user's current location
  // Once that is done, we have the lat long
  // Using this lat long, we reverse geocode it, and we get an array
  // of addresses for this lat long
  
  // The first result in the array, is probably the closest match
  // Using this closest address match, we take its lat long, and
  // run the searchNearbyLocations on it
  // This will give us a list of nearby places
  
  // Given an location (containing lat and long), returns an array of
  // possible geocoded addresses nearby
  reverseGeocodeLocation = location => {
    google = window.google;
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location }, (results, status) => {
      this.onSuccessHelper(results, status, 'formatted_address', ',')
    });
  };

  getMap = (mapProps, map) => {
    googleMap = map;
  }

  searchNearbyLocation = (location, radius) => {
    google = window.google;

    const service = new google.maps.places.PlacesService(googleMap);
    let request = { location, radius };

    service.nearbySearch(request, (results, status) => {
      this.onSuccessHelper(results, status, 'vicinity', ' ')
    });
  };

  render() {
    console.log("Nearby locations state", this.state.nearbyLocations)
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
