import React, {useState, useRef, useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
const Popup = ({ isOpen, hasCloseBtn=true, onClose, children }) => {
    const [isModalOpen, setModalOpen] = useState(isOpen)
    const modalRef = useRef(null)

    const handleCloseModal = () => {
        if (onClose) {
            onClose()
        }
        setModalOpen(false)
    }

    const handleKeyDown = event => {
        if (event.key == "Escape") {
            handleCloseModal()
        }
    }

    useEffect(() => {
        setModalOpen(isOpen)
    }, [isOpen])

    useEffect(() => {
        const modalElement = modalRef.current
        if (modalElement) {
            if (isModalOpen) {
                modalElement.showModal()
            } else {
                modalElement.close()
            }
        }
    }, [isModalOpen])

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
  
    const handleClick = () => setLoading(true);

    return (
      <>
        <Modal show={isOpen} onHide={handleCloseModal} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Message Types</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {children}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="primary" disabled={isLoading} onClick={!isLoading ? handleClick : null} >
              {isLoading ? 'Loading…' : 'Save Changes'}
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
}

export default Popup