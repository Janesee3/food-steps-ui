import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

export class MapContainer extends Component {
	constructor() {
		super();
		this.state = {
			isInfoWindowVisible: false,
			activeMarker: {} // Marker that is being clicked
		};
	}

	onMarkerClick = (props, marker, event) => {
		this.setState({
			activeMarker: marker,
			isInfoWindowVisible: true
		});
	};

	render() {
		const { google } = this.props;
		return (
			<div className="map">
				<Map
					google={this.props.google}
					zoom={17}
					center={{
						lat: this.props.mapCenter.lat,
						lng: this.props.mapCenter.lng
					}}
					onReady={this.props.onMapLoaded}
				>
					{/* Current Location Marker */}
					<Marker
						position={{
							lat: this.props.userCurrentPostion.lat,
							lng: this.props.userCurrentPostion.lng
						}}
						onClick={this.onMarkerClick}
						name={"You are here"}
					/>

					{/* User Location Marker  (BLACK)*/}
					{this.props.userLocations
						? this.props.userLocations.map((place, index) => {
								// Renders user saved locations, need to have them within the radius somehow...
								return (
									<Marker
										key={index}
										position={{
											lat: place.globalLocation.lat,
											lng: place.globalLocation.lng
										}}
										onClick={this.onMarkerClick}
										name={place.locationName}
										icon={{
											url:
												"https://cdn.iconscout.com/public/images/icon/premium/png-512/food-point-restaurant-location-navigation-system-court-dining-35adf1e9b6b084fb-512x512.png",
											origin: new google.maps.Point(0, 0),
											scaledSize: new google.maps.Size(32, 32)
										}}
									/>
								);
						  })
						: null}

					{/* Selected Location Marker (BLUE)*/}
					{this.props.userSelectedLocation ? (
						<Marker
							position={{
								lat: this.props.userSelectedLocation.location.lat,
								lng: this.props.userSelectedLocation.location.lng
							}}
							onClick={this.onMarkerClick}
							name={this.props.userSelectedLocation.address}
							icon={{
								url:
									"https://cdn2.iconfinder.com/data/icons/webstore/512/map_marker-512.png",
								origin: new google.maps.Point(0, 0),
								scaledSize: new google.maps.Size(32, 32)
							}}
						/>
					) : null}

					<InfoWindow
						onClose={this.onInfoWindowClose}
						marker={this.state.activeMarker}
						visible={this.state.isInfoWindowVisible}
					>
						<div>
							<span>{this.state.activeMarker.name}</span>
						</div>
					</InfoWindow>
				</Map>
			</div>
		);
	}
}

export default GoogleApiWrapper({
	apiKey: "AIzaSyB-SJBDlRznL_G2-_nNZ9czAj7zPTGYNZ0",
	v: "3.30"
})(MapContainer);
