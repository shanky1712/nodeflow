import { useState } from "react";
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Figure from 'react-bootstrap/Figure';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
const CtaWidget = ({formData, setFormData}) => {

  const handleHeaderChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  const handleBodyChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  const handleFooterChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  const handleCTAURLChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  const handleCTADisplayTextChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  
  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Available Variables</Popover.Header>
      <Popover.Body>
        <div>name</div>
        <div>first name</div>
        <div>last name</div>
        <div>phone</div>
      </Popover.Body>
    </Popover>
  );
  return (
    <Container>
      <Row>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="flow-header-interactive">Header</Form.Label>
            <Form.Control id="flow-header-interactive" className="mb-3" required as="textarea" rows={1} name='cta_header' onChange={handleHeaderChange} value={formData.cta_header} />
            <Form.Label htmlFor="flow-body-interactive">
              Body &nbsp;
              <OverlayTrigger trigger="click" placement="right" overlay={popover}>
                <FontAwesomeIcon icon="fa-solid fa-circle-info" />
              </OverlayTrigger>
            </Form.Label>
            <Form.Control id="flow-body-interactive" className="mb-3" required as="textarea" rows={3} name='cta_body' onChange={handleBodyChange} value={formData.cta_body} />
            <Form.Label htmlFor="flow-footer-interactive">Footer</Form.Label>
            <Form.Control id="flow-footer-interactive" className="mb-3" required as="textarea" rows={1} name='cta_footer' onChange={handleFooterChange} value={formData.cta_footer} />
          </Form.Group>
          <Form.Group className="row mb-3">
            <Form.Group className="col-md-6 mb-3">
              <Form.Label htmlFor="flow-ctadisplaytext-interactive">CTA Display Text</Form.Label>
              <Form.Control id="flow-ctadisplaytext-interactive" className="mb-3" required as="textarea" rows={1} name='cta_displaytext' onChange={handleCTADisplayTextChange} value={formData.cta_displaytext} />
            </Form.Group>
            <Form.Group className="col-md-6 mb-3">
              <Form.Label htmlFor="flow-ctaurl-interactive">CTA Url</Form.Label>
              <Form.Control id="flow-ctaurl-interactive" className="mb-3" required as="textarea" rows={1} name='cta_url' onChange={handleCTAURLChange} value={formData.cta_url} />
            </Form.Group>
            <Form.Control.Feedback type="invalid">This is required Field</Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col className="border-start">
          <Figure className="mb-0 text-center">
            <Figure.Image className="col-md-8 mb-3" width="98%" height={180} alt="wa_headerimg" src="../../../../../assets/cta.png" />
          </Figure>
        </Col>
      </Row>
    </Container>
  );
}
export default CtaWidget