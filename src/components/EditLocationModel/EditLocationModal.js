import React from "react";
import { Modal, Form, Input, Card } from "antd";
import LocationForm from "../LocationForm/LocationForm";

class EditLocationModal extends React.Component {
  constructor() {
    super();
    this.state = {
      updatedLocationName: undefined
    };
  }
  handleFormChange = event => {
    this.setState({
      updatedLocationName: event.target.value
    });
  };

  render() {
    const { visible, closeModal, onUpdate, location } = this.props;

    return (
      <Modal
        visible={visible}
        title="Edit Food Location"
        okText="Update"
        onCancel={closeModal}
        onOk={()=>onUpdate(this.state.updatedLocationName)} 
      >
        {location && (
          <LocationForm
            editMode={true}
            selectedLocation={location}
            onLocationNameInputChange={this.handleFormChange}
            locationNameInput={location.locationName}
          />
        )}
      </Modal>
    );
  }
}

export default EditLocationModal;
