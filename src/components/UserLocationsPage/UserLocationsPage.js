import React, { Component } from "react";
import LocationsLists from "../LocationsList/LocationsList";
import EditLocationModal from "../EditLocationModel/EditLocationModal";
import {
  notifyDeleteSuccess,
  deleteErrorModal,
  updateErrorModal,
  notifyUpdateSuccess
} from "../UserLocationsPage/UserLocationsHelper";
import { API_HOST, putToServer } from "../../utils/networkUtils";
// import { seedData } from './seedData'

const URL = `${API_HOST}/locations/user/`;

class UserLocationsPage extends Component {
  constructor() {
    super();
    this.state = {
      userLocations: [],
      isEditModalOpen: false,
      locationCurrentlyEdited: {}
    };
  }

  async componentDidMount() {
    await this.getUserLocations();
  }

  showEditModal = locationCurrentlyEdited => {
    this.setState({
      isEditModalOpen: true,
      locationCurrentlyEdited: locationCurrentlyEdited
    });
  };

  closeModal = () => {
    this.setState({ isEditModalOpen: false });
  };

  onUserUpdate = async (idOfLocationToUpdate, updatedLocationName) => {
    try {
      const locationIdToUpdate = idOfLocationToUpdate;
      const body = { locationName: updatedLocationName };
      const res = await putToServer(URL.concat(locationIdToUpdate), body, true);
      const oldLocationList = this.state.userLocations;

      if (res.ok) {
        const updatedLocation = {
          ...this.state.locationCurrentlyEdited,
          locationName: updatedLocationName
        };

        const indexOfEditedLocation = oldLocationList.indexOf(
          this.state.locationCurrentlyEdited
        );

        const newUserLocations = [
          ...oldLocationList.slice(0, indexOfEditedLocation),
          updatedLocation,
          ...oldLocationList.slice(indexOfEditedLocation + 1)
        ];

        notifyUpdateSuccess();

        this.setState({
          userLocations: newUserLocations
        });

        this.closeModal();
      }
    } catch (error) {
      updateErrorModal();
    }
  };

  onUserConfirmDelete = async locationId => {
    try {
      const res = await fetch(URL.concat(locationId), {
        credentials: "include",
        method: "DELETE"
      });
      if (res.ok) {
        const newData = this.state.userLocations.filter(location => {
          return locationId !== location._id;
        });
        notifyDeleteSuccess();
        this.setState({
          userLocations: newData
        });
      }
    } catch (error) {
      deleteErrorModal();
    }
  };

  getUserLocations = async () => {
    const response = await fetch(`${API_HOST}/locations/user/`, {
      credentials: "include"
    });
    if (response.ok) {
      const userLocationData = await response.json();
      this.setState({
        userLocations: userLocationData
      });
      return;
    }
  };

  render() {
    return (
      <div>
        <LocationsLists
          userLocations={this.state.userLocations}
          detailed={true}
          showDeleteModal={this.showDeleteModal}
          onUserConfirmDelete={this.onUserConfirmDelete}
          showEditModal={this.showEditModal}
          closeModal={this.closeModal}
        />
        <EditLocationModal
          visible={this.state.isEditModalOpen}
          closeModal={this.closeModal}
          onUpdate={this.onUserUpdate}
          location={this.state.locationCurrentlyEdited}
        />
      </div>
    );
  }
}

export default UserLocationsPage;
