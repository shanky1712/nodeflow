import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const TriggerWidget = ({formData, setFormData}) => {

  // console.log("formData trigger_msgs")
  // console.log(formData)
  const [optionList, setOptionList] = useState( formData.trigger_msgs || [{ option: "" }]);

  const handleOptionLblChange = (e, index) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  const options = [
    { value: "is", label: "Is" },
    { value: "contains", label: "Contains" },
    { value: "start-with", label: "Starts with" },
    { value: "end-with", label: "Ends with" },
  ];
  console.log("formData")
  console.log(formData)
  // console.log(formData.id)
  return (
    <>
      <Form.Select className="mb-3" aria-label="Default select example" name="trigger_pattern" onChange={handleChange}>
        <option>Open this select menu</option>
        {/* {formData.trigger_msgs.trigger_pattern == opt['value'] ? 'selected' : ''} */}
        { options.map((opt, index) => (
          <option key={index} value={opt['value']} defaultValue = {formData.trigger_pattern == opt['value'] ? opt['value'] : ""}>{ opt['label'] }</option>
          )) 
        }
      </Form.Select>
      <div className="form-field mb-3">
        <div className="first-division">
            <input
              className="form-control"
              name="trigger_msgs"
              type="text"
              id="trigger_msgs"
              value={formData.trigger_msgs || ''}
              // onChange={(e) => handleOptionLblChange(e, index)}
              onChange={handleOptionLblChange}
            />
          </div>        
      </div>
    </>
  );
}
export default TriggerWidget