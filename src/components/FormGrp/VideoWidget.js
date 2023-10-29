import { useState } from "react";
import Form from 'react-bootstrap/Form';
const VideoWidget = () => {
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
        <Form.Label>Video</Form.Label>
        <Form.Control type="file" />
      </Form.Group>
      <div>Or</div>
      <Form.Group className="mb-3" controlId="flow-video-url">
        <Form.Control
          type="text"
          placeholder="Paste Video URL"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="flow-video-caption">
        <Form.Label>Caption Text</Form.Label>
        <Form.Control
          type="text"
          placeholder="Caption Text"
        />
      </Form.Group>
    </>
  );
}
export default VideoWidget