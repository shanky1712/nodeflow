import { useState } from "react";
import Form from 'react-bootstrap/Form';
const TextWidget = () => {
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
    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
      <Form.Label>Text Message Body</Form.Label>
      <Form.Control
        type="text"
        placeholder="Text Message Body"
        autoFocus
      />
    </Form.Group>
  );
}
export default TextWidget