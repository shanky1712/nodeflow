import { useState } from "react";
import Form from 'react-bootstrap/Form';
const ImageWidget = ({formData, setFormData}) => {
  let formStateData = {
    file: '',
    imageUrl: '',
    captionTxt: '',
  };
  // const [formData, setFormData] = useState(formStateData);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  return (
    <>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Image</Form.Label>
        <Form.Control type="file" />
      </Form.Group>
      <div>Or</div>
      <Form.Group className="mb-3" controlId="flow-image-url">
        <Form.Control
          type="text"
          placeholder="Paste Image URL"
          name="imageUrl"
          onChange={handleChange}
          value={formData.imageUrl || ""}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="flow-img-caption">
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
export default ImageWidget