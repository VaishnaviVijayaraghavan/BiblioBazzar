import { Modal, Button, Form, Container, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

import React from "react";

function Editprofile(props) {
  let { register, handleSubmit, setValue } = useForm();
  useEffect(() => {
    setValue("name", props.profileObj.name);
    setValue("phoneno", props.profileObj.phoneno);
    setValue("location", props.profileObj.location);
  }, []);

  return (
    <div>
      <Modal {...props} centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit the Profile
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid">
          <Container>
            <Form
              className="w-100 mx-auto"
              onSubmit={handleSubmit(props.onHide)}
            >
              <Row>
                <Col xs={11}>
                  <Form.Group className="mb-3" controlId="formBasicname">
                    <Form.Label>Edit Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Name"
                      {...register("name")}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col xs={11}>
                  <Form.Group className="mb-3" controlId="formBasicphoneno">
                    <Form.Label>Edit Phone No</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Edit Phone No"
                      {...register("phoneno")}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col xs={11}>
                  <Form.Group className="mb-3" controlId="formBasiclocation">
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Location"
                      {...register("location")}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Button type="submit">Save</Button>
            </Form>
          </Container>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default React.memo(Editprofile);
