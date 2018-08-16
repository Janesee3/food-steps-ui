import React, { Component } from "react";
import LocationsLists from "../LocationsList/LocationsList";
import EditLocationModal from "../EditLocationModel/EditLocationModal";
import {
  notifyDeleteSuccess,
  deleteErrorModal
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
      editIndex: undefined
    };
  }

  async componentDidMount() {
    await this.getUserLocations();
  }

  showEditModal = editIndex => {
    // console.log("EDIT INDEX in PAGE", editIndex);
    this.setState({
      isEditModalOpen: true,
      editIndex: editIndex
    });
  };

  closeModal = () => {
    this.setState({ isEditModalOpen: false });
  };

  onUserUpdate = async updatedLocationName => {
    try {
      const locationIdToUpdate = this.state.userLocations[this.state.editIndex]
        ._id;
      const body = { locationName: updatedLocationName };
      const res = await putToServer(URL.concat(locationIdToUpdate), body, true);
      console.log(res.status);
    } catch (error) {
      console.log(error);
    }
  };

  onUserConfirmDelete = async foodPlacesListIndex => {
    // console.log("DELETE INDEX in PAGE", foodPlacesListIndex);
    const locationId = this.state.userLocations[foodPlacesListIndex]._id;
    try {
      const res = await fetch(URL.concat(locationId), {
        credentials: "include",
        method: "DELETE"
      });
      if (res.ok) {
        const newData = this.state.userLocations.filter((location, index) => {
          return index !== foodPlacesListIndex;
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
          location={this.state.userLocations[this.state.editIndex]}
        />
      </div>
    );
  }
}

export default UserLocationsPage;
