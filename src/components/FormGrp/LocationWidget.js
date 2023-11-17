import { useState } from "react";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
const LocationWidget = ({formData, setFormData}) => {
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  return (
    <>
      <Form.Group className="mb-3" controlId="flow-loc-name">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Name"
          name="loc_name"
          onChange={handleChange}
          value={formData.loc_name || ""}
          autoFocus
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGridAddress1">
        <Form.Label>Address</Form.Label>
        <Form.Control
          placeholder="1234 Main St"
          name="loc_addr1"
          onChange={handleChange}
          value={formData.loc_addr1 || ""}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridAddress2">
        <Form.Label>Address 2</Form.Label>
        <Form.Control
          placeholder="Apartment, studio, or floor"
          name="loc_addr2"
          onChange={handleChange}
          value={formData.loc_addr2 || ""}
        />
      </Form.Group>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>City</Form.Label>
          <Form.Control
            name="loc_city"
            onChange={handleChange}
            value={formData.loc_city || ""}
          />
        </Form.Group>

        {/* <Form.Group as={Col} controlId="formGridState">
          <Form.Label>State</Form.Label>
          <Form.Select defaultValue="Choose...">
            <option>Choose...</option>
            <option>...</option>
          </Form.Select>
        </Form.Group> */}

        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>Zip</Form.Label>
          <Form.Control
            name="loc_zip"
            onChange={handleChange}
            value={formData.loc_zip || ""}
          />
        </Form.Group>
      </Row>
      <Form.Group className="mb-3" controlId="flow-loc-lat">
        <Form.Label>Latitude</Form.Label>
        <Form.Control
          type="text"
          placeholder="Latitude"
          name="loc_lat"
          onChange={handleChange}
          value={formData.loc_lat || ""}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="flow-loc-lng">
        <Form.Label>Longitude</Form.Label>
        <Form.Control
          type="text"
          placeholder="Longitude"
          name="loc_lng"
          onChange={handleChange}
          value={formData.loc_lng || ""}
        />
      </Form.Group>
    </>
  );
}
export default LocationWidget