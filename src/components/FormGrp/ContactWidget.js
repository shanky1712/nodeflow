import { useState } from "react";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
const ContactWidget = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // alert(`Name: ${formData.name}, Email: ${formData.email}, Message: ${formData.message}`);
  };

  return (
    <>
      <InputGroup className="mb-3">
        <InputGroup.Text>First, Middle and Last name</InputGroup.Text>
        <Form.Control aria-label="First name" />
        <Form.Control aria-label="Middle name" />
        <Form.Control aria-label="Last name" />
      </InputGroup>
      <Form.Group className="mb-3" controlId="flow-formatted-name">
        <Form.Label>Formatted Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Formatted Name"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="flow-contact-number">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
          type="text"
          placeholder="Phone Number"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="flow-contact-formGridAddress1">
        <Form.Label>Address</Form.Label>
        <Form.Control placeholder="1234 Main St" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="flow-contact-formGridAddress2">
        <Form.Label>Address 2</Form.Label>
        <Form.Control placeholder="Apartment, studio, or floor" />
      </Form.Group>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="flow-contact-formGridCity">
          <Form.Label>City</Form.Label>
          <Form.Control />
        </Form.Group>

        <Form.Group as={Col} controlId="flow-contact-formGridState">
          <Form.Label>State</Form.Label>
          <Form.Select defaultValue="Choose...">
            <option>Choose...</option>
            <option>...</option>
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} controlId="flow-contact-formGridZip">
          <Form.Label>Zip</Form.Label>
          <Form.Control />
        </Form.Group>
      </Row>
    </>
  );
}
export default ContactWidget