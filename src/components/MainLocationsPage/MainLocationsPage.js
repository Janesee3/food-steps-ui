import React, { Component } from "react";
import LocationsList from "../LocationsList/LocationsList";

import { API_HOST } from "../../utils/networkUtils";
import { Button } from "antd";
import GoogleApiWrapper from "./Map";
import "./MainLocationsPage.css";
import AddLocationWizard from "../AddLocationWizard/AddLocationWizard";
import InfiniteScroll from "react-infinite-scroller";
import { notifyError } from "../../utils/notificationManager";

const ERR_MSG_ENABLE_LOCATION_SERVICES =
	"Please enable location services on your browser!";
const ERR_MSG_TIMEOUT =
	"Cannot fetch current location. Please refresh page to try again!";

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
			mapCenter: {
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
		await this.getUserLocations();
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	//** Helper Functions **//

	getUserLocations = async () => {
		const response = await fetch(`${API_HOST}/locations/user/`, {
			credentials: "include"
		});

		if (response.ok) {
			const userLocationData = await response.json();
			this.setState({
				userLocations: userLocationData
			});
			return;
		}
	};

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

	onCurrentLocationFetchFail = err => {
		let errorMessage = err.message;

		if (err.code === 1) {
			errorMessage = ERR_MSG_ENABLE_LOCATION_SERVICES;
		}

		if (err.code === 3) {
			errorMessage = ERR_MSG_TIMEOUT;
		}

		notifyError(errorMessage);
		this.fetchSuggestedLocations();
	};

	onCurrentLocationFetched = position => {
		this._isMounted &&
			this.setState({
				userCurrentPostion: {
					lat: position.coords.latitude,
					lng: position.coords.longitude
				},
				mapCenter: {
					lat: position.coords.latitude,
					lng: position.coords.longitude
				}
			});
		this.fetchSuggestedLocations();
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

	setSelectedLocation = location => {
		this.setState({
			selectedLocation: location
		});
	};

	setMapCenter = location => {
		this.setState({
			mapCenter: {
				lat: location.location.lat,
				lng: location.location.lng
			}
		});
	};

	resetMapCenter = () => {
		this.setState({
			mapCenter: this.state.userCurrentPostion
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

	render() {
		return (
			<div className="main-locations">
				<div id="map-container">
					<GoogleApiWrapper
						userCurrentPostion={this.state.userCurrentPostion}
						mapCenter={this.state.mapCenter}
						onMapLoaded={this.onMapLoaded}
						userSelectedLocation={this.state.selectedLocation}
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
							setMapCenter={this.setMapCenter}
							resetMapCenter={this.resetMapCenter}
							cancelWizard={this.toggleWizardVisibility}
							refreshUserLocationsList={this.getUserLocations}
							google={this.state.google}
						/>
					) : (
						<div>
							<div className="add-new-loc-btn-wrapper">
								<Button
									type="primary"
									icon="plus"
									onClick={this.toggleWizardVisibility}
								>
									Add New Food Place
								</Button>
							</div>

							<div className="locations-list-wrapper">
								<InfiniteScroll
									initialLoad={false}
									pageStart={0}
									useWindow={false}
									loadMore={() => {}}
								>
									<LocationsList userLocations={this.state.userLocations} />
								</InfiniteScroll>
							</div>
						</div>
					)}
				</div>
			</div>
		);
	}
}

export default MainLocationsPage;
