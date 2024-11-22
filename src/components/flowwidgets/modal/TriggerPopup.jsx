import React, { useState, useEffect } from "react";
import { useStoreApi, useReactFlow } from 'reactflow';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import TriggerWidget from '../FormGrp/TriggerWidget'
const TriggerPopup = ({ id, inputNodeData, isOpen, onClose, children, ...props }) => {

  const handleCloseModal = () => {
    if (onClose) {
      onClose()
    }
  }
  // useEffect(() => {
  //   console.log(inputNodeData)
  // }, [inputNodeData]);
  const [isLoading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);
  const options = [
    { value: "is", label: "Is" },
    { value: "contains", label: "Contains" },
    { value: "start-with", label: "Starts with" },
    { value: "end-with", label: "Ends with" },
  ];
  useEffect(() => {
    function simulateNetworkRequest() {
      return new Promise((resolve) => setTimeout(resolve, 2000));
    }
    if (isLoading) {
      simulateNetworkRequest().then(() => {
        setLoading(false);
      });
    }
  }, [isLoading]);
  // const [formData, setFormData] = useState(inputNodeData);
  let triggerPattern = "";
  let triggerMsg = "";
  let triggerFlowTitle = "";
  if ( inputNodeData.data ) {
    triggerPattern = inputNodeData.data.formData.trigger_pattern;
    triggerMsg = inputNodeData.data.formData.trigger_msgs;
    triggerFlowTitle = inputNodeData.data.formData.flow_title;
  }

  const [trigPattern, setTrigPattern] = useState('');
  const [trigMsg, setTrigMsg] = useState('');
  const [trigflowTitle, setFlowTitle] = useState('');
  useEffect(() => {
    setTrigPattern(triggerPattern);
  }, [triggerPattern]);
  useEffect(() => {
    setTrigMsg(triggerMsg);
  }, [triggerMsg]);
  useEffect(() => {
    setFlowTitle(triggerFlowTitle);
  }, [triggerFlowTitle]);
  const handleTrigPattern = (event) => {
    setTrigPattern(event.target.value);
    // const { name, value } = event.target;
    // setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  const handleTrigMsg = (event) => {
    setTrigMsg(event.target.value);
    // const { name, value } = event.target;
    // setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  const handleFlowTitle = (event) => {
    setFlowTitle(event.target.value);
    // const { name, value } = event.target;
    // setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const store = useStoreApi();
  const { setNodes } = useReactFlow();
  const handleSaveNodeForm = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    const { nodeInternals } = store.getState();
    event.preventDefault();
    setNodes(
      Array.from(nodeInternals.values()).map((node) => {
        if (node.type === "input") {
          node.data = {
            ...node.data,
            formType: "trigger",
            formData: {
              "flow_title": trigflowTitle,
              "trigger_msgs": trigMsg,
              "trigger_pattern": trigPattern
            },
          };
        }
        return node;
      })
    );
    setLoading(true);
  }

  return (
    <>
      <Modal show={isOpen} onHide={handleCloseModal} size="lg">
        <Form noValidate validated={validated}>
          <Modal.Header closeButton>
            <Modal.Title>Flow Details, when this flow trigger?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div className="form-field mb-3">
              <div className="first-division">
                  <input
                    className="form-control"
                    name="flow_title"
                    type="text"
                    id="flow_title"
                    value={trigflowTitle}
                    placeholder="Flow Title"
                    required
                    onChange={handleFlowTitle}
                  />
                </div>
            </div>
            <Form.Select className="mb-3" aria-label="Default select example" name="trigger_pattern" onChange={handleTrigPattern} value = {trigPattern}>
              <option>Open this select menu</option>
              { options.map((opt, index) => (
                <option key={index} value={opt['value']} >{ opt['label'] }</option>
                ))
              }
            </Form.Select>
            <Form.Group as={Col} md="12" controlId="trigger_msgs">
              <Form.Label>First name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="First name"
                // defaultValue="Mark"
                name="trigger_msgs"
                // id="trigger_msgs"
                value={trigMsg}
                onChange={handleTrigMsg}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">This is required Field</Form.Control.Feedback>
            </Form.Group>
            {/* <div className="form-field mb-3">
              <div className="first-division">
                  <input
                    className="form-control"
                    name="trigger_msgs"
                    type="text"
                    id="trigger_msgs"
                    value={trigMsg}
                    onChange={handleTrigMsg}
                  />
                </div>
            </div> */}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="primary" type="submit" disabled={isLoading} onClick={!isLoading ? handleSaveNodeForm : null} >
              {isLoading ? 'Loading…' : 'Save Changes'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}

export default TriggerPopup
