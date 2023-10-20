import React, { useState } from "react";
import 'react-modern-drawer/dist/index.css';
// import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
// import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
// import Button from 'react-bootstrap/Button';
// import ButtonGroup from 'react-bootstrap/ButtonGroup';
// import InputGroup from 'react-bootstrap/InputGroup';
// import ToggleButton from 'react-bootstrap/ToggleButton';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TextWidget from '././components/FormGrp/TextWidget'
import ImageWidget from '././components/FormGrp/ImageWidget'
import VideoWidget from '././components/FormGrp/VideoWidget'
import DocWidget from '././components/FormGrp/DocWidget'
import AudioWidget from '././components/FormGrp/AudioWidget'
import LocationWidget from '././components/FormGrp/LocationWidget'
import ContactWidget from '././components/FormGrp/ContactWidget'
import InteractiveWidget from '././components/FormGrp/InteractiveWidget'
import TemplateWidget from '././components/FormGrp/TemplateWidget'
const CustomForm = () => {
    const handleSaveModal = () => { }
    

    return (
        <Form>
          <Tabs defaultActiveKey="text" id="uncontrolled-tab-example" className="mb-3" >
            {/* Text */}
            <Tab eventKey="text" title="Text">
              <TextWidget />
            </Tab>
            {/* Image */}
            <Tab eventKey="image" title="Image">
              <ImageWidget />
            </Tab>
            {/* Video */}
            <Tab eventKey="video" title="Video">
              <VideoWidget />
            </Tab>

            {/* Document */}
            <Tab eventKey="document" title="Docs">
              <DocWidget />
            </Tab>

            {/* Audio */}
            <Tab eventKey="audio" title="Audio">
              <AudioWidget />
            </Tab>

            {/* Location */}
            <Tab eventKey="location" title="Place">
              <LocationWidget />
            </Tab>

            {/* Contact */}
            <Tab eventKey="contact" title="Contacts">
              <ContactWidget/>
            </Tab>

            {/* Interactive */}
            <Tab eventKey="interactive" title="Interactive">
              <InteractiveWidget />
            </Tab>

            {/* Templates */}
            <Tab eventKey="templates" title="Templates">
              <TemplateWidget/>
            </Tab>
          </Tabs>
      </Form>
    )
}
export default CustomForm