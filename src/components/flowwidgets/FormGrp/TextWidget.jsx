import { useState } from "react";
import Form from 'react-bootstrap/Form';
import Figure from 'react-bootstrap/Figure';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const TextWidget = ({formData, setFormData}) => {

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Available Variables</Popover.Header>
      <Popover.Body>
      <div>name</div>
        <div>first name</div>
        <div>last name</div>
        <div>phone</div>
      </Popover.Body>
    </Popover>
  );
  return (
    <Container>
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="flow-text">
            <Form.Label>
              Text Message Body &nbsp;
              <OverlayTrigger trigger="click" placement="right" overlay={popover}>
                <FontAwesomeIcon icon="fa-solid fa-circle-info" />
              </OverlayTrigger>
            </Form.Label>
            <Form.Control
              required
              type="text"
              name="text_bodyTxt"
              placeholder="Text Message Body"
              onChange={handleChange}
              value={formData.text_bodyTxt || ""}
              autoFocus
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">This is required Field</Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col className="border-start">
          <Figure className="mb-0 text-center">
            <Figure.Image className="col-md-8 mb-3" width="98%" height={180} alt="wa_headerimg" src="../../../../../assets/text.png" />
          </Figure>
        </Col>
      </Row>
    </Container>
  );
}
export default TextWidget
