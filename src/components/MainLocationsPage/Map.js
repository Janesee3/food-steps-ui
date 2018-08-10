import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

export class MapContainer extends Component {
  constructor() {
    super();
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    };
  }

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  };

  render() {
    return (
      <div className="map">
        <Map
          google={this.props.google}
          zoom={14}
          center={{
            lat: this.props.userCurrentPostion.lat,
            lng: this.props.userCurrentPostion.lng
          }}
          onReady={this.props.onMapLoaded}
        >
          <Marker
            position={{
              lat: this.props.userCurrentPostion.lat,
              lng: this.props.userCurrentPostion.lng
            }}
            onClick={this.onMarkerClick}
            name={"You are here!"}
          />

          <InfoWindow
            onClose={this.onInfoWindowClose}
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
          >
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
          </InfoWindow>

          {/* {this.props.clickedLocation &&

            <div>
              <Marker
                position={{
                  lat: this.props.clickedLocation.location.lat,
                  lng: this.props.clickedLocation.location.lng
                }}
                onClick={this.onMarkerClick}
                name={this.props.clickedLocation.address}
              />

              <InfoWindow
                onClose={this.onInfoWindowClose}
                marker={this.state.activeMarker}
                visible={this.state.showingInfoWindow}
              >
                <div>
                  <h1>{this.props.clickedLocation.address}</h1>
                </div>
              </InfoWindow>
            </div>

          } */}



        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyB-SJBDlRznL_G2-_nNZ9czAj7zPTGYNZ0",
  v: "3.30"
})(MapContainer);
