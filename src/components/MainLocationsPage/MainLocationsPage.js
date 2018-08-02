import React, { Component } from "react";
import LocationsList from "../LocationsList/LocationsList";
import {seedData} from "../UserLocationsPage/seedData"
import GoogleApiWrapper from './Map'

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
      <div className="main-locations">
        <LocationsList userLocations={this.state.userLocations}/>
        <GoogleApiWrapper />
      </div>
    );
  }
}

export default MainLocationsPage;
