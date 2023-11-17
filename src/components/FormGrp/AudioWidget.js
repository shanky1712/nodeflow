import { useState, useRef } from "react";
import Form from 'react-bootstrap/Form';
const AudioWidget = ({formData, setFormData}) => {
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  const inputRef = useRef();
  const [source, setSource] = useState();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    setSource(url);
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ 
      ...prevFormData, 
      [name]: value,
      ['audio']: url, 
      ['audioData']: file,
    }));  
  };
  return (
    <>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Audio</Form.Label>
        <Form.Control 
          type="file" 
          name="audio_audio"
          ref={inputRef}
          onChange={handleFileChange}
          accept=".mp3"
        />
      </Form.Group>
      <div>Or</div>
      <Form.Group className="mb-3" controlId="flow-audio-url">
        <Form.Control
          type="text"
          placeholder="Paste Audio URL"
          name="audio_audioUrl"
          onChange={handleChange}
          value={formData.audio_audioUrl || ""}
        />
      </Form.Group>
    </>
  );
}
export default AudioWidget