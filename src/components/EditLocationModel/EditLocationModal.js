import React from "react";
import { Modal, Form, Input, Card } from "antd";
import LocationForm from "../LocationForm/LocationForm";

const isDevelopment = process.env.NODE_ENV === "development";

class EditLocationModal extends React.Component {
  constructor() {
    super();
    this.state = {
      updatedLocationName: undefined,
      formRef: undefined
    };
  }

  handleFormChange = event => {
    this.setState({
      updatedLocationName: event.target.value
    });
  };

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }

  onUpdateClicked = () => {
    this.formRef.props.form.validateFieldsAndScroll(this.onValidationCompletion);
  }

  onValidationCompletion = async (err, values) => {
    if (err) return isDevelopment && console.error(err);

    this.props.onUpdate(this.state.updatedLocationName);
  };

  render() {
    const { location } = this.props;

    return (
      <Modal
        visible={this.props.visible}
        title="Edit Food Location"
        okText="Update"
        onCancel={this.props.closeModal}
        onOk={this.onUpdateClicked} 
      >
        {location && (
          <LocationForm
            editMode={true}
            wrappedComponentRef={this.saveFormRef}
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
