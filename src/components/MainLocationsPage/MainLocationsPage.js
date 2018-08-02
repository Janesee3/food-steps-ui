import React, { Component } from "react";
import LocationsList from "../LocationsList/LocationsList";
import {seedData} from "../UserLocationsPage/seedData"

class MainLocationsPage extends Component {
  constructor() {
    super();
    this.state = {
      dummylocations: seedData
  }
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
