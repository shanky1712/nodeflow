import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const TriggerWidget = ({formData, setFormData}) => {

  // console.log("formData trigger_msgs")
  // console.log(formData.trigger_msgs)
  const [optionList, setOptionList] = useState( formData.trigger_msgs || [{ option: "" }]);

  const handleOptionLblChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...optionList];
    list[index][name] = value;
    setOptionList(list);
    setFormData((prevFormData) => ({ ...prevFormData, ["trigger_msgs"]: list }));
    // console.log(optionList)
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  const handleServiceRemove = (index) => {
    console.log(index)
    const list = [...optionList];
    list.splice(index, 1);
    setOptionList(list);
    setFormData((prevFormData) => ({ ...prevFormData, ["trigger_msgs"]: list }));
  };

  const handleServiceAdd = () => {
    setOptionList([...optionList, { option: "" }]);
  };
  const options = [
    { value: "is", label: "is" },
    { value: "contains", label: "contains" },
    { value: "start-with", label: "start-with" },
    { value: "end-with", label: "end-with" },
  ];
  // console.log("formData")
  // console.log(formData)
  return (
    <>
      <Form.Select className="mb-3" aria-label="Default select example" name="trigger_pattern" onChange={handleChange}>
        <option>Open this select menu</option>
        {/* { options.map(opt => (<option value={opt['value']} {formData.trigger_msgs.trigger_pattern == opt['value'] ? 'selected' : ''}>{ opt['label'] }</option>)) } */}
      </Form.Select>
      <div className="form-field mb-3">
        {/* <label htmlFor="option">Configure Options</label> */}
        {optionList.map((singleOption, index) => (
          // <Form.Group key={index} className="mb-3 add-more" controlId={"controlInput" + index}>
            <div key={index} className="mb-3 add-more options">
              <div className="first-division">
                <input
                  className="form-control"
                  name="trigger_msg"
                  type="text"
                  id={"option-" + index}
                  value={singleOption.trigger_msg || ''}
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
export default TriggerWidget