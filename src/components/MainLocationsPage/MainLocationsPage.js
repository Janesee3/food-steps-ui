import React, { Component } from "react";
import LocationsList from "../LocationsList/LocationsList";

import { API_HOST } from "../../utils/networkUtils";
// import { seedData } from "../UserLocationsPage/seedData";
import { Button, notification } from "antd";
import GoogleApiWrapper from "./Map";
import "./MainLocationsPage.css";
import AddLocationWizard from "../AddLocationWizard/AddLocationWizard";

const ERR_MSG_ENABLE_LOCATION_SERVICES =
  "Please enable location services on your browser!";
const ERR_MSG_TIMEOUT =
  "Cannot fetch current location. Please refresh page to try again!";

const URL = `${API_HOST}/locations/user/`;;

class MainLocationsPage extends Component {
  constructor() {
    super();
    this._isMounted = false;
    this.state = {
      userLocations: [],
      userCurrentPostion: {
        // default lat lng is Orchard MRT
        lat: 1.304,
        lng: 103.8318
      },
      nearbyLocations: [],
      isWizardVisible: false,
      selectedLocation: null,
      google: undefined,
      googleMap: undefined
    };
  }

  // Notes: this._isMounted
  // When switching page too fast, this warning is shown
  // Console Error: You cannot set field before registering it.
  // Intermittent console: Warning: Can't call setState (or forceUpdate) on an unmounted component.
  // REF FOR FIX: https://reactjs.org/blog/2015/12/16/ismounted-antipattern.html
  // To look into optimal solution, if necessary

  async componentDidMount() {
    this._isMounted = true;
    const response = await fetch(URL, {
      credentials: "include"
    });
    if (response.status === 401) {
      // NEED TO FIX THIS PAGE WHEN USER IS NOT LOGGED IN
      console.log("You need to log in");
    } else {
      const userLocationData = await response.json();
      // console.log("UserLocations Data", userLocationData);
      this.setState({
        userLocations: userLocationData
      });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  // Show list of nearby food locations, or show the add new location wizard
  toggleWizardVisibility = () => {
    this.setState({
      isWizardVisible: !this.state.isWizardVisible
    });
  };

  // Called when Google Maps API scripts are loaded and map is ready
  onMapLoaded = (mapProps, map) => {
    this.setState({
      google: window.google,
      googleMap: map
    });

    navigator.geolocation.getCurrentPosition(
      this.onCurrentLocationFetched,
      this.onCurrentLocationFetchFail,
      {
        timeout: 15000,
        enableHighAccuracy: true
      }
    );
  };

  //** Helper Functions **//

  onCurrentLocationFetchFail = err => {
    let errorMessage = err.message;

    if (err.code === 1) {
      errorMessage = ERR_MSG_ENABLE_LOCATION_SERVICES;
    }

    if (err.code === 3) {
      errorMessage = ERR_MSG_TIMEOUT;
    }

    this.notifyError(errorMessage);
    this.fetchSuggestedLocations();
  };

  onCurrentLocationFetched = position => {
    this._isMounted &&
      this.setState({
        userCurrentPostion: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      });
    this.fetchSuggestedLocations();
  };

  notifyError = errorMessage => {
    notification.error({
      message: "Error",
      description: errorMessage
    });
  };

  fetchSuggestedLocations = () => {
    this.reverseGeocodeLocation(this.state.userCurrentPostion);
    this.searchNearbyLocation(
      this.state.googleMap,
      this.state.userCurrentPostion,
      100
    );
  };

  // Given a location (object with lat and long), returns an array of
  // possible geocoded addresses
  reverseGeocodeLocation = location => {
    const geocoder = new this.state.google.maps.Geocoder();
    geocoder.geocode({ location }, (results, status) => {
      this.formatAndAddLocations(results, status, "formatted_address", ",");
    });
  };

  // Given a location and radius in metres, returns an array of
  // google places in the radius vicinity.
  searchNearbyLocation = (googleMap, location, radius) => {
    const service = new this.state.google.maps.places.PlacesService(googleMap);
    let request = { location, radius };

    service.nearbySearch(request, (results, status) => {
      this.formatAndAddLocations(results, status, "vicinity", " ");
    });
  };

  //** Utility Functions **//

  // Takes in an array of location objects, a key value that points to the address
  // value of each location object, and returns an array of locations that which
  // address contains the input separator
  // Addresses that don't contain the input separator are deemed unhelpful/unusable
  getUsableLocations = (locations, addressKey, seperator) => {
    const results = locations.filter(location => {
      const formattedAddress = location[addressKey];
      return formattedAddress.includes(seperator);
    });
    return results;
  };

  getFormattedLocations = (unformattedLocations, addressKey) => {
    return unformattedLocations.map(place => {
      let address = place[addressKey];
      if (place.name) {
        address = `${place.name}, ${place[addressKey]}`;
      }

      return {
        address,
        placeId: place.place_id,
        location: {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        }
      };
    });
  };

  formatAndAddLocations = (locations, status, addressKey, seperator) => {
    if (String(status) !== "OK") return;

    const useableLocations = this.getUsableLocations(
      locations,
      addressKey,
      seperator
    );
    const formattedLocations = this.getFormattedLocations(
      useableLocations,
      addressKey
    );

    this._isMounted &&
      this.setState({
        nearbyLocations: [...this.state.nearbyLocations, ...formattedLocations]
      });
  };

  setSelectedLocation = location => {
    this.setState({
      selectedLocation: location
    });
  };

  render() {
    console.log("Nearby locations state", this.state.nearbyLocations);
    return (
      <div className="main-locations">
        <div id="map-container">
          <GoogleApiWrapper
            userCurrentPostion={this.state.userCurrentPostion}
            onMapLoaded={this.onMapLoaded}
            clickedLocation={this.state.selectedLocation}
            userLocations={this.state.userLocations}
          />
        </div>

        <div id="right-panel-container">
          {this.state.isWizardVisible ? (
            <AddLocationWizard
              isUserLoggedIn={this.props.isUserLoggedIn}
              selectedLocation={this.state.selectedLocation}
              nearbyLocations={this.state.nearbyLocations}
              setSelectedLocation={this.setSelectedLocation}
              cancelWizard={this.toggleWizardVisibility}
            />
          ) : (
              <div>
                <Button
                  type="primary"
                  icon="plus"
                  onClick={this.toggleWizardVisibility}
                >
                  Add New Food Place
              </Button>
                <LocationsList userLocations={this.state.userLocations} />
              </div>
            )}
        </div>
      </div>
    );
  }
}

export default MainLocationsPage;
