import { useListActions } from "../../../../contexts/listActionContext";
import listAction from "../../../../core/listAction";
import {
  Button,
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import { useForm } from "react-hook-form";
import { post } from "../../../../core/httpClient";
import { toast } from "react-toastify";

export const CreateUserDialog = ({ isOpen }) => {
  const { dispatch } = useListActions();

  const toggle = () =>
    dispatch({
      type: listAction.RESET,
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
  });

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Create user</ModalHeader>
      <ModalBody>
        <Row className="mb-3 ">
          <Col md={6}>
            <input
              type="text"
              className="form-control mb-3 mb-sm-3 mb-md-0"
              placeholder="First name"
              {...register("firstName", {
                required: "This field is required",
                maxLength: 50,
                minLength: 3,
              })}
            />
            {errors && errors.firstName && (
              <span className="text-danger">{errors.firstName.message}</span>
            )}
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              placeholder="Last name"
              {...register("lastName", {
                required: "This field is required",
                maxLength: 50,
                minLength: 3,
              })}
            />
            {errors && errors.lastName && (
              <span className="text-danger">{errors.lastName.message}</span>
            )}
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              {...register("email", {
                required: "This field is required",
              })}
            />
            {errors && errors.email && (
              <span className="text-danger">{errors.email.message}</span>
            )}
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              {...register("password", { required: "This field is required" })}
            />
            {errors && errors.password && (
              <span className="text-danger">{errors.password.message}</span>
            )}
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <input
              type="text"
              className="form-control"
              placeholder="Contact number"
              {...register("contactNumber", {
                required: "This field is required",
                maxLength: 14,
                minLength: 9,
                validate: (value) => {
                  if (!/^[0-9]*$/.test(value)) {
                    return "This field must contain numbers only";
                  }
                },
              })}
            />
            {errors && errors.contactNumber && (
              <span className="text-danger">
                {errors.contactNumber.message}
              </span>
            )}
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter>
        <Button
          type="button"
          className="btn btn-success"
          onClick={() => {
            handleSubmit(async (data) => {
              let result = await post("/user/create", data);

              if (result && result.status === 200) {
                toast.success("User successfully created");
                dispatch({
                  type: listAction.RELOAD,
                });
              }
            })();
          }}
        >
          Create
        </Button>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default CreateUserDialog;
