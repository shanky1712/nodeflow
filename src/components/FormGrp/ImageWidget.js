import { useState } from "react";
import Form from 'react-bootstrap/Form';
const ImageWidget = () => {
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
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Image</Form.Label>
        <Form.Control type="file" />
      </Form.Group>
      <div>Or</div>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Control
          type="text"
          placeholder="Paste Image URL"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Caption Text</Form.Label>
        <Form.Control
          type="text"
          placeholder="Caption Text"
        />
      </Form.Group>
    </>
  );
}
export default ImageWidget