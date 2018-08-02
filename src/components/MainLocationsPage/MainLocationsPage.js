import React, { Component } from "react";
import LocationsList from "../LocationsList/LocationsList";
import {seedData} from "../UserLocationsPage/seedData"

class MainLocationsPage extends Component {
  constructor() {
    super();
    this.state = {
      userLocations: []
  }
}
 async componentDidMount() {
   this.setState({
     userLocations: seedData
   })
 }

  render() {
    return (
      <div>
        <LocationsList userLocations={this.state.userLocations}/>
      </div>
    );
  }
}

export default MainLocationsPage;
