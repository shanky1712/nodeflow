import React, { useState, useRef, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import CustomForm from '../../CustomForm';
const Popup = ({ getData, isOpen, onClose, sourceHandles, setSourceHandles, children }) => {
  const [isModalOpen, setModalOpen] = useState(isOpen)
  const modalRef = useRef(null)

  const handleCloseModal = () => {
    if (onClose) {
      onClose()
    }
    setModalOpen(false)
  }

  useEffect(() => {
    setModalOpen(isOpen)
  }, [isOpen])

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
  const [formData, setFormData] = useState({});
  const [defaultTab, setDefaultTab] = useState("text");
  const handleSaveNodeForm = (event) => {
    event.preventDefault();
    alert(`remove `)
    setSourceHandles([...sourceHandles, {}])
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
            <CustomForm formData={formData} setFormData={setFormData} defaultTab={defaultTab} setDefaultTab={setDefaultTab} />
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

export default Popup