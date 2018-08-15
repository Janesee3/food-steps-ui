import { Modal, notification } from "antd";

const confirm = Modal.confirm;
const DELETE_SUCCESS_MESSAGE = "Location deleted successfully";

export const showDeleteModal = (foodPlacesListIndex, onUserConfirmDelete )=> {
    confirm({
      title: "Confirm Delete?",
      iconType: "exclamation-circle",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => onUserConfirmDelete(foodPlacesListIndex)
    });
  };

  export const notifyDeleteSuccess = () => {
    notification.success({
      message: 'Delete Sucess',
      description: DELETE_SUCCESS_MESSAGE,
    });
  }

 export const deleteErrorModal = () => {
    Modal.error({
      title: 'Unable to delete',
      content: 'Please try again or refresh the page!',
    });
  }

