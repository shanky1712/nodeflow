import { useState } from "react";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
const LocationWidget = () => {
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
      <Form.Group className="mb-3" controlId="flow-loc-name">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Name"
          autoFocus
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGridAddress1">
        <Form.Label>Address</Form.Label>
        <Form.Control placeholder="1234 Main St" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridAddress2">
        <Form.Label>Address 2</Form.Label>
        <Form.Control placeholder="Apartment, studio, or floor" />
      </Form.Group>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>City</Form.Label>
          <Form.Control />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>State</Form.Label>
          <Form.Select defaultValue="Choose...">
            <option>Choose...</option>
            <option>...</option>
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>Zip</Form.Label>
          <Form.Control />
        </Form.Group>
      </Row>
      <Form.Group className="mb-3" controlId="flow-loc-lat">
        <Form.Label>Latitude</Form.Label>
        <Form.Control
          type="text"
          placeholder="Latitude"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="flow-loc-lng">
        <Form.Label>Longitude</Form.Label>
        <Form.Control
          type="text"
          placeholder="Longitude"
        />
      </Form.Group>
    </>
  );
}
export default LocationWidget