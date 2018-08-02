import React, { Component } from "react";
import LocationsList from "../LocationsList/LocationsList";

class MainLocationsPage extends Component {
  constructor() {
    super();
    this.state = {
      dummylocations: [
        { lat: 1, lng: 1, placename: "Place 1" },
        { lat: 2, lng: 2, placename: "Place 2" },
        { lat: 3, lng: 3, placename: "Place 3" },
        { lat: 4, lng: 4, placename: "Place 4" }
      ]
    };
  }

  render() {
    return (
      <div>
        Hello from Locations Router
        <LocationsList locations={this.state.dummylocations}/>
      </div>
    );
  }
}

export default MainLocationsPage;
