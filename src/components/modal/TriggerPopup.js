import React, { useState, useEffect } from "react";
import { useStoreApi, useReactFlow } from 'reactflow';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import TriggerWidget from './../FormGrp/TriggerWidget'
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
  const [formData, setFormData] = useState(inputNodeData);

  // console.log(formData.data.formData.trigger_msgs)
  // console.log(formData.data.formData.trigger_pattern)
  console.log(inputNodeData)
  console.log(formData)
  const store = useStoreApi();
  const { setNodes } = useReactFlow();
  const handleSaveNodeForm = (event) => {
    const { nodeInternals } = store.getState();
    event.preventDefault();
    console.log("nodeInternals")
    console.log(nodeInternals)
    console.log(formData)
    setNodes(
      Array.from(nodeInternals.values()).map((node) => {
        if (node.type === "input") {
          node.data = {
            ...node.data,
            formType: "trigger", 
            formData: formData,
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
        <Form>
          <Modal.Header closeButton>
            <Modal.Title>Message Types</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <TriggerWidget formData={formData} setFormData={setFormData} />
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