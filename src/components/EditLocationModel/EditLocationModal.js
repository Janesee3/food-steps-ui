import React from "react";
import { Modal, Form, Input, Card } from "antd";
import LocationForm from '../LocationForm/LocationForm';

const EditLocationModal = Form.create()(
  class extends React.Component {
    handleFormChange = (event) => {
      console.log(event.target.value)
    }

    render() {
      const { visible, closeModal, onUpdate, form, location } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="Edit Food Location"
          okText="Update"
          onCancel={closeModal}
          onOk={onUpdate}
        >
        {location && 
          <LocationForm
          editMode={true}
          selectedLocation={location}
          // resetSelectedLocation={() => this.props.setSelectedLocation(null)}
          // goToLocationSelector={() =>
          //   this.changeWizardStep(WIZARD_STEP_LOCATION)
          // }
          handleChange={this.handleFormChange}
          locationNameInput={location.locationName}
          // goBackToFirstWizardStep={this.props.cancelWizard}
        />}
        </Modal>
      );
    }
  }
);
export default EditLocationModal;
