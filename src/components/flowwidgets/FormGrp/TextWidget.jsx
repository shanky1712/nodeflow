import { useState } from "react";
import Form from 'react-bootstrap/Form';
const TextWidget = ({formData, setFormData}) => {

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  // console.log('formdata')
  // console.log(formData)
  return (
    <Form.Group className="mb-3" controlId="flow-text">
      <Form.Label>Text Message Body</Form.Label>
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
  );
}
export default TextWidget
