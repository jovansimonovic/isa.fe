import { useListActions } from "@/contexts/listActionContext";
import listAction from "@/core/listAction";
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
import { post } from "@/core/httpClient";
import { useEffect } from "react";

export const UpdateUserDialog = ({ isOpen }) => {
  const { state, dispatch } = useListActions();

  const toggle = () =>
    dispatch({
      type: listAction.RESET,
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    mode: "onSubmit",
    defaultValues: state.row,
  });

  useEffect(() => {
    setValue("id", state.row.id);
    setValue("firstName", state.row.firstName);
    setValue("lastName", state.row.lastName);
    setValue("email", state.row.email);
    setValue("contactNumber", state.row.contactNumber);
  }, [state]);

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Modal title</ModalHeader>
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
              await post("/user/update", data);

              dispatch({
                type: listAction.RELOAD,
              });
            })();
          }}
        >
          Update
        </Button>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default UpdateUserDialog;
