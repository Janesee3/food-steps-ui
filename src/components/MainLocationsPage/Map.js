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
    const { google } = this.props
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

          {this.props.userLocations ? this.props.userLocations.map((place, index) => {
            // Renders user saved locations, need to have them within the radius somehow...
           return <Marker
              key={index}
              position={{
                lat: place.globalLocation.lat,
                lng: place.globalLocation.lng
              }}
              onClick={this.onMarkerClick}
              name={place.locationName}
              icon={{
                url: 'https://cdn.iconscout.com/public/images/icon/premium/png-512/food-point-restaurant-location-navigation-system-court-dining-35adf1e9b6b084fb-512x512.png',
                origin: new google.maps.Point(0, 0),
                scaledSize: new google.maps.Size(30, 30)
              }}
              />
          }) : null}

          {this.props.clickedLocation ?
            <Marker
              position={{
                lat: this.props.clickedLocation.location.lat,
                lng: this.props.clickedLocation.location.lng
              }}
              onClick={this.onMarkerClick}
              name={this.props.clickedLocation.address}
              icon={{
                url: 'https://cdn2.iconfinder.com/data/icons/webstore/512/map_marker-512.png',
                origin: new google.maps.Point(0, 0),
                scaledSize: new google.maps.Size(32, 32)
              }}
            />
            : null}

          {this.props.clickedLocation ?
            <InfoWindow
              onClose={this.onInfoWindowClose}
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
            >
              <div>
                <p>{this.props.clickedLocation.address}</p>
              </div>
            </InfoWindow>
            : null}


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
