import { useState, useRef } from "react";
import Form from 'react-bootstrap/Form';
const VideoWidget = ({formData, setFormData}) => {

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
      ['video']: url, 
      ['videoData']: file,
    }));  
  };

  return (
    <>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Video</Form.Label>
        <Form.Control 
          type="file" 
          name="video_video"
          ref={inputRef}
          onChange={handleFileChange}
          accept=".mov,.mp4"
        />
        {source && (
          <video
            className="VideoInput_video"
            width={300}
            height={300}
            style={{padding :"10px 5px"}}
            controls
            src={source}
          />
        )}
      </Form.Group>
      <div>Or</div>
      <Form.Group className="mb-3" controlId="flow-video-url">
        <Form.Control
          type="text"
          placeholder="Paste Video URL"
          name="video_videoUrl"
          onChange={handleChange}
          value={formData.ideo_videoUrl || ""}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="flow-video-caption">
        <Form.Label>Caption Text</Form.Label>
        <Form.Control
          type="text"
          placeholder="Caption Text"
          name="video_captionTxt"
          onChange={handleChange}
          value={formData.ideo_captionTxt || ""}
        />
      </Form.Group>
    </>
  );
}
export default VideoWidget