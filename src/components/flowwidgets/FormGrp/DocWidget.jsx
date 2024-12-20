import { useState, useRef } from "react";
import Form from 'react-bootstrap/Form';
import Figure from 'react-bootstrap/Figure';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
const DocWidget = ({formData, setFormData}) => {

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
      ['doc']: url,
      ['docData']: file,
      ['doc_fileName']: event.target.files[0].name,
    }));
  };
  return (
    <Container>
      <Row>
        <Col>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Document</Form.Label>
            <Form.Control
              type="file"
              name="doc_doc"
              ref={inputRef}
              onChange={handleFileChange}
              accept=".doc,.pdf,.docx"
            />
          </Form.Group>
          <div>Or</div>
          <Form.Group className="mb-3" controlId="flow-doc-url">
            <Form.Control
              type="text"
              placeholder="Paste Document URL"
              name="doc_docUrl"
              onChange={handleChange}
              value={formData.doc_docUrl || ""}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="flow-doc-file-name">
            <Form.Label>File name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="File name"
              name="doc_fileName"
              onChange={handleChange}
              value={formData.doc_fileName || ""}
            />
            <Form.Control.Feedback type="invalid">This is required Field</Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col className="border-start">
          <Figure className="mb-0 text-center">
            <Figure.Image className="col-md-8 mb-3" width="98%" height={180} alt="wa_headerimg" src="../../../../../assets/document.png" />
          </Figure>
        </Col>
      </Row>
    </Container>
  );
}
export default DocWidget
