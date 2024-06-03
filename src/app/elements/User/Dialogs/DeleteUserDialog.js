import { useListActions } from "../../../../contexts/listActionContext";
import listAction from "../../../../core/listAction";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { del } from "../../../../core/httpClient";
import { toast } from "react-toastify";

export const DeleteUserDialog = ({ isOpen }) => {
  const { state, dispatch } = useListActions();

  const toggle = () =>
    dispatch({
      type: listAction.RESET,
    });

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>
        Are you sure you want to delete this user?
      </ModalHeader>
      <ModalBody>
        <p>Id: {state.row.id}</p>
        <p>First name: {state.row.firstName}</p>
        <p>Last name: {state.row.lastName}</p>
        <p>Email: {state.row.email}</p>
        <p>Phone number: {state.row.contactNumber}</p>
      </ModalBody>
      <ModalFooter>
        <Button
          type="button"
          className="btn btn-danger"
          onClick={async () => {
            let result = await del(`/user/delete?userId=${state.row.id}`);

            if (result && result.status === 200) {
              toast.success("User successfully deleted");
              dispatch({
                type: listAction.RELOAD,
              });
            }
          }}
        >
          Delete
        </Button>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default DeleteUserDialog;
