import { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const InteractiveWidget = ({formData, setFormData}) => {
  // const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const [radioValue, setRadioValue] = useState('1');
  const radios = [
    { name: 'Button', value: '1' },
    { name: 'List', value: '2' },
  ];
  // console.log("formData interactive_options")
  // console.log(formData.interactive_options)
  const [optionList, setOptionList] = useState( formData.interactive_options || [{ option: "" }]);

  const handleOptionLblChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...optionList];
    list[index][name] = value;
    setOptionList(list);
    setFormData((prevFormData) => ({ ...prevFormData, ["interactive_options"]: list }));
    // console.log(optionList)
  };

  const handleServiceRemove = (index) => {
    const list = [...optionList];
    list.splice(index, 1);
    setOptionList(list);
  };

  const handleServiceAdd = () => {
    setOptionList([...optionList, { option: "" }]);
  };
  const handleBodyChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  
  const optionTypeChange = (event) => {
    const { name, value } = event.target;
    setRadioValue(value)
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  }
  return (
    <>
      <Form.Group className="mb-3" controlId="flow-body-interactive">
        <Form.Label>Body</Form.Label>
        <Form.Control as="textarea" rows={3} name='interactive_interactiveBody' onChange={handleBodyChange} value={formData.interactive_interactiveBody} />
      </Form.Group>
      <ButtonGroup className="mb-3">
        {radios.map((radio, idx) => (
          <ToggleButton
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            // variant={idx % 2 ? 'outline-success' : 'outline-danger'}
            variant="outline-success"
            name="interactive_optionType"
            value={radio.value}
            checked={formData.interactive_optionType === radio.value}
            onChange={optionTypeChange}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>

      <div className="form-field">
        {/* <label htmlFor="option">Configure Options</label> */}
        {optionList.map((singleOption, index) => (
          // <Form.Group key={index} className="mb-3 add-more" controlId={"controlInput" + index}>
            <div key={index} className="mb-3 add-more options">
              <div className="first-division">
                <input
                  className="form-control"
                  name="interactive_option"
                  type="text"
                  id={"option-" + index}
                  value={singleOption.interactive_option || ''}
                  onChange={(e) => handleOptionLblChange(e, index)}
                  // required
                />

              </div>
              <div className="second-division">
                {optionList.length !== 1 && (
                  <Button className="mb-3" variant="danger" onClick={() => {handleServiceRemove(index)}}>
                    <FontAwesomeIcon icon="fa-solid fa-trash" />
                  </Button>
                )}
                {optionList.length - 1 === index && optionList.length < 8 && (
                  <Button className="mb-3" variant="primary" onClick={handleServiceAdd}>
                    <FontAwesomeIcon icon="fa-solid fa-plus-square" /> Add Options
                  </Button>
                )}
              </div>
            </div>
        ))}
      </div>      
    </>
  );
}
export default InteractiveWidget