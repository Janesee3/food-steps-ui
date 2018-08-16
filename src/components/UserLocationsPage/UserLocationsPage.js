import React, { Component } from "react";
import LocationsLists from "../LocationsList/LocationsList";
import { API_HOST } from "../../utils/networkUtils";
import { Modal, notification, Form, Input } from "antd";
import {
  notifyDeleteSuccess,
  deleteErrorModal
} from "../UserLocationsPage/UserLocationsHelper";
import EditLocationModal from "../EditLocationModel/EditLocationModal";
// import { seedData } from './seedData'
const confirm = Modal.confirm;
const FormItem = Form.Item;

const URL = `${API_HOST}/locations/user/`;

class UserLocationsPage extends Component {
  constructor() {
    super();
    this.state = {
      userLocations: [],
      isEditModalOpen: false, //to render modal
      editIndex: undefined
    };
  }

  showEditModal = editIndex => {
    this.setState({
      isEditModalOpen: true,
      editIndex: editIndex
    });
  };

  closeModal = () => {
    this.setState({ isEditModalOpen: false });
  };

  onUserUpdate = () => {
    console.log("Hello");
  };

  onUserConfirmDelete = async foodPlacesListIndex => {
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
          onUserConfirmDelete={this.onUserConfirmDelete}
          showEditModal={this.showEditModal}
          closeModal={this.closeModal}
        />
        {/* {this.state.editIndex && ( */}
          <EditLocationModal
            visible={this.state.isEditModalOpen}
            closeModal={this.closeModal}
            onUpdate={this.onUserUpdate}
            location={this.state.userLocations[this.state.editIndex]}
          />
        {/* )} */}
      </div>
    );
  }
}

export default UserLocationsPage;
