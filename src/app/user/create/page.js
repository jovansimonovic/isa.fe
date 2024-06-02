import { post } from "@/core/httpClient";
import { useForm } from "react-hook-form";
import { Row, Col, Button } from "reactstrap";

export default function UserCreate() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
  });

  return (
    <>
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
                await post("/user/create", data);
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
