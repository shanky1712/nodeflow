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
import axios from "axios";
const TemplateWidget = ({formData, setFormData}) => {
  // const [formData, setFormData] = useState({ });
  const [templateOPtions, setTemplateOPtions] = useState([]);
  const [templateData, setTemplateData] = useState([]);

  const handleTemplateChange = (event) => {
    const { formname, value } = event.target;
    const newTemplateData = templateData[value] || {};
    setFormData((prevFormData) => ({
      ...newTemplateData,
      name: value, // Set the selected template value
    }));
    // console.log(formData)
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
  
  let WA_TEMPLATES = localStorage.getItem("WA_TEMPLATES");
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
  const handleSelectionChange = (event, index) => {
    const { name, value } = event.target;
    // const updatedParameters = [...formData.body.parameters];
    // updatedParameters[index]['selection'] = { ...updatedParameters[index], value };
    formData.body.parameters[0].selection = value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      ...formData,
    }));
  };
  const handleBodyChange = (event, index) => {
    const { name, value } = event.target;    
    // Create a deep copy of the `parameters` array
    const updatedParameters = [...formData.body.parameters];
    // Update the specific parameter's value
    updatedParameters[index] = { ...updatedParameters[index], value };
    // Update the formData with the modified parameters
    setFormData((prevFormData) => ({
      ...prevFormData,
      body: {
        ...prevFormData.body,
        parameters: updatedParameters,
      },
    }));
  };
  const handleFooterChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, ['footer']: value }));
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Available Variables</Popover.Header>
      <Popover.Body>
        <div>{'{full_name}'}</div>
        <div>{'{first_name}'}</div>
        <div>{'{last_name}'}</div>
        <div>{'{phone}'}</div>
      </Popover.Body>
    </Popover>
  );
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [mediaId, setMediaId] = useState("");

  const handleFileChange = (event) => {
    console.log(event.target.files[0])
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus("Please select a file to upload.");
      return;
    }

    try {
      setUploadStatus("Uploading...");
      setFormData((prevFormData) => ({
        ...prevFormData,
        ['header_media']: selectedFile,
      }));
      // const accessToken = ""; // Replace with your actual access token
      // const url = "https://graph.facebook.com/v17.0/366140729916227/media"; // Replace with your phone number ID
      // const formData = new FormData();
      // formData.append("file", selectedFile);
      // formData.append("type", selectedFile.type.split("/")[0]); // "image", "video", or "document"
      // formData.append("messaging_product", "whatsapp"); // This is the required parameter

      // const response = await axios.post(url, formData, {
      //   headers: {
      //     Authorization: `Bearer ${accessToken}`,
      //     "Content-Type": "multipart/form-data",
      //   },
      // });

      // if (response.data && response.data.id) {
      //   setMediaId(response.data.id);
      //   // Usage
      //   // const mediaId = response.data.id; // Replace with your media ID
      //   // getMediaUrl(mediaId).then((url) => {
      //   //   if (url) {
      //   //     console.log("Accessible URL:", url);
      //   //   }
      //   // });
      //   setUploadStatus("Upload successful!");
      // } else {
      //   setUploadStatus("Upload failed. Please try again.");
      // }
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadStatus("An error occurred during upload.");
    }
  };
  const getMediaUrl = async (mediaId) => {
    try {
      const accessToken = ""; // Replace with your actual access token
      const url = `https://graph.facebook.com/v17.0/${mediaId}`;
  
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      if (response.data && response.data.url) {
        console.log("Media URL:", response.data.url);
          // Example usage:
        const mediaUrl = response.data.url; // Replace with your media URL
        fetchMedia(mediaUrl);
        return response.data.url; // The accessible URL for the media
      } else {
        console.error("Failed to fetch media URL. Response:", response.data);
        return null;
      }
    } catch (error) {
      console.error("Error fetching media URL:", error);
      return null;
    }
  };
  // const downloadMedia = async (mediaUrl) => {
  //   try {
  //     const accessToken = ""; // Replace with your actual access token
  
  //     const response = await axios.get(mediaUrl, {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //       responseType: 'blob', // Ensure the response is treated as binary data
  //     });
  
  //     // Save or process the media as needed
  //     console.log("Media downloaded successfully!");
  //     return response.data;
  //   } catch (error) {
  //     console.error("Error downloading media:", error);
  //   }
  // };
  const fetchMedia = async (mediaUrl) => {
    // const mediaUrl = "https://lookaside.fbsbx.com/whatsapp_business/attachments/..."; // Replace with actual URL
    const proxyUrl = `http://localhost/test/test.php?url=${encodeURIComponent(mediaUrl)}`;
  
    try {
      const response = await fetch(proxyUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch media");
      }
      const blob = await response.blob();
      const mediaObjectUrl = URL.createObjectURL(blob);
      console.log("Media accessible at:", mediaObjectUrl);
      // You can now use this blob URL to display the media
    } catch (error) {
      console.error("Error fetching media:", error);
    }
    // Example of handling the file upload on the frontend
    // fetch('http://localhost/test/test.php', {
    //   method: 'GET',
    //   url: mediaUrl, // formData contains the uploaded file
    // })
    // .then(response => response.json())
    // .then(data => {
    //   const fileUrl = data.file_url; // The URL returned from the PHP backend
    //   console.log('File URL:', fileUrl);
      
    //   // Display the file on the frontend (example for an image)
    //   const imgElement = document.createElement('img');
    //   imgElement.src = fileUrl;
    //   document.body.appendChild(imgElement);
    // })
    // .catch(error => {
    //   console.error('Error:', error);
    // });

  };
  
  return (
    <Container>
      <Row>
        <Col>
          <Form.Select aria-label="Default select example" name="template" value={formData['template'] || ""} onChange={handleTemplateChange} className="mb-3">
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
                    { formData.header.parameters[0] && 
                      <div className="mt-2 col-md-12">
                        <Figure className="mb-0 text-center">
                          <Figure.Image className="col-md-8 mb-3" width="98%" height={180} alt="wa_headerimg" src={formData.header.parameters[0].url} />
                        </Figure>
                      </div>
                    }
                    {templateData[formData['template']].header.parameters.map((headerObj, index) => {
                      const headerFormat = templateData[formData['template']].header.format;
                      if (['IMAGE', 'DOCUMENT', 'VIDEO'].includes(headerFormat)) {
                        return (
                          <div key={index}>
                            <Form.Control
                              type="file"
                              name="header_media"
                              accept={getFileAcceptAttribute(headerObj.type)}
                              onChange={handleFileChange}
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
                            <Button variant="primary" onClick={handleUpload} disabled={!selectedFile}>
                              Upload Media
                            </Button>
                            {uploadStatus && <p className="text-success">{uploadStatus}</p>}
                            {/* {mediaId && <p>Media ID: {mediaId}</p>} */}
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
                <hr/>
                {templateData[formData['template']].body && (
                  <>
                    <Form.Label htmlFor="flow-body-interactive" className="mt-2">
                      Body variables &nbsp;
                      <OverlayTrigger trigger="click" placement="right" overlay={popover}>
                        <FontAwesomeIcon icon="fa-solid fa-circle-info" />
                      </OverlayTrigger>
                    </Form.Label>
                    {templateData[formData['template']].body.parameters.map((bodyObj, index) => {
                      return (
                        <div key={index} className="row">
                          <div className="mt-2 col-md-2">
                            <span className="dynavar">{`{{${index + 1}}}`}</span>
                          </div>
                          <div className="col-md-4">
                            <Form.Select aria-label="Default select example" name="selection" value={formData.body.parameters[index]?.selection || ""} onChange={(e) => handleSelectionChange(e, index)} className=" col-3 mb-3">
                              <option value='static'>static</option>
                              <option value='dynamic'>dynamic</option>
                            </Form.Select>
                          </div>
                          <div className="col-md-6">
                            {formData.body.parameters[index]?.selection === 'static' && <Form.Control id="flow-body-interactive" className="mb-3" required type="text" name='interactive_interactiveBody' value= { formData.body.parameters[index]?.value || ''} onChange={(e) => handleBodyChange(e, index)} />}
                            {formData.body.parameters[index]?.selection === 'dynamic' && 
                              <Form.Select aria-label="Default select example" name="selection" value={formData.body.parameters[index]?.value || ""} onChange={(e) => handleSelectionChange(e, index)} className=" col-3 mb-3">
                                <option value='name'>Full name</option>
                                <option value='first name'>First name</option>
                                <option value='last name'>Last name</option>
                                <option value='phone'>Phone</option>
                              </Form.Select>
                            }
                          </div>
                        </div>
                      );
                    })}
                  </>
                )}
                {templateData[formData['template']].footer.parameters && (
                  <>
                    <Form.Label htmlFor="flow-footer-interactive">Footer</Form.Label>
                    <Form.Control readOnly id="flow-footer-interactive" className="mb-3" required type="text" name='interactive_interactiveFooter' onChange={handleFooterChange} value={ formData.footer?.text || ''} />
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
                        <Form.Control readOnly id="flow-footer-interactive" className="mb-3" required type="text" name='interactive_interactiveFooter' value= { formData.body.parameters[index]?.value || ''} onChange={(e) => handleBodyChange(e, index)} />
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