import { useState } from "react";
import Form from 'react-bootstrap/Form';
const DocWidget = () => {
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
        <Form.Label>Document</Form.Label>
        <Form.Control type="file" />
      </Form.Group>
      <div>Or</div>
      <Form.Group className="mb-3" controlId="flow-doc-url">
        <Form.Control
          type="text"
          placeholder="Paste Document URL"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="flow-doc-file-name">
        <Form.Label>File name</Form.Label>
        <Form.Control
          type="text"
          placeholder="File name"
        />
      </Form.Group>
    </>
  );
}
export default DocWidget