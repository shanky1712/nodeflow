import { useState } from "react";
import Form from 'react-bootstrap/Form';
const AudioWidget = () => {
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
        <Form.Label>Audio</Form.Label>
        <Form.Control type="file" />
      </Form.Group>
      <div>Or</div>
      <Form.Group className="mb-3" controlId="flow-audio-url">
        <Form.Control
          type="text"
          placeholder="Paste Audio URL"
        />
      </Form.Group>
    </>
  );
}
export default AudioWidget