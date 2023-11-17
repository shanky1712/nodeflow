import { useState } from "react";
import Form from 'react-bootstrap/Form';
const TemplateWidget = ({formData, setFormData}) => {
  // const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  return (
    <>
      <Form.Select aria-label="Default select example" name="template_template" onChange={handleChange}>
        <option>Open this select menu</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </Form.Select>
    </>
  );
}
export default TemplateWidget