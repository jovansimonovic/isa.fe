"use client";

import { useTestActions } from "@/contexts/testContext";
import { post } from "@/core/httpClient";
import testAction from "@/core/testAction";
import { useForm } from "react-hook-form";
import { Row, Col, Button } from "reactstrap";

export default function UserCreate() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
  });

  const { state, dispatch } = useTestActions();

  return (
    <>
      <Row className="mb-2">
        <h5>Email: {state.email}</h5>
        <Button
          type="button"
          className="btn btn-success"
          onClick={() => {
            dispatch({
              type: testAction.CHANGE_EMAIL,
              payload: "nnikolic@gmail.com",
            });
          }}
        >
          Change email
        </Button>
      </Row>
      <Row className="mb-3">
        <h5>First name: {state.firstName}</h5>
        <Button
          type="button"
          className="btn btn-success"
          onClick={() => {
            dispatch({
              type: testAction.CHANGE_FIRST_NAME,
              payload: "Petar",
            });
          }}
        >
          Change first name
        </Button>
      </Row>
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
            placeholder="Phone number"
            {...register("contactNumber", {
              required: "This field is required",
              maxLength: 14,
              minLength: 8,
              validate: (value) => {
                if (!/^[0-9]*$/.test(value)) {
                  return "This field must contain numbers only";
                }
              },
            })}
          />
          {errors && errors.contactNumber && (
            <span className="text-danger">{errors.contactNumber.message}</span>
          )}
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-end">
          <Button
            type="button"
            className="btn btn-primary mb-3 mb-sm-3 mb-md-0"
            onClick={() => {
              handleSubmit(async (data) => {
                await post("/user/create-user-body", data);
              })();
            }}
          >
            Create
          </Button>
        </Col>
      </Row>
    </>
  );
}
