import { useState } from "react";
import Form from 'react-bootstrap/Form';
const ImageWidget = ({formData, setFormData}) => {
  const [file, setFile] = useState();
  // const [formData, setFormData] = useState(formStateData);
  const handleOnChange = (e) => {
    // console.log(e.target.files);
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ 
      ...prevFormData, 
      [name]: value,
      ['image']: URL.createObjectURL(e.target.files[0]), 
      ['imageData']: e.target.files[0],
    }));    
    setFile(URL.createObjectURL(e.target.files[0]));
    console.log(e.target.files[0]);
    console.log(e.target.files[0].name);
  }
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  return (
    <>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Image</Form.Label>
        <Form.Control 
          type="file"
          name="image"
          accept="image/*"
          onChange={handleOnChange}
        />
         { file && <img src={file} style={{ width: 100, margin: "5px", border: "4px solid #e5e5e5", borderRadius: "5px" }}/> }
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