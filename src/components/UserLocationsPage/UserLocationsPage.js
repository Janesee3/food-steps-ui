import React, { Component } from "react";
import LocationsLists from "../LocationsList/LocationsList";
import { API_HOST } from "../../utils/networkUtils";
import { Modal, notification } from "antd";
// import { seedData } from './seedData'

const confirm = Modal.confirm;
const URL = `${API_HOST}/locations/user/`;
const DELETE_SUCCESS_MESSAGE = "Location deleted successfully";

class UserLocationsPage extends Component {
  constructor() {
    super();
    this.state = {
      userLocations: []
    };
  }

notifyDeleteSuccess = () => {
  notification.success({
    message: 'Delete Sucess',
    description: DELETE_SUCCESS_MESSAGE,
  });
}

  showDeleteModal = foodPlacesListIndex => {
    confirm({
      title: "Confirm Delete?",
      iconType: "exclamation-circle",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => this.onUserConfirmDelete(foodPlacesListIndex)
    });
  };

  
  async onUserConfirmDelete(foodPlacesListIndex) {
    const locationId = this.state.userLocations[foodPlacesListIndex]._id;
    try {
      const res = await fetch(URL.concat(locationId), {
        credentials: "include",
        method: "DELETE"
      });
      if (res.ok) {
        const newData = this.state.userLocations.filter((location, index) => {
          return index !== foodPlacesListIndex
        })
        this.notifyDeleteSuccess()
        this.setState({
          userLocations: newData
        });
      }
    } catch (error) {
      this.deleteErrorModal()
    }
  }
  
  deleteErrorModal = () => {
    Modal.error({
      title: 'Unable to delete',
      content: 'Please try again or refresh the page!',
    });
  }
  
  async componentDidMount() {
    if (this.isLoggedIn) {
      // fetch data
    } else {
      // dont do anything
    }

    const response = await fetch(URL, {
      credentials: "include"
    });
    if (response.status === 401) {
      // NEED TO FIX THIS PAGE WHEN USER IS NOT LOGGED IN
      console.log("You need to log in");
    } else {
      const userLocationData = await response.json();
      // console.log("UserLocations Data", userLocationData);
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
          showDeleteModal={this.showDeleteModal}
        />
      </div>
    );
  }
}

export default UserLocationsPage;
