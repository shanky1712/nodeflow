import { useState, useRef } from "react";
import Form from 'react-bootstrap/Form';
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
    }));  
  };
  return (
    <>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Document</Form.Label>
        <Form.Control 
          type="file" 
          name="doc"
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
          name="docUrl"
          onChange={handleChange}
          value={formData.docUrl || ""}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="flow-doc-file-name">
        <Form.Label>File name</Form.Label>
        <Form.Control
          type="text"
          placeholder="File name"
          name="fileName"
          onChange={handleChange}
          value={formData.fileName || ""}
        />
      </Form.Group>
    </>
  );
}
export default DocWidget