import { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Figure from 'react-bootstrap/Figure';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
const InteractiveWidget = ({formData, setFormData}) => {
  // const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const radios = [
    { name: 'Button', value: '1' },
    { name: 'List', value: '2' },
  ];
  const [radioValue, setRadioValue] = useState(formData.interactive_optionType || '');
  // console.log("formData interactive_options")
  // console.log(formData.interactive_options)
  const [optionList, setOptionList] = useState( formData.interactive_options || [{ option: "" }]);
  
  
  const handleHeadTitleLblChange = (e, index) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  const handleOptionDescLblChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...optionList];
    list[index][name] = value;
    setOptionList(list);
    setFormData((prevFormData) => ({ ...prevFormData, ["interactive_options"]: list }));
    // console.log(optionList)
  };
  const handleOptionLblChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...optionList];
    list[index][name] = value;
    setOptionList(list);
    setFormData((prevFormData) => ({ ...prevFormData, ["interactive_options"]: list }));
    // console.log(optionList)
  };

  const handleServiceRemove = (index) => {
    // console.log(index)
    const list = [...optionList];
    list.splice(index, 1);
    setOptionList(list);
    setFormData((prevFormData) => ({ ...prevFormData, ["interactive_options"]: list }));
  };

  const handleServiceAdd = () => {
    setOptionList([...optionList, { option: "" }]);
  };
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
  const optionTypeChange = (event) => {
    const { name, value } = event.target;
    // console.log(name)
    // console.log(value)
    setRadioValue(value)
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  }
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
  return (
    <Container>
      <Row>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="flow-header-interactive">Header</Form.Label>
            <Form.Control id="flow-header-interactive" className="mb-3" maxLength = "60" required as="textarea" rows={1} name='interactive_interactiveHeader' onChange={handleHeaderChange} value={formData.interactive_interactiveHeader} />
            <Form.Label htmlFor="flow-body-interactive">
              Body &nbsp;
              <OverlayTrigger trigger="click" placement="right" overlay={popover}>
                <FontAwesomeIcon icon="fa-solid fa-circle-info" />
              </OverlayTrigger>
            </Form.Label>
            <Form.Control id="flow-body-interactive" className="mb-3" maxLength = "4000" required as="textarea" rows={3} name='interactive_interactiveBody' onChange={handleBodyChange} value={formData.interactive_interactiveBody} />
            <Form.Label htmlFor="flow-footer-interactive">Footer</Form.Label>
            <Form.Control id="flow-footer-interactive" className="mb-3" maxLength = "60" required as="textarea" rows={1} name='interactive_interactiveFooter' onChange={handleFooterChange} value={formData.interactive_interactiveFooter} />
            <Form.Control.Feedback type="invalid">This is required Field</Form.Control.Feedback>
          </Form.Group>
          <ButtonGroup className="mb-3" role="group" size="lg">
            {radios.map((radio, idx) => (
              <ToggleButton
                key={idx}
                id={`radio-${idx}`}
                type="radio"
                // variant={idx % 2 ? 'outline-success' : 'outline-danger'}
                variant="outline-success"
                name="interactive_optionType"
                value={radio.value}
                checked={radioValue == radio.value}
                onChange={optionTypeChange}
              >
                {radio.name}
              </ToggleButton>
            ))}
          </ButtonGroup>

          <div className="form-field">
            {/* <label htmlFor="option">Configure Options</label> */}
            {radioValue == 2 && (
              <>
                <Form.Label>List Header Title</Form.Label>
                <Form.Control className="mb-3" required as="input" maxLength = "24" rows={1} name='interactive_list_head_title' onChange={handleHeadTitleLblChange} value={formData.interactive_list_head_title} />
                <Form.Control.Feedback type="invalid">This is required Field</Form.Control.Feedback>
              </>
            )}
            {radioValue == 2 && (
              <div className="row">
                {/* <div className="col-md-3">Row Title</div> */}
                <div className="col-md-4"><label>Option Text</label></div>
                <div className="col-md-6"><label>Description</label></div>
                <div className="col-md-2"><label>Action</label></div>
              </div>
            )}
            {optionList.map((singleOption, index) => (
              // <Form.Group key={index} className="mb-3 add-more" controlId={"controlInput" + index}>
                <div key={index} className=" mb-2 mt-2 add-more options row">
                    {radioValue == 1 && (
                      <div className="col-md-10">
                        <input
                          className="mb-2"
                          name="interactive_option"
                          type="text"
                           maxLength = "20"
                          id={"option-" + index}
                          value={singleOption.interactive_option || ''}
                          onChange={(e) => handleOptionLblChange(e, index)}
                          required
                        />
                      </div>
                    )}
                  {radioValue == 2 && (
                    <>
                      {/* <div className="col-md-3">
                        <input
                          className="mb-2"
                          name="interactive_row_title"
                          type="text"
                          id={"option-" + index}
                          value={singleOption.interactive_row_title || ''}
                          onChange={(e) => handleRowTitleLblChange(e, index)}
                          required
                        />
                      </div> */}
                      <div className="col-md-4">
                        <input
                          className="mb-2"
                          name="interactive_option"
                          type="text"
                          maxLength = "20"
                          id={"option-text-" + index}
                          value={singleOption.interactive_option || ''}
                          onChange={(e) => handleOptionLblChange(e, index)}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <input
                          className="mb-2"
                          name="interactive_option_description"
                          maxLength = "72"
                          type="text"
                          id={"option-desc-" + index}
                          value={singleOption.interactive_option_description || ''}
                          onChange={(e) => handleOptionDescLblChange(e, index)}
                          required
                        />
                      </div>
                    </>
                  )}
                  <div className="col-md-2">
                    {optionList.length !== 1 && (
                      <Button className="mb-3" variant="danger" onClick={() => {handleServiceRemove(index)}}>
                        <FontAwesomeIcon icon="fa-solid fa-trash" />
                      </Button>
                    )}
                  </div>
                    {optionList.length - 1 === index && optionList.length < 9 && (
                      <div className="col-md-12">
                        <div className="col-md-11"></div>
                        <div className="col-md-1">
                          <Button className="mb-3 mt-3" variant="primary" onClick={handleServiceAdd}>
                            <FontAwesomeIcon icon="fa-solid fa-plus-square" />
                          </Button>
                        </div>
                      </div>
                    )}
                </div>
            ))}
          </div>
        </Col>
        <Col className="border-start">
          <Figure className="mb-0 text-center">
            { radioValue == 1 && <Figure.Image className="col-md-8 mb-3" width="98%" height={180} alt="wa_headerimg" src="../../../../../assets/buttons.png" /> }
            { radioValue == 2 && <Figure.Image className="col-md-8 mb-3" width="98%" height={180} alt="wa_headerimg" src="../../../../../assets/list.png" /> }
          </Figure>
        </Col>
      </Row>
    </Container>
  );
}
export default InteractiveWidget


