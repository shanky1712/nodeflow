import { useState } from "react";
import Form from 'react-bootstrap/Form';
import Figure from 'react-bootstrap/Figure';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
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
      ['image_captionTxt']: e.target.files[0].name,
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
    <Container>
      <Row>
        <Col>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              name="image_image"
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
              name="image_imageUrl"
              onChange={handleChange}
              value={formData.image_imageUrl || ""}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="flow-img-caption">
            <Form.Label>Caption Text</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Caption Text"
              name="image_captionTxt"
              onChange={handleChange}
              value={formData.image_captionTxt || ""}
            />
            <Form.Control.Feedback type="invalid">This is required Field</Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col className="border-start">
          <Figure className="mb-0 text-center">
            <Figure.Image className="col-md-8 mb-3" width="98%" height={180} alt="wa_headerimg" src="../../../../../assets/image.png" />
          </Figure>
        </Col>
      </Row>
    </Container>
  );
}
export default ImageWidget
