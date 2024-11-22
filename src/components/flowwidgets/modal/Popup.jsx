import React, { useState, useRef, useEffect } from "react";
import { useNodeId, useStoreApi, useReactFlow } from 'reactflow';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import CustomForm from '../CustomForm';
import axiosClient from "../../../axios-client"

const Popup = ({ getData, isOpen, onClose, children, ...props }) => {
  const [isModalOpen, setModalOpen] = useState(isOpen)
  const modalRef = useRef(null)
  let handleObj = getData.handles || [];
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
  const [validated, setValidated] = useState(false);

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
  const [formData, setFormData] = useState(getData.formData || {});
  const [defaultTab, setDefaultTab] = useState(getData.formType || "text");
  const curNodeId = useNodeId();
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
    // console.log("nodeInternals")
    // console.log(nodeInternals)
    // console.log(formData)
    if (defaultTab === 'interactive') {
      // setSourceHandles([...sourceHandles, {}])
      var handleObj = [];

      formData.interactive_options.map((options, index) => {
        var obj = {};
        obj["id"] = curNodeId+"-handle-"+index;
        obj["type"] = "source";
        obj["label"] = options.interactive_option;
        handleObj.push(obj);
        console.log(index)
        console.log(options.interactive_option)

      })
    }
    else if (defaultTab === 'doc' || defaultTab === 'image') {
      
      const token = localStorage.getItem('ACCESS_TOKEN');
      const bodyParameters = new FormData();
      if (defaultTab === 'doc') {
        bodyParameters.append('file', formData.docData);
        bodyParameters.append('fileName', formData.docData.name);
      }
      if (defaultTab === 'image') {
        bodyParameters.append('file', formData.imageData);
        bodyParameters.append('fileName', formData.imageData.name);
      }
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        },
      };
      axiosClient.post('/fileupload', bodyParameters, config)
        .then((data) => {
          
          setNodes(
            Array.from(nodeInternals.values()).map((node) => {
              if (node.id === curNodeId) {
                if (defaultTab === 'doc') {
                  formData.doc_docUrl = data.data.url;
                }
                if (defaultTab === 'image') {
                  formData.image_imageUrl = data.data.url;
                }
                node.data.formData = {
                  ...node.data.formData,
                  formData: formData,
                };
              }
              return node;
            })
          );
          console.log(nodeInternals)

        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
        })

      handleObj = [{"id": curNodeId+"-handle", "type":"source", "label": "Next"}];
    }
    else {
      handleObj = [{"id": curNodeId+"-handle", "type":"source", "label": "Next"}];
    }
    setNodes(
      Array.from(nodeInternals.values()).map((node) => {
        if (node.id === curNodeId) {
          node.data = {
            ...node.data,
            formType: defaultTab,
            formData: formData,
            handles: handleObj,
          };
        }
        return node;
      })
    );
    console.log(nodeInternals);
    setLoading(true);
  }

  // function handleSubmit(event) {
  //   event.preventDefault()
  //   const url = 'http://localhost:3000/uploadFile';
  //   const formData = new FormData();
  //   formData.append('file', file);
  //   formData.append('fileName', file.name);
  //   const config = {
  //     headers: {
  //       'content-type': 'multipart/form-data',
  //     },
  //   };
  //   axios.post(url, formData, config).then((response) => {
  //     console.log(response.data);
  //   });

  // }

  return (
    <>
      <Modal show={isOpen} onHide={handleCloseModal} size="lg">
        <Form noValidate validated={validated}>
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
