import { useState } from "react";
import Form from 'react-bootstrap/Form';
const VideoWidget = ({formData, setFormData}) => {
  // let formStateData = {
  //   file: '',
  //   videoUrl: '',
  //   captionTxt: '',
  // };
  // const [formData, setFormData] = useState(formStateData);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
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

          name="videoUrl"
          onChange={handleChange}
          value={formData.videoUrl || ""}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="flow-video-caption">
        <Form.Label>Caption Text</Form.Label>
        <Form.Control
          type="text"
          placeholder="Caption Text"

          name="captionTxt"
          onChange={handleChange}
          value={formData.captionTxt || ""}
        />
      </Form.Group>
    </>
  );
}
export default VideoWidget