import React from 'react';
import { Modal, Form, Input,Card } from "antd";

const EditLocationModal = Form.create()(
  class extends React.Component {
    render() {
      const { visible, closeModal, onUpdate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="Update Food Location"
          okText="Update"
          onCancel={closeModal}
          onOk={onUpdate}
        >
          <Form layout="vertical" onSubmit={this.handleSubmit}>
            <Form.Item label="Food Place Name">
              {getFieldDecorator("locationName", {
                rules: [
                  {
                    required: true,
                    message: "Please give this food place a name!",
                    whitespace: true
                  }
                ],
                initialValue: this.props.locationNameInput
              })(<Input onChange={event => this.props.handleChange(event)} />)}
            </Form.Item>

            <Form.Item id="address" label="Address">
              {getFieldDecorator("address", {
                rules: [
                  {
                    required: true,
                    message: "Please select an address!"
                  }
                ]
              })(
                <Card
                  className="address-card"
                  onClick={this.props.goToLocationSelector}
                >
                  {this.props.selectedLocation ? (
                    <p>{this.props.selectedLocation.address}</p>
                  ) : (
                    <p className="address-placeholder">Select address</p>
                  )}
                </Card>
              )}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  }
);
export default EditLocationModal;
