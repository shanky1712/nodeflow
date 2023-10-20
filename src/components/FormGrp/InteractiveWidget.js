import { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const InteractiveWidget = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // alert(`Name: ${formData.name}, Email: ${formData.email}, Message: ${formData.message}`);
  };

  const [radioValue, setRadioValue] = useState('1');
  const radios = [
    { name: 'Button', value: '1' },
    { name: 'List', value: '2' },
  ];
  const [listMore, setListMore] = useState([{ listItems : ""}]);

  const handleListAdd = () => {
    setListMore([...listMore, { listItems: "" }]);
  };

  const listMoreRemove = (index) => {
    const items = [...listMore];
    items.splice(index, 1);
    setListMore(items);
  }
  return (
    <>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
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
      {listMore.map((singleItem, index) => (
        <Form.Group key={index} className="mb-3 add-more" controlId={"controlInput" + index}>
          <div className="mb-3">
            <Form.Control
              type="text"
              placeholder="Add Your Label"
            />
            {
              listMore.length > 1 &&
              (
                <Button className="mb-3" variant="danger" onClick={listMoreRemove}>
                  <FontAwesomeIcon icon="fa-solid fa-trash" />
                </Button>
              )
            }
            {listMore.length - 1 == index && listMore.length < 4 &&
              (
                <Button className="mb-3" variant="primary" onClick={handleListAdd}>
                  <FontAwesomeIcon icon="fa-solid fa-plus-square" />
                </Button>
              )
            }

          </div>
        </Form.Group>
      ))}
    </>
  );
}
export default InteractiveWidget