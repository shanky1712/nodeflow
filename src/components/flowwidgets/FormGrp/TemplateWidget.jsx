import { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import Figure from 'react-bootstrap/Figure';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import axiosClient from "../../../axios-client"
const TemplateWidget = ({formData, setFormData}) => {
  // const [formData, setFormData] = useState({ });
  const [templateOPtions, setTemplateOPtions] = useState([]);
  const [templateData, setTemplateData] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const newTemplateData = templateData[value] || {};
    setFormData((prevFormData) => ({
      ...newTemplateData,
    }));
    console.log(formData)
  };
  useEffect(() => {
    console.log("FormData updated:", formData);
  }, [formData]);
  const extractComponent = (data, type, customProperty) => {
    const component = data.components.find(
        (c) => c.type === type
    );
    return component ? component[customProperty] : null;
  };

  const templateTranform = (templateMetadata) => {
    const metadata = JSON.parse(templateMetadata);
  
    // Create a new `form` object for each transformation
    const form = {
      template: null,
      language: {
        code: null
      },
      header: {
        format: null,
        text: null,
        parameters: [],
      },
      body: {
        text: null,
        parameters: [],
      },
      footer: {
        text: null,
      },
      buttons: [],
    };
  
    try {
      form.template = metadata.name;
      form.language.code = metadata.language;
      form.header.format = extractComponent(metadata, "HEADER", "format");
      form.header.text = extractComponent(metadata, "HEADER", "text");
  
      const headerExamples = extractComponent(metadata, "HEADER", "example");
      if (headerExamples) {
        if (form.header.format === "TEXT") {
          form.header.parameters = headerExamples.header_text.map((item) => ({
            type: "text",
            selection: "static",
            value: item,
          }));
        } else if (
          ["IMAGE", "DOCUMENT", "VIDEO"].includes(form.header.format)
        ) {
          form.header.parameters = headerExamples.header_handle.map((item) => ({
            type: form.header.format,
            selection: "default",
            value: null,
            url: item,
          }));
        }
      }
  
      form.body.text = extractComponent(metadata, "BODY", "text");
      const bodyExamples = extractComponent(metadata, "BODY", "example");
      if (bodyExamples) {
        form.body.parameters = bodyExamples.body_text[0].map((item) => ({
          type: "text",
          selection: "static",
          value: item,
        }));
      }
  
      form.footer.text = extractComponent(metadata, "FOOTER", "text");
  
      const buttons = extractComponent(metadata, "BUTTONS", "buttons");
      if (buttons) {
        form.buttons = buttons.map((item) => ({
          type: item.type,
          text: item.text,
          value: item[item.type.toLowerCase()] ?? null,
          parameters:
            item.type === "QUICK_REPLY"
              ? [{ type: "static", value: null }]
              : item.example
              ? item.example.map((param) => ({ type: "static", value: param }))
              : [],
        }));
      }
      return form; // Return the newly created form object
    } catch (error) {
      console.error("Error transforming template:", error);
      return null;
    }
  };
  
  const WA_TEMPLATES = localStorage.getItem("WA_TEMPLATES");
  useEffect(() => {
    const WA_TEMPLATES_DATA = JSON.parse(WA_TEMPLATES) || [];
    const results = [];
    const templateTranformedData = {};
  
    WA_TEMPLATES_DATA.forEach((rows) => {
      results.push({
        key: rows.name,
        value: rows.name,
      });
      templateTranformedData[rows.name] = templateTranform(rows.metadata);
    });
  
    setTemplateData(templateTranformedData);
    setTemplateOPtions([{ key: "Select a template", value: "" }, ...results]);
  }, [WA_TEMPLATES]);
  
  const getFileAcceptAttribute = (fileType) => {
    switch (fileType) {
        case 'IMAGE':
            return '.png, .jpg';
        case 'DOCUMENT':
            return '.pdf, .txt, .ppt, .doc, .xls, .docx, .pptx, .xlsx';
        case 'VIDEO':
            return '.mp4';
        default:
            return '';
    }
  }
  const handleHeaderChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  const handleBodyChange = (event, index) => {
    const { name, value } = event.target;
    console.log(name);
    console.log(value);
    console.log(index);
    const parameters = [];
    parameters[index]['value'] = value;
    setFormData((prevFormData) => ({ ...prevFormData, ['body']: parameters }));
  };
  const handleFooterChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Available Variables</Popover.Header>
      <Popover.Body>
        <div>{`{{first_name}}`}</div>
        <div>{`{{last_name}}`}</div>
        <div>{`{{full_name}}`}</div>
        <div>{`{{phone}}`}</div>
      </Popover.Body>
    </Popover>
  );

  return (
    <Container>
      <Row>
        <Col>
          <Form.Select aria-label="Default select example" name="template" onChange={handleChange} className="mb-3">
            {templateOPtions.map((templateOPtion) => {
              return (
                <option key={templateOPtion.value} value={templateOPtion.value}>
                  {templateOPtion.key}
                </option>
              );
            })}
          </Form.Select>
          <Form.Group className="mb-3">
            {/* {console.log(templateData[formData['template']].header.parameters)} */}
            {templateData[formData['template']] && (
              <>
                {templateData[formData['template']].header && (
                  <>
                    {templateData[formData['template']].header.parameters.length > 0 && (
                      <>
                        <Form.Label htmlFor="flow-header-interactive">Header variables</Form.Label>
                      </>
                    )}
                    {templateData[formData['template']].header.parameters.map((headerObj, index) => {
                      const headerFormat = templateData[formData['template']].header.format;
                      if (['IMAGE', 'DOCUMENT', 'VIDEO'].includes(headerFormat)) {
                        return (
                          <div key={index}>
                            <Form.Control
                              type="file"
                              name="image_image"
                              accept={getFileAcceptAttribute(headerObj.type)}
                            />
                            {headerFormat === 'IMAGE' && 
                              <p className="text-left text-xs mt-2">Max file upload size is <b>2MB</b> Supported file extensions: .png, jpg</p>
                            }
                            {headerFormat === 'DOCUMENT' && 
                              <p className="text-left text-xs mt-2">Max file upload size is <b>2MB</b> Supported file extensions: .pdf, .txt, .ppt, .doc, .xls, .docx, .pptx, .xlsx</p>
                            }
                            {headerFormat === 'VIDEO' && 
                              <p className="text-left text-xs mt-2">Max file upload size is <b>2MB</b> Supported file extensions: .mp4</p>
                            }
                          </div>
                        );
                      }
                      if (headerObj.type === 'text') {
                        return (
                          // form.header.parameters[index].value
                          <Form.Control id="flow-header-interactive" className="mb-3" required type="text" name='interactive_interactiveHeader' value='' />
                        );
                      }
                      return null; // Render nothing if the condition is not met
                    })}
                  </>
                )}
                {templateData[formData['template']].body && (
                  <>
                    <Form.Label htmlFor="flow-body-interactive">
                      Body variables &nbsp;
                      <OverlayTrigger trigger="click" placement="right" overlay={popover}>
                        <FontAwesomeIcon icon="fa-solid fa-circle-info" />
                      </OverlayTrigger>
                    </Form.Label>
                    {templateData[formData['template']].body.parameters.map((bodyObj, index) => {
                      return (
                        <div key={index}>
                          <div className="mb-3">
                            <span>{`{{${index + 1}}}`}</span>
                          </div>
                          <Form.Control id="flow-body-interactive" className="mb-3" required type="text" name='interactive_interactiveBody' value='' onChange={(e) => handleBodyChange(e, index)} />
                        </div>
                      );
                    })}
                  </>
                )}
                {templateData[formData['template']].footer.parameters && (
                  <>
                    <Form.Label htmlFor="flow-footer-interactive">Footer</Form.Label>
                    <Form.Control readOnly id="flow-footer-interactive" className="mb-3" required type="text" name='interactive_interactiveFooter' onChange={handleFooterChange} value='' />
                  </>
                )}
                {templateData[formData['template']].buttons.map((buttonObj, index) => {
                  {buttonObj.parameters.length > 0 && (
                    <>
                      <Form.Label htmlFor="flow-footer-interactive">Button variables</Form.Label>
                      <div class="w-[100%] mb-1">
                          <span>Label: {`${buttonObj.text}`}</span>
                      </div>
                      {buttonObj.parameters.map((buttonParam, index) => {
                        <Form.Control readOnly id="flow-footer-interactive" className="mb-3" required type="text" name='interactive_interactiveFooter' value='' />
                      })}
                      <Form.Control.Feedback type="invalid">This is required Field</Form.Control.Feedback>
                    </>
                  )}
                })}
              </> 
            )}
          </Form.Group>
        </Col>
        <Col className="border-start">
            {!templateData[formData['template']] && (
              <Figure className="mb-0 text-center">
                <Figure.Image className="col-md-8 mb-3" width="98%" height={180} alt="wa_headerimg" src="../../../../../assets/template.png" />
              </Figure>
            )}
            {templateData[formData['template']] && (
            <div className="wa_bg border">
              <div className="speech-wrapper">
                <div className="bubble">
                  <div className="txt">
                    <p className="name"><FontAwesomeIcon icon="fa-solid fa-user" /> User</p>
                    {templateData[formData['template']].header && (
                    <>
                      {templateData[formData['template']].header.parameters.length > 0 && (
                          <div className="wa_headerimg">
                            <Figure className="mb-0">
                              <Figure.Image className="mb-0" width="100%" height={180} alt="wa_headerimg" src="https://waguru.in/images/image-placeholder.png" />
                            </Figure>
                          </div>
                      )}
                    </>
                    )}
                    <p className="message">{templateData[formData['template']].body.text}</p>
                    <span className="timestamp">10:20 pm</span>
                    {templateData[formData['template']].buttons.map((buttonObj, index) => {
                      return (
                        <div key={index} className="mt-3 ">
                          <Button variant="outline-primary center">{`${buttonObj.text}`}</Button>
                        </div>
                      );
                    })}
                  </div>
                  <div className="bubble-arrow"></div>
                </div>
              </div>
            </div>
            ) }
        </Col>
      </Row>
    </Container>
  );
}
export default TemplateWidget