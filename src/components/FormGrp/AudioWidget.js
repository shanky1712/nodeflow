import { useState } from "react";
import Form from 'react-bootstrap/Form';
const AudioWidget = () => {
  let formStateData = {
    file: '',
    audioUrl: '',
  };
  const [formData, setFormData] = useState(formStateData);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
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

          name="audioUrl"
          onChange={handleChange}
          value={formData.audioUrl || ""}
        />
      </Form.Group>
    </>
  );
}
export default AudioWidget