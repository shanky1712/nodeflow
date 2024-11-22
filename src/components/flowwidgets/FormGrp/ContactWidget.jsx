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

  // const updatePerson = event => {
  //   const { name, value } = event
  //   if (name === "name" || name === "age") {
  //     setPerson(prevPerson => {
  //       return { ...prevPerson, [name]: value }
  //     })
  //   }
  //   if (name === "street" || name === "city") {
  //     setPerson(prevPerson => {
  //       const newPerson = { ...prevPerson }
  //       newPerson.address[name] = value
  //       return newPerson
  //     })
  //   }
  //   if (name === "state" || name === "zip") {
  //     setPerson(prevPerson => {
  //       const newPerson = { ...prevPerson }
  //       newPerson.address.stateZip[name] = value
  //       return newPerson
  //     })
  //   }
  // }
  return (
    <>
      <InputGroup className="mb-3">
        <InputGroup.Text>First, Middle and Last name</InputGroup.Text>
        <Form.Control aria-label="First name"
          name="contact_firstName"
          onChange={handleChange}
          value={formData.contact_firstName || ""}
        />
        <Form.Control aria-label="Middle name"
          name="contact_middleName"
          onChange={handleChange}
          value={formData.contact_middleName || ""}
        />
        <Form.Control aria-label="Last name"
          name="contact_lastName"
          onChange={handleChange}
          value={formData.contact_lastName || ""}
        />
      </InputGroup>
      <Form.Group className="mb-3" controlId="flow-formatted-name">
        <Form.Label>Formatted Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Formatted Name"
          name="contact_formattedName"
          onChange={handleChange}
          value={formData.contact_formattedName || ""}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="flow-contact-number">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Phone Number"
          name="contact_phoneNo"
          onChange={handleChange}
          value={formData.contact_phoneNo || ""}
        />
        <Form.Control.Feedback type="invalid">This is required Field</Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="flow-contact-formGridAddress1">
        <Form.Label>Address</Form.Label>
        <Form.Control placeholder="1234 Main St"
          name="contact_addr1"
          onChange={handleChange}
          value={formData.contact_addr1 || ""}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="flow-contact-formGridAddress2">
        <Form.Label>Address 2</Form.Label>
        <Form.Control placeholder="Apartment, studio, or floor"
          name="contact_addr1"
          onChange={handleChange}
          value={formData.contact_addr1 || ""}
        />
      </Form.Group>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="flow-contact-formGridCity">
          <Form.Label>City</Form.Label>
          <Form.Control
            name="contact_city"
            onChange={handleChange}
            value={formData.contact_city || ""}
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
            name="contact_zip"
            onChange={handleChange}
            value={formData.contact_zip || ""}
          />
        </Form.Group>
      </Row>
    </>
  );
}
export default ContactWidget
