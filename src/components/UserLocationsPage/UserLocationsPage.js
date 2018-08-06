import React, { Component } from "react";
import LocationsLists from "../LocationsList/LocationsList";
import { API_HOST } from "../../utils/networkUtils";
// import { seedData } from './seedData'

const URL = `${API_HOST}/locations/user/`;
// const URL2 = "https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo"

class UserLocationsPage extends Component {
  constructor() {
    super();
    this.state = {
      userLocations: []
    };
  }

  async componentDidMount() {
    const response = await fetch(URL, {
      credentials: "include"
    });
    if (response.status === 401) {
      // NEED TO FIX THIS PAGE WHEN USER IS NOT LOGGED IN
      console.log("You need to log in");
    } else {
      const userLocationData = await response.json();
      console.log("UserLocations Data", userLocationData);
      this.setState({
        userLocations: userLocationData
      });
    }
  }

  render() {
    // console.log("saifhaif", this.state.userLocations)
    return (
      <div>
        <LocationsLists
          userLocations={this.state.userLocations}
          detailed={true}
        />
      </div>
    );
  }
}

export default UserLocationsPage;
