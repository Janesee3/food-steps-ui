import { Modal, notification } from "antd";

const confirm = Modal.confirm;
const DELETE_SUCCESS_MESSAGE = "Location deleted successfully";
const UPDATE_SUCCESS_MESSAGE = "Location updated successfully";

export const showDeleteModal = (location, onUserConfirmDelete) => {
  confirm({
    title: "Confirm Delete?",
    iconType: "exclamation-circle",
    okText: "Yes",
    okType: "danger",
    cancelText: "No",
    onOk: () => onUserConfirmDelete(location._id)
  });
};

export const notifyDeleteSuccess = () => {
  notification.success({
    message: "Delete Sucess",
    description: DELETE_SUCCESS_MESSAGE
  });
};
export const notifyUpdateSuccess = () => {
  notification.success({
    message: "Update Sucess",
    description: UPDATE_SUCCESS_MESSAGE
  });
};

export const deleteErrorModal = () => {
  Modal.error({
    title: "Unable to delete",
    content: "Please try again or refresh the page!"
  });
};
export const updateErrorModal = () => {
  Modal.error({
    title: "Unable to update",
    content: "Please try again or refresh the page!"
  });
};
