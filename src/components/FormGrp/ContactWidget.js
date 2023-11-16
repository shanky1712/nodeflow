import { useState } from "react";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
const ContactWidget = ({formData, setFormData}) => {

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };


  return (
    <>
      <InputGroup className="mb-3">
        <InputGroup.Text>First, Middle and Last name</InputGroup.Text>
        <Form.Control aria-label="First name"

          name="firstName"
          onChange={handleChange}
          value={formData.firstName || ""}
        />
        <Form.Control aria-label="Middle name"

          name="middleName"
          onChange={handleChange}
          value={formData.middleName || ""}
        />
        <Form.Control aria-label="Last name"

          name="lastName"
          onChange={handleChange}
          value={formData.lastName || ""}
        />
      </InputGroup>
      <Form.Group className="mb-3" controlId="flow-formatted-name">
        <Form.Label>Formatted Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Formatted Name"

          name="formattedName"
          onChange={handleChange}
          value={formData.formattedName || ""}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="flow-contact-number">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
          type="text"
          placeholder="Phone Number"

          name="phoneNo"
          onChange={handleChange}
          value={formData.phoneNo || ""}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="flow-contact-formGridAddress1">
        <Form.Label>Address</Form.Label>
        <Form.Control placeholder="1234 Main St"

          name="addr1"
          onChange={handleChange}
          value={formData.addr1 || ""}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="flow-contact-formGridAddress2">
        <Form.Label>Address 2</Form.Label>
        <Form.Control placeholder="Apartment, studio, or floor"

          name="addr2"
          onChange={handleChange}
          value={formData.addr2 || ""}
        />
      </Form.Group>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="flow-contact-formGridCity">
          <Form.Label>City</Form.Label>
          <Form.Control

            name="city"
            onChange={handleChange}
            value={formData.city || ""}
          />
        </Form.Group>

        {/* <Form.Group as={Col} controlId="flow-contact-formGridState">
          <Form.Label>State</Form.Label>
          <Form.Select defaultValue="Choose...">
            <option>Choose...</option>
            <option>...</option>
          </Form.Select>
        </Form.Group> */}

        <Form.Group as={Col} controlId="flow-contact-formGridZip">
          <Form.Label>Zip</Form.Label>
          <Form.Control

            name="zip"
            onChange={handleChange}
            value={formData.zip || ""}
          />
        </Form.Group>
      </Row>
    </>
  );
}
export default ContactWidget