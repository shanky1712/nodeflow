import React, { useState } from "react";
import 'react-modern-drawer/dist/index.css';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import InputGroup from 'react-bootstrap/InputGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const CustomForm = () => {
    const handleSaveModal = () => { }
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
        <Form>
          <Tabs defaultActiveKey="text" id="uncontrolled-tab-example" className="mb-3" >
            {/* Text */}
            <Tab eventKey="text" title="Text">
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Text Message Body</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Text Message Body"
                  autoFocus
                />
              </Form.Group>
            </Tab>

            {/* Image */}
            <Tab eventKey="image" title="Image">
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Image</Form.Label>
                <Form.Control type="file" />
              </Form.Group>
              <div>Or</div>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Control
                  type="text"
                  placeholder="Paste Image URL"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Caption Text</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Caption Text"
                  />
              </Form.Group>
            </Tab>

            {/* Video */}
            <Tab eventKey="video" title="Video">
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Video</Form.Label>
                <Form.Control type="file" />
              </Form.Group>
              <div>Or</div>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Control
                  type="text"
                  placeholder="Paste Video URL"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Caption Text</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Caption Text"
                />
              </Form.Group>
            </Tab>

            {/* Document */}
            <Tab eventKey="document" title="Document">
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Document</Form.Label>
                <Form.Control type="file" />
              </Form.Group>
              <div>Or</div>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Control
                  type="text"
                  placeholder="Paste Document URL"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>File name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="File name"
                />
              </Form.Group>
            </Tab>

            {/* Audio */}
            <Tab eventKey="audio" title="Audio">
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Audio</Form.Label>
                <Form.Control type="file" />
              </Form.Group>
              <div>Or</div>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Control
                  type="text"
                  placeholder="Paste Audio URL"
                />
              </Form.Group>
            </Tab>

            {/* Location */}
            <Tab eventKey="location" title="Location">
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Name"
                  autoFocus
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGridAddress1">
                <Form.Label>Address</Form.Label>
                <Form.Control placeholder="1234 Main St" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formGridAddress2">
                <Form.Label>Address 2</Form.Label>
                <Form.Control placeholder="Apartment, studio, or floor" />
              </Form.Group>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>State</Form.Label>
                  <Form.Select defaultValue="Choose...">
                    <option>Choose...</option>
                    <option>...</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip">
                  <Form.Label>Zip</Form.Label>
                  <Form.Control />
                </Form.Group>
              </Row>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Latitude</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Latitude"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Longitude</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Longitude"
                />
              </Form.Group>
            </Tab>

            {/* Contact */}
            <Tab eventKey="contact" title="Contacts">
              <InputGroup className="mb-3">
                <InputGroup.Text>First, Middle and Last name</InputGroup.Text>
                <Form.Control aria-label="First name" />
                <Form.Control aria-label="Middle name" />
                <Form.Control aria-label="Last name" />
              </InputGroup>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Formatted Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Formatted Name"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Phone Number"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGridAddress1">
                <Form.Label>Address</Form.Label>
                <Form.Control placeholder="1234 Main St" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formGridAddress2">
                <Form.Label>Address 2</Form.Label>
                <Form.Control placeholder="Apartment, studio, or floor" />
              </Form.Group>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>State</Form.Label>
                  <Form.Select defaultValue="Choose...">
                    <option>Choose...</option>
                    <option>...</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip">
                  <Form.Label>Zip</Form.Label>
                  <Form.Control />
                </Form.Group>
              </Row>
            </Tab>

            {/* Interactive */}
            <Tab eventKey="interactive" title="Interactive">
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Body</Form.Label>
                <Form.Control as="textarea" rows={3} />
              </Form.Group>
              {/* <> */}
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
                        {listMore.length -1 == index && listMore.length < 4 &&
                          (
                          <Button className="mb-3" variant="primary" onClick={handleListAdd}>
                            <FontAwesomeIcon icon="fa-solid fa-plus-square" />
                          </Button>
                          )
                        }

                      </div>
                    </Form.Group>
                  ))}
                

              {/* </> */}
            </Tab>

            {/* Templates */}
            <Tab eventKey="templates" title="Templates">
              <Form.Select aria-label="Default select example">
                <option>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </Tab>
          </Tabs>
      </Form>
    )
}
export default CustomForm