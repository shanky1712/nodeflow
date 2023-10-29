import { useState } from "react";
import Form from 'react-bootstrap/Form';
const TextWidget = () => {
  let formStateData = {
    bodyTxt: '',
  };
  const [formData, setFormData] = useState(formStateData);

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
        type="text"
        name="bodyTxt"

        placeholder="Text Message Body"
        onChange={handleChange}
        value={formData.bodyTxt || ""}
        autoFocus
      />
    </Form.Group>
  );
}
export default TextWidget