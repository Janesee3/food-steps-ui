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
			nearbyLocations: []
		};
	}

	componentDidMount() {
		this.setState({
			userLocations: seedData
		});
	}

	// Called when Google Maps API scripts are loaded and map is ready
	onMapLoaded = (mapProps, map) => {
		googleMap = map;
		google = window.google;

		navigator.geolocation.getCurrentPosition(
			this.onCurrentLocationFetched,
			this.onCurrentLocationFetchFail,
			{
				timeout: 10000,
				enableHighAccuracy: true
			}
		);
	};

	//** Helper Functions **//

	onCurrentLocationFetchFail = err => {
		console.log("Cannot get current location: ", err);
	};

	onCurrentLocationFetched = position => {
		console.log("current loc is fetched.");
		this.setState({
			userCurrentPostion: {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			},
			isCurrentLocationFetched: true
		});
		this.reverseGeocodeLocation(this.state.userCurrentPostion);
		this.searchNearbyLocation(this.state.userCurrentPostion, 100);
	};

	// Given a location (object with lat and long), returns an array of
	// possible geocoded addresses
	reverseGeocodeLocation = location => {
		const geocoder = new google.maps.Geocoder();
		geocoder.geocode({ location }, (results, status) => {
			this.formatAndAddLocations(results, status, "formatted_address", ",");
		});
	};

	// Given a location and radius in metres, returns an array of
	// google places in the radius vicinity.
	searchNearbyLocation = (location, radius) => {
		const service = new google.maps.places.PlacesService(googleMap);
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

		this.setState({
			nearbyLocations: [...this.state.nearbyLocations, ...formattedLocations]
		});
	};

	render() {
		console.log("Nearby locations state", this.state.nearbyLocations);
		return (
			<div className="main-locations">
				<div id="map-locations-map">
					<GoogleApiWrapper
						userCurrentPostion={this.state.userCurrentPostion}
						onMapLoaded={this.onMapLoaded}
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
