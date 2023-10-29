import { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const InteractiveWidget = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const [radioValue, setRadioValue] = useState('1');
  const radios = [
    { name: 'Button', value: '1' },
    { name: 'List', value: '2' },
  ];

  const [optionList, setOptionList] = useState([{ option: "" }]);

  const handleServiceChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...optionList];
    list[index][name] = value;
    setOptionList(list);
  };

  const handleServiceRemove = (index) => {
    const list = [...optionList];
    list.splice(index, 1);
    setOptionList(list);
  };

  const handleServiceAdd = () => {
    setOptionList([...optionList, { option: "" }]);
  };

  return (
    <>
      <Form.Group className="mb-3" controlId="flow-body-interactive">
        <Form.Label>Body</Form.Label>
        <Form.Control as="textarea" rows={3} />
      </Form.Group>
      <ButtonGroup className="mb-3">
        {radios.map((radio, idx) => (
          <ToggleButton
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            // variant={idx % 2 ? 'outline-success' : 'outline-danger'}
            variant="outline-success"
            name="radio"
            value={radio.value}
            checked={radioValue === radio.value}
            onChange={(e) => setRadioValue(e.currentTarget.value)}
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
                name="option"
                type="text"
                id={"options" + index}
                value={singleOption.option}
                onChange={(e) => handleServiceChange(e, index)}
                // required
              />

            </div>
            <div className="second-division">
              {optionList.length !== 1 && (
                <Button className="mb-3" variant="danger" onClick={() => {handleServiceRemove(index)}}>
                  <FontAwesomeIcon icon="fa-solid fa-trash" />
                </Button>
              )}
              {optionList.length - 1 === index && optionList.length < 4 && (
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