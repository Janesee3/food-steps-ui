import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      userCurrentPostion: { lat: 1.35, lng: 103.82 },
      mapZoom: 2
    };
  }
  onMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }
  

  render() {
    if (!this.props.google) {
      return <div>Loading...</div>;
    }

    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        userCurrentPostion: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        },
        mapZoom: 14
      });
    });

    return (
      <div className="map">
        <Map
          style={{}}
          google={this.props.google}
          center={{
            lat: this.state.userCurrentPostion.lat,
            lng: this.state.userCurrentPostion.lng
          }}
          onReady={this.props.fetchPlaces}
          zoom={this.state.mapZoom}
        >
          <Marker
            onClick={this.onMarkerClick}
            // icon={{
            //   url: "/img/icon.svg",
            //   anchor: new google.maps.Point(32, 32),
            //   scaledSize: new google.maps.Size(64, 64)
            // }}
            position={{
              lat: this.state.userCurrentPostion.lat,
              lng: this.state.userCurrentPostion.lng
            }}
            name={"You are here!"}
          />
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
          >
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
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
